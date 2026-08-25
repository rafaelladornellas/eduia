import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('entrada e navegação para uma dúvida', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Aprender melhor/ })).toBeVisible();
  await page.getByRole('link', { name: /Começar agora/ }).click();
  await page.getByRole('link', { name: /Entrar no modo de teste/ }).click();
  await expect(page.getByRole('heading', { name: /O que vamos aprender hoje/ })).toBeVisible();
});

test('tutor dá pista antes da solução', async ({ page }) => {
  await page.goto('/duvidas/tutor?context=doubt');
  await page.getByLabel('A tua pergunta ou tentativa').fill('Como faço 3/4 + 1/2?');
  await page.getByRole('button', { name: 'Enviar' }).click();
  await expect(page.getByText(/denominadores/)).toBeVisible();
  await expect(page.getByText(/5\/4/)).toHaveCount(0);
});

test('dicionário convida a criar uma frase', async ({ page }) => {
  await page.goto('/dicionario');
  await page.getByLabel('Que palavra queres descobrir?').fill('autonomia');
  await page.getByRole('button', { name: 'Procurar' }).click();
  await expect(page.getByRole('heading', { name: 'autonomia' })).toBeVisible();
  await page.getByLabel('Agora tenta tu 🙂').fill('Eu estudo com autonomia.');
  await page.getByRole('button', { name: 'Ver feedback' }).click();
  await expect(page.getByText(/Boa! Usaste a palavra/)).toBeVisible();
});

test('cartões exigem tentativa antes da explicação', async ({ page }) => {
  await page.goto('/cartoes');
  await page.getByRole('button', { name: 'Criar cartões' }).click();
  const explanation = page.getByRole('button', { name: 'Ver explicação' });
  await expect(explanation).toBeDisabled();
  await page.getByLabel('A tua resposta').fill('Uma ideia que já conheço.');
  await expect(explanation).toBeEnabled();
});

test('revisão usa upload temporário e identifica o mock', async ({ page }) => {
  await page.goto('/revisao');
  const upload = page.locator('#study-image');
  await expect(upload).toBeEnabled();
  await upload.setInputFiles('public/og.png');
  await expect(page.getByAltText('Pré-visualização do exercício selecionado')).toBeVisible();
  await page.getByRole('button', { name: 'Confirmar e analisar' }).click();
  await expect(page.getByText('Análise simulada.')).toBeVisible();
});

test('páginas principais não têm violações WCAG A/AA detetáveis', async ({ page }) => {
  for (const route of ['/', '/inicio', '/duvidas/tutor?context=doubt']) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(results.violations, `Violações em ${route}`).toEqual([]);
  }
});
