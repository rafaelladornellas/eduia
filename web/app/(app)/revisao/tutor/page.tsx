import { TutorChat } from '@/components/tutor-chat';
import { PageHeader } from '@/components/ui';
export default function ReviewTutorPage(){return <><PageHeader eyebrow="Revisão" title="Corrigir com pistas" description="Explica como pensaste e melhora o teu raciocínio passo a passo."/><TutorChat context="review" topic="Revisão por imagem"/></>}
