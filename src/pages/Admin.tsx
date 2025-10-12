import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import MealPlansManager from '@/components/admin/MealPlansManager';
import RecipesManager from '@/components/admin/RecipesManager';
import GalleriesManager from '@/components/admin/GalleriesManager';

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
    
    if (!roleLoading && !isAdmin) {
      navigate('/');
    }
  }, [user, isAdmin, authLoading, roleLoading, navigate]);

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Panel de Administración</CardTitle>
            <CardDescription>
              Gestiona planes de comidas, recetas y galerías
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="plans" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="plans">Planes de Comidas</TabsTrigger>
                <TabsTrigger value="recipes">Recetas</TabsTrigger>
                <TabsTrigger value="galleries">Galerías</TabsTrigger>
              </TabsList>

              <TabsContent value="plans">
                <MealPlansManager />
              </TabsContent>

              <TabsContent value="recipes">
                <RecipesManager />
              </TabsContent>

              <TabsContent value="galleries">
                <GalleriesManager />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
