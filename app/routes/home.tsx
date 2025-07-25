import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { MealCardCarousel } from '@/components/meal-card-carousel';
import type { Route } from './+types/home';
import { api } from 'convex/_generated/api';
import { useQuery } from 'convex/react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Open Meal Planner' },
    { name: 'description', content: 'Plan your meals with ease' },
  ];
}

export default function Home() {
  const mealPlan = useQuery(api.meal.getMealPlan);

  if (mealPlan === undefined || mealPlan.length === 0) {
    return <div className="flex justify-center items-center h-64">No meal plans found. Please add a meal plan.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Mobile First */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Open Meal Planner</h1>
            <Link to="/meals">
              <Button size="sm" className="flex items-center gap-2">
                <span className="hidden sm:inline">Manage Meals</span>
                <span className="sm:hidden">Meals</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex flex-col gap-6">
          <MealCardCarousel />
        </div>
      </div>
    </div>
  );
}
