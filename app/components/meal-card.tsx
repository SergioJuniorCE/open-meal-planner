import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

import { Button } from './ui/button';

export type MealCardProps = {
  meal: {
    day: string;
    meal: string;
    image: string;
  };
};

export const MealCard = ({ meal }: MealCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{meal.day}</CardTitle>
        <CardDescription>{meal.meal}</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <img
          src={meal.image}
          className="w-full h-full object-cover rounded-lg"
          alt="Meal"
        />
      </CardContent>
      <CardFooter>
        <Button>View Recipe</Button>
      </CardFooter>
    </Card>
  );
};
