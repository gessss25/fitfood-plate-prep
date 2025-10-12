import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface MealPlan {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  duration_days: number | null;
  image_url: string | null;
  features: string[] | null;
}

const MealPlansManager = () => {
  const [plans, setPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration_days: '',
    image_url: '',
    features: '',
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('meal_plans')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPlans(data || []);
    } catch (error: any) {
      toast.error('Error al cargar planes');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const planData = {
      name: formData.name,
      description: formData.description || null,
      price: formData.price ? parseFloat(formData.price) : null,
      duration_days: formData.duration_days ? parseInt(formData.duration_days) : null,
      image_url: formData.image_url || null,
      features: formData.features ? formData.features.split(',').map(f => f.trim()) : null,
    };

    try {
      if (editingId) {
        const { error } = await supabase
          .from('meal_plans')
          .update(planData)
          .eq('id', editingId);

        if (error) throw error;
        toast.success('Plan actualizado exitosamente');
      } else {
        const { error } = await supabase
          .from('meal_plans')
          .insert([planData]);

        if (error) throw error;
        toast.success('Plan creado exitosamente');
      }

      resetForm();
      fetchPlans();
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar plan');
    }
  };

  const handleEdit = (plan: MealPlan) => {
    setEditingId(plan.id);
    setFormData({
      name: plan.name,
      description: plan.description || '',
      price: plan.price?.toString() || '',
      duration_days: plan.duration_days?.toString() || '',
      image_url: plan.image_url || '',
      features: plan.features?.join(', ') || '',
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este plan?')) return;

    try {
      const { error } = await supabase
        .from('meal_plans')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Plan eliminado exitosamente');
      fetchPlans();
    } catch (error: any) {
      toast.error('Error al eliminar plan');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      duration_days: '',
      image_url: '',
      features: '',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Editar Plan' : 'Crear Nuevo Plan'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Precio</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duración (días)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration_days}
                  onChange={(e) => setFormData({ ...formData, duration_days: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">URL de Imagen</Label>
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
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Características (separadas por coma)</Label>
              <Textarea
                id="features"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Ej: Nutricionista personalizado, Recetas saludables, Seguimiento semanal"
                rows={2}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {editingId ? 'Actualizar' : 'Crear'} Plan
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
        {plans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.price && (
                    <p className="text-lg font-semibold text-primary mt-2">
                      ${plan.price}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleEdit(plan)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => handleDelete(plan.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {plan.description && (
                <p className="text-sm text-muted-foreground mb-2">{plan.description}</p>
              )}
              {plan.duration_days && (
                <p className="text-sm">Duración: {plan.duration_days} días</p>
              )}
              {plan.features && plan.features.length > 0 && (
                <ul className="list-disc list-inside text-sm mt-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MealPlansManager;
