import { tutorProvider } from '@/lib/provider';

const acceptedTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const maxSize = 10 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');
    if (!(file instanceof File)) return Response.json({ message: 'Escolhe uma imagem para rever.' }, { status: 400 });
    if (!acceptedTypes.has(file.type) || file.size > maxSize) return Response.json({ message: 'Usa uma imagem JPEG, PNG ou WebP com menos de 10 MB.' }, { status: 400 });
    const result = await tutorProvider.analyzeStudyImage({ name: file.name, type: file.type, size: file.size });
    return Response.json({ ...result, mock: true });
  } catch {
    return Response.json({ message: 'Não conseguimos analisar a imagem agora. Tenta outra vez.' }, { status: 503 });
  }
}
