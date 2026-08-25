import { ProgressDashboard } from '@/components/progress-dashboard';
import { PageHeader, Notice } from '@/components/ui';
export default function ProgressPage(){return <><PageHeader eyebrow="Refletir" title="Meu progresso" description="Vê o que estudaste e quanta ajuda usaste. O objetivo é ganhares autonomia."/><div className="mb-5"><Notice>Estes dados ficam apenas neste browser e não são uma avaliação escolar.</Notice></div><ProgressDashboard/></>}
