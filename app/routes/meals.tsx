import { ArrowLeft, Edit, Eye, Plus, Trash2, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useMutation, useQuery } from 'convex/react';

import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { api } from 'convex/_generated/api';
import { useState } from 'react';

type MealType = 'breakfast' | 'brunch' | 'lunch' | 'snack' | 'dinner';

interface MealFormData {
  type: MealType;
  name: string;
  description: string;
  image: string;
  icon: string;
}

export function meta() {
  return [
    { title: 'Meals Management' },
    { name: 'description', content: 'Create, read, update, and delete meals' },
  ];
}

export default function MealsPage() {
  const meals = useQuery(api.meal.getMeals);
  const createMeal = useMutation(api.meal.createMeal);
  const updateMeal = useMutation(api.meal.updateMeal);
  const deleteMeal = useMutation(api.meal.deleteMeal);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<any>(null);
  const [formData, setFormData] = useState<MealFormData>({
    type: 'breakfast',
    name: '',
    description: '',
    image: '',
    icon: '',
  });

  const handleCreateMeal = async () => {
    try {
      await createMeal(formData);
      setIsCreateModalOpen(false);
      setFormData({
        type: 'breakfast',
        name: '',
        description: '',
        image: '',
        icon: '',
      });
    } catch (error) {
      console.error('Error creating meal:', error);
    }
  };

  const handleUpdateMeal = async () => {
    if (!selectedMeal) return;
    try {
      await updateMeal({
        id: selectedMeal._id,
        ...formData,
      });
      setIsEditModalOpen(false);
      setSelectedMeal(null);
      setFormData({
        type: 'breakfast',
        name: '',
        description: '',
        image: '',
        icon: '',
      });
    } catch (error) {
      console.error('Error updating meal:', error);
    }
  };

  const handleDeleteMeal = async (mealId: string) => {
    if (confirm('Are you sure you want to delete this meal?')) {
      try {
        await deleteMeal({ id: mealId as any });
      } catch (error) {
        console.error('Error deleting meal:', error);
      }
    }
  };

  const openEditModal = (meal: any) => {
    setSelectedMeal(meal);
    setFormData({
      type: meal.type,
      name: meal.name,
      description: meal.description,
      image: meal.image,
      icon: meal.icon,
    });
    setIsEditModalOpen(true);
  };

  const openViewModal = (meal: any) => {
    setSelectedMeal(meal);
    setIsViewModalOpen(true);
  };

  const getMealTypeColor = (type: MealType) => {
    const colors = {
      breakfast: 'bg-yellow-100 text-yellow-800',
      brunch: 'bg-orange-100 text-orange-800',
      lunch: 'bg-green-100 text-green-800',
      snack: 'bg-blue-100 text-blue-800',
      dinner: 'bg-purple-100 text-purple-800',
    };
    return colors[type];
  };

  if (meals === undefined) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Mobile First */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="sm" className="p-2">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-bold">Meals</h1>
            </div>
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Meal</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Empty State */}
        {meals.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No meals yet</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first meal</p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Meal
            </Button>
          </div>
        )}

        {/* Meals Grid - Mobile First */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {meals.map((meal) => (
            <Card key={meal._id} className="overflow-hidden hover:shadow-md transition-shadow">
              {meal.image && (
                <div className="aspect-[4/3] bg-gray-100">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader className="p-4">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{meal.name}</CardTitle>
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mt-2 ${getMealTypeColor(meal.type)}`}>
                      {meal.type}
                    </span>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openViewModal(meal)}
                      className="p-2 h-8 w-8"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditModal(meal)}
                      className="p-2 h-8 w-8"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteMeal(meal._id)}
                      className="p-2 h-8 w-8 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <CardDescription className="line-clamp-2 text-sm">
                  {meal.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Modal - Mobile First */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-t-xl sm:rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Create New Meal</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as MealType })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="brunch">Brunch</option>
                  <option value="lunch">Lunch</option>
                  <option value="snack">Snack</option>
                  <option value="dinner">Dinner</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter meal name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Describe your meal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Icon</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="🍕"
                />
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setIsCreateModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateMeal}
                className="flex-1"
                disabled={!formData.name.trim()}
              >
                Create Meal
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal - Mobile First */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-t-xl sm:rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Edit Meal</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditModalOpen(false)}
                className="p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as MealType })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="brunch">Brunch</option>
                  <option value="lunch">Lunch</option>
                  <option value="snack">Snack</option>
                  <option value="dinner">Dinner</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Icon</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUpdateMeal}
                className="flex-1"
                disabled={!formData.name.trim()}
              >
                Update Meal
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal - Mobile First */}
      {isViewModalOpen && selectedMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-t-xl sm:rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold truncate">{selectedMeal.name}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsViewModalOpen(false)}
                className="p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6 space-y-4">
              {selectedMeal.image && (
                <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={selectedMeal.image}
                    alt={selectedMeal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getMealTypeColor(selectedMeal.type)}`}>
                    {selectedMeal.type}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Description</h3>
                  <p className="text-sm text-gray-600">{selectedMeal.description}</p>
                </div>
                {selectedMeal.icon && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">Icon</h3>
                    <p className="text-sm text-gray-600">{selectedMeal.icon}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t px-6 py-4">
              <Button 
                variant="outline" 
                onClick={() => setIsViewModalOpen(false)}
                className="w-full"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
