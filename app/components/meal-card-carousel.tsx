import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { ChilaquilesIcon } from './icons/chilaquiles';
import { MealCard } from './meal-card';

const meals = [
  {
    id: 1,
    day: 'Monday',
    meal: 'Breakfast',
    image:
      'https://www.daisybrand.com/wp-content/uploads/2019/12/chilaquiles2-770x628_6301.jpg',
    icon: <ChilaquilesIcon />,
  },
  {
    id: 2,
    day: 'Monday',
    meal: 'Lunch',
    image:
      'https://www.daisybrand.com/wp-content/uploads/2019/12/chilaquiles2-770x628_6301.jpg',
    icon: <ChilaquilesIcon />,
  },
  {
    id: 3,
    day: 'Monday',
    meal: 'Dinner',
    image:
      'https://www.daisybrand.com/wp-content/uploads/2019/12/chilaquiles2-770x628_6301.jpg',
    icon: <ChilaquilesIcon />,
  },
];

export const MealCardCarousel = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        <CarouselItem>
          <div className="grid gap-4 auto-rows-min">
            {meals.map((meal) => (
              <div key={meal.id} className="transition-all duration-500 ease-in-out px-4">
                <MealCard meal={meal} />
              </div>
            ))}
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
