import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from './ui/button';

export type MealCardProps = {
  meal: {
    day: string;
    meal: string;
    image: string;
    icon: React.ReactNode;
  };
};

export const MealCard = ({ meal }: MealCardProps) => {
  const [isClosed, setIsClosed] = useState(false);
  const [shouldAutoClose, setShouldAutoClose] = useState(false);
  const [hasBeenManuallyOpened, setHasBeenManuallyOpened] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTime = currentHour * 60 + currentMinute; // Convert to minutes for easier comparison
      
      // 12:00 PM = 12 * 60 = 720 minutes
      // 7:00 PM = 19 * 60 = 1140 minutes
      
      let shouldClose = false;
      if (meal.meal.toLowerCase() === 'breakfast' && currentTime >= 720) {
        shouldClose = true;
      } else if (meal.meal.toLowerCase() === 'lunch' && currentTime >= 1140) {
        shouldClose = true;
      }
      
      setShouldAutoClose(shouldClose);
      
      // Only auto-close if the card hasn't been manually opened by the user
      if (shouldClose && !isClosed && !hasBeenManuallyOpened) {
        setIsClosed(true);
      }
    };

    // Check immediately
    checkTime();
    
    // Check every minute
    const interval = setInterval(checkTime, 60000);
    
    return () => clearInterval(interval);
  }, [meal.meal, isClosed, hasBeenManuallyOpened]);

  const toggleClosed = () => {
    const newClosedState = !isClosed;
    setIsClosed(newClosedState);
    
    // If user is opening the card, mark it as manually opened
    if (!newClosedState) {
      setHasBeenManuallyOpened(true);
    }
  };

  return (
    <Card className={`relative transition-all duration-300 ease-in-out ${
      isClosed 
        ? 'bg-gray-100 border-2 border-gray-300 scale-95 opacity-75' 
        : 'scale-100 opacity-100'
    }`}>
      <CardHeader className="transition-all duration-300">
        <CardTitle className={`transition-colors duration-300 ${
          isClosed ? 'text-gray-600' : 'text-foreground'
        }`}>
          {meal.day}
        </CardTitle>
        <CardDescription className={`transition-colors duration-300 ${
          isClosed ? 'text-gray-500' : 'text-muted-foreground'
        }`}>
          {meal.meal}
        </CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleClosed}
            className="p-1 h-auto hover:bg-gray-200 transition-all duration-200"
            title={isClosed ? "Open card" : "Close card"}
          >
            {isClosed ? (
              <Eye className="h-4 w-4 text-gray-600 transition-transform duration-200 hover:scale-110" />
            ) : (
              <EyeOff className="h-4 w-4 transition-transform duration-200 hover:scale-110" />
            )}
          </Button>
        </CardAction>
      </CardHeader>
      
      <CardContent className="transition-all duration-300 overflow-hidden">
        {!isClosed && (
          <img
            src={meal.image}
            className="w-full h-full object-cover rounded-lg transition-all duration-300"
            alt="Meal"
          />
        )}
      </CardContent>
      
      <CardFooter className="transition-all duration-300">
        <Button 
          disabled={isClosed} 
          className={`transition-all duration-300 ${
            isClosed ? 'text-gray-400 bg-gray-200' : ''
          }`}
        >
          View Recipe
        </Button>
      </CardFooter>
    </Card>
  );
};
