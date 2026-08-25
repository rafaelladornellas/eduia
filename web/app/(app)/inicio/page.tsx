import { HomeDashboard } from '@/components/home-dashboard';
import subjects from '@/data/subjects.json';
import type { Subject } from '@/domain/types';

export default function HomePage() {
  return <HomeDashboard subjects={subjects as Subject[]} />;
}
