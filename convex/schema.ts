import { defineSchema, defineTable } from 'convex/server';

import { v } from 'convex/values';

export default defineSchema({
  mealPlan: defineTable({
    name: v.string(),
    description: v.string(),
    image: v.string(),
    icon: v.string(),
  }),
  mealPlanItem: defineTable({
    mealPlanId: v.id('mealPlan'),
    mealId: v.id('meal'),
    day: v.union(
      v.literal('monday'),
      v.literal('tuesday'),
      v.literal('wednesday'),
      v.literal('thursday'),
      v.literal('friday'),
      v.literal('saturday'),
      v.literal('sunday')
    ),
    meal: v.union(
      v.literal('breakfast'),
      v.literal('brunch'),
      v.literal('lunch'),
      v.literal('snack'),
      v.literal('dinner')
    ),
  }),
  meal: defineTable({
    type: v.union(v.literal('breakfast'), v.literal('brunch'), v.literal('lunch'), v.literal('snack'), v.literal('dinner')),
    name: v.string(),
    description: v.string(),
    image: v.string(),
    icon: v.string(),
  }),
});
