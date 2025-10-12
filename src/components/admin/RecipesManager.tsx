import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Pencil, Trash2 } from 'lucide-react';

interface Recipe {
  id: string;
  meal_plan_id: string | null;
  title: string;
  description: string | null;
  ingredients: string[] | null;
  instructions: string | null;
  prep_time: number | null;
  calories: number | null;
  image_url: string | null;
}

interface MealPlan {
  id: string;
  name: string;
}

const RecipesManager = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    meal_plan_id: '',
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    prep_time: '',
    calories: '',
    image_url: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [recipesResult, plansResult] = await Promise.all([
        supabase.from('recipes').select('*').order('created_at', { ascending: false }),
        supabase.from('meal_plans').select('id, name').order('name'),
      ]);

      if (recipesResult.error) throw recipesResult.error;
      if (plansResult.error) throw plansResult.error;

      setRecipes(recipesResult.data || []);
      setMealPlans(plansResult.data || []);
    } catch (error: any) {
      toast.error('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const recipeData = {
      meal_plan_id: formData.meal_plan_id || null,
      title: formData.title,
      description: formData.description || null,
      ingredients: formData.ingredients ? formData.ingredients.split('\n').filter(i => i.trim()) : null,
      instructions: formData.instructions || null,
      prep_time: formData.prep_time ? parseInt(formData.prep_time) : null,
      calories: formData.calories ? parseInt(formData.calories) : null,
      image_url: formData.image_url || null,
    };

    try {
      if (editingId) {
        const { error } = await supabase
          .from('recipes')
          .update(recipeData)
          .eq('id', editingId);

        if (error) throw error;
        toast.success('Receta actualizada exitosamente');
      } else {
        const { error } = await supabase
          .from('recipes')
          .insert([recipeData]);

        if (error) throw error;
        toast.success('Receta creada exitosamente');
      }

      resetForm();
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar receta');
    }
  };

  const handleEdit = (recipe: Recipe) => {
    setEditingId(recipe.id);
    setFormData({
      meal_plan_id: recipe.meal_plan_id || '',
      title: recipe.title,
      description: recipe.description || '',
      ingredients: recipe.ingredients?.join('\n') || '',
      instructions: recipe.instructions || '',
      prep_time: recipe.prep_time?.toString() || '',
      calories: recipe.calories?.toString() || '',
      image_url: recipe.image_url || '',
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta receta?')) return;

    try {
      const { error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Receta eliminada exitosamente');
      fetchData();
    } catch (error: any) {
      toast.error('Error al eliminar receta');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      meal_plan_id: '',
      title: '',
      description: '',
      ingredients: '',
      instructions: '',
      prep_time: '',
      calories: '',
      image_url: '',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Editar Receta' : 'Crear Nueva Receta'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meal_plan">Plan de Comidas</Label>
                <Select
                  value={formData.meal_plan_id}
                  onValueChange={(value) => setFormData({ ...formData, meal_plan_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Sin plan</SelectItem>
                    {mealPlans.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id}>
                        {plan.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prep_time">Tiempo Prep (min)</Label>
                <Input
                  id="prep_time"
                  type="number"
                  value={formData.prep_time}
                  onChange={(e) => setFormData({ ...formData, prep_time: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="calories">Calorías</Label>
                <Input
                  id="calories"
                  type="number"
                  value={formData.calories}
                  onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">URL Imagen</Label>
                <Input
                  id="image"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ingredients">Ingredientes (uno por línea)</Label>
              <Textarea
                id="ingredients"
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                placeholder="2 tazas de harina&#10;1 huevo&#10;200ml de leche"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Instrucciones</Label>
              <Textarea
                id="instructions"
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {editingId ? 'Actualizar' : 'Crear'} Receta
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recipes.map((recipe) => (
          <Card key={recipe.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{recipe.title}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleEdit(recipe)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => handleDelete(recipe.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {recipe.description && (
                <p className="text-sm text-muted-foreground">{recipe.description}</p>
              )}
              <div className="flex gap-4 text-sm">
                {recipe.prep_time && <span>⏱️ {recipe.prep_time} min</span>}
                {recipe.calories && <span>🔥 {recipe.calories} cal</span>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecipesManager;
