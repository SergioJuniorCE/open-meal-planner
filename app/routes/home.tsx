import { MealCardCarousel } from '@/components/meal-card-carousel';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col gap-4 py-4">
      <MealCardCarousel />
    </div>
  );
}
