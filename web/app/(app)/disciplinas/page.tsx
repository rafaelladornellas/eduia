import { PageHeader, Notice } from '@/components/ui';
import { SubjectCard } from '@/components/subject-card';
import subjects from '@/data/subjects.json';
import type { Subject } from '@/domain/types';

export default function SubjectsPage() { return <><PageHeader eyebrow="Explorar" title="Disciplinas" description="Escolhe uma disciplina para veres o tema de demonstração e as formas de estudar." /><Notice>Os temas ainda são placeholders. A matriz curricular definitiva será validada antes do lançamento.</Notice><div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">{(subjects as Subject[]).map((subject)=><SubjectCard key={subject.id} subject={subject} />)}</div></>; }
