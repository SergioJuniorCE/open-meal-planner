import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { MealCard } from './meal-card';

const meals = [
  {
    id: 1,
    day: 'Monday',
    meal: 'Breakfast',
    image:
      'https://www.daisybrand.com/wp-content/uploads/2019/12/chilaquiles2-770x628_6301.jpg',
  },
  {
    id: 2,
    day: 'Monday',
    meal: 'Lunch',
    image:
      'https://www.daisybrand.com/wp-content/uploads/2019/12/chilaquiles2-770x628_6301.jpg',
  },
  {
    id: 3,
    day: 'Monday',
    meal: 'Dinner',
    image:
      'https://www.daisybrand.com/wp-content/uploads/2019/12/chilaquiles2-770x628_6301.jpg',
  },
];

export const MealCardCarousel = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        <CarouselItem>
          {meals.map((meal) => (
            <MealCard meal={meal} key={meal.id} />
          ))}
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
