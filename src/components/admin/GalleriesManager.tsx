import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Pencil, Trash2, Plus, Image } from 'lucide-react';

interface Gallery {
  id: string;
  title: string;
  description: string | null;
}

interface GalleryImage {
  id: string;
  gallery_id: string;
  image_url: string;
  title: string | null;
  description: string | null;
  order_index: number;
}

const GalleriesManager = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [selectedGallery, setSelectedGallery] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [imageFormData, setImageFormData] = useState({
    image_url: '',
    title: '',
    description: '',
  });

  useEffect(() => {
    fetchGalleries();
  }, []);

  useEffect(() => {
    if (selectedGallery) {
      fetchGalleryImages(selectedGallery);
    }
  }, [selectedGallery]);

  const fetchGalleries = async () => {
    try {
      const { data, error } = await supabase
        .from('galleries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGalleries(data || []);
    } catch (error: any) {
      toast.error('Error al cargar galerías');
    }
  };

  const fetchGalleryImages = async (galleryId: string) => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('gallery_id', galleryId)
        .order('order_index');

      if (error) throw error;
      setGalleryImages(data || []);
    } catch (error: any) {
      toast.error('Error al cargar imágenes');
    }
  };

  const handleSubmitGallery = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        const { error } = await supabase
          .from('galleries')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
        toast.success('Galería actualizada');
      } else {
        const { error } = await supabase
          .from('galleries')
          .insert([formData]);

        if (error) throw error;
        toast.success('Galería creada');
      }

      resetForm();
      fetchGalleries();
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar galería');
    }
  };

  const handleSubmitImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGallery) return;

    try {
      const { error } = await supabase
        .from('gallery_images')
        .insert([{
          gallery_id: selectedGallery,
          ...imageFormData,
          order_index: galleryImages.length,
        }]);

      if (error) throw error;
      toast.success('Imagen agregada');
      setImageFormData({ image_url: '', title: '', description: '' });
      fetchGalleryImages(selectedGallery);
    } catch (error: any) {
      toast.error('Error al agregar imagen');
    }
  };

  const handleEdit = (gallery: Gallery) => {
    setEditingId(gallery.id);
    setFormData({
      title: gallery.title,
      description: gallery.description || '',
    });
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('¿Eliminar galería y todas sus imágenes?')) return;

    try {
      const { error } = await supabase
        .from('galleries')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Galería eliminada');
      if (selectedGallery === id) setSelectedGallery(null);
      fetchGalleries();
    } catch (error: any) {
      toast.error('Error al eliminar galería');
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm('¿Eliminar esta imagen?')) return;

    try {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Imagen eliminada');
      if (selectedGallery) fetchGalleryImages(selectedGallery);
    } catch (error: any) {
      toast.error('Error al eliminar imagen');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ title: '', description: '' });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Editar Galería' : 'Nueva Galería'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitGallery} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gallery-title">Título *</Label>
                <Input
                  id="gallery-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gallery-description">Descripción</Label>
                <Textarea
                  id="gallery-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  {editingId ? 'Actualizar' : 'Crear'}
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

        <Card>
          <CardHeader>
            <CardTitle>Galerías Existentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {galleries.map((gallery) => (
                <div
                  key={gallery.id}
                  className={`flex justify-between items-center p-3 rounded-lg border ${
                    selectedGallery === gallery.id ? 'bg-secondary' : ''
                  }`}
                >
                  <button
                    onClick={() => setSelectedGallery(gallery.id)}
                    className="flex-1 text-left"
                  >
                    <p className="font-medium">{gallery.title}</p>
                  </button>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleEdit(gallery)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDeleteGallery(gallery.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedGallery && (
        <Card>
          <CardHeader>
            <CardTitle>Imágenes de la Galería</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmitImage} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="image-url">URL de Imagen *</Label>
                <Input
                  id="image-url"
                  value={imageFormData.image_url}
                  onChange={(e) => setImageFormData({ ...imageFormData, image_url: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-title">Título</Label>
                <Input
                  id="image-title"
                  value={imageFormData.title}
                  onChange={(e) => setImageFormData({ ...imageFormData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Button type="submit" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>
            </form>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((image) => (
                <Card key={image.id}>
                  <CardContent className="p-2">
                    <div className="aspect-square bg-muted rounded flex items-center justify-center mb-2">
                      {image.image_url ? (
                        <img
                          src={image.image_url}
                          alt={image.title || ''}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <Image className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    {image.title && (
                      <p className="text-xs font-medium truncate">{image.title}</p>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      className="w-full mt-2"
                      onClick={() => handleDeleteImage(image.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GalleriesManager;
