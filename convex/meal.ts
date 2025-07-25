import { mutation, query } from './_generated/server';

import { v } from 'convex/values';

export const getMealPlan = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('mealPlan').collect();
  },
});

// Get all meals
export const getMeals = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('meal').collect();
  },
});

// Get a single meal by ID
export const getMeal = query({
  args: { id: v.id('meal') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create a new meal
export const createMeal = mutation({
  args: {
    type: v.union(v.literal('breakfast'), v.literal('brunch'), v.literal('lunch'), v.literal('snack'), v.literal('dinner')),
    name: v.string(),
    description: v.string(),
    image: v.string(),
    icon: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('meal', args);
  },
});

// Update a meal
export const updateMeal = mutation({
  args: {
    id: v.id('meal'),
    type: v.union(v.literal('breakfast'), v.literal('brunch'), v.literal('lunch'), v.literal('snack'), v.literal('dinner')),
    name: v.string(),
    description: v.string(),
    image: v.string(),
    icon: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...updateData } = args;
    return await ctx.db.patch(id, updateData);
  },
});

// Delete a meal
export const deleteMeal = mutation({
  args: { id: v.id('meal') },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});