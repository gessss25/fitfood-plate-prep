import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Users, Star, Play, Gift, TrendingUp, Activity, Apple, Target, ChefHat, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import mealPlanImage from "@/assets/meal-plan.jpg";
import recipesImage from "@/assets/recipes.jpg";
import { openWhatsApp } from "@/lib/whatsapp";

const Demo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeDay, setActiveDay] = useState(0);
  const [daysRemaining, setDaysRemaining] = useState<number>(7);
  const [trialActive, setTrialActive] = useState<boolean>(false);
  const [mealPlans, setMealPlans] = useState<any[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trialStartDate = localStorage.getItem('trialStartDate');
    
    if (trialStartDate) {
      const startDate = new Date(trialStartDate);
      const currentDate = new Date();
      const daysPassed = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const remaining = Math.max(0, 7 - daysPassed);
      
      setDaysRemaining(remaining);
      setTrialActive(remaining > 0);
    }

    fetchDemoData();
  }, []);

  const fetchDemoData = async () => {
    try {
      const { data: plansData } = await supabase
        .from('meal_plans')
        .select('*')
        .limit(3);

      const { data: recipesData } = await supabase
        .from('recipes')
        .select('*')
        .limit(9);

      if (plansData) setMealPlans(plansData);
      if (recipesData) setRecipes(recipesData);
    } catch (error) {
      console.error('Error fetching demo data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Demo data para las funcionalidades premium
  const progressData = [
    { semana: 'Sem 1', peso: 75, calorias: 1850 },
    { semana: 'Sem 2', peso: 74.2, calorias: 1820 },
    { semana: 'Sem 3', peso: 73.5, calorias: 1800 },
    { semana: 'Sem 4', peso: 72.8, calorias: 1780 },
  ];

  const macrosData = [
    { name: 'Proteínas', value: 30, color: '#10b981' },
    { name: 'Carbohidratos', value: 45, color: '#3b82f6' },
    { name: 'Grasas', value: 25, color: '#f59e0b' },
  ];

  const weeklyCalories = [
    { dia: 'Lun', consumo: 1850, objetivo: 1800 },
    { dia: 'Mar', consumo: 1780, objetivo: 1800 },
    { dia: 'Mie', consumo: 1820, objetivo: 1800 },
    { dia: 'Jue', consumo: 1900, objetivo: 1800 },
    { dia: 'Vie', consumo: 1750, objetivo: 1800 },
    { dia: 'Sab', consumo: 1880, objetivo: 1800 },
    { dia: 'Dom', consumo: 1800, objetivo: 1800 },
  ];

  const demoRecipes = recipes.slice(0, 3).map((recipe, index) => ({
    ...recipe,
    meal: ['Desayuno', 'Almuerzo', 'Cena'][index % 3]
  }));

  const startFreeTrial = () => {
    const startDate = new Date().toISOString();
    localStorage.setItem('trialStartDate', startDate);
    setDaysRemaining(7);
    setTrialActive(true);
    
    toast({
      title: "¡Prueba Gratis Activada! 🎉",
      description: "Tienes 7 días de acceso completo a todos nuestros servicios",
    });
  };

  const handleFeatureClick = (feature: string) => {
    if (!trialActive) {
      toast({
        title: "Activa tu prueba gratis",
        description: "Inicia tu prueba de 7 días para acceder a todas las funciones",
        variant: "destructive",
      });
      return;
    }

    openWhatsApp(`Hola! Tengo la prueba gratis activa y me interesa: ${feature}. ¿Me pueden ayudar?`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Inicio
          </Button>
          
          {!trialActive ? (
            <>
              <Badge className="mb-4 bg-gradient-primary text-white">
                <Gift className="w-4 h-4 mr-2" />
                Prueba Gratis por 7 Días
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Acceso Completo Sin Costo
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
                Experimenta todos nuestros servicios durante 7 días sin compromiso
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90"
                onClick={startFreeTrial}
              >
                <Gift className="w-5 h-5 mr-2" />
                Activar Prueba Gratis
              </Button>
            </>
          ) : (
            <>
              <Badge className="mb-4 bg-green-600 text-white">
                <Clock className="w-4 h-4 mr-2" />
                {daysRemaining} días restantes
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Tu Prueba Gratis Está Activa
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Acceso completo a todos los servicios - Quedan {daysRemaining} días
              </p>
            </>
          )}
        </div>

        {trialActive && (
          <Tabs defaultValue="menu" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-2">
              <TabsTrigger value="menu">Plan Alimentación</TabsTrigger>
              <TabsTrigger value="progreso">Mi Progreso</TabsTrigger>
              <TabsTrigger value="recetas">Recetas Premium</TabsTrigger>
              <TabsTrigger value="analisis">Análisis Nutricional</TabsTrigger>
              <TabsTrigger value="consulta">Nutricionista</TabsTrigger>
            </TabsList>

            <TabsContent value="menu" className="mt-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-center mb-4">Tu Plan de Alimentación Personalizado</h3>
                <div className="flex justify-center gap-2 mb-6 flex-wrap">
                  {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                    <Button
                      key={day}
                      variant={activeDay === day ? "default" : "outline"}
                      onClick={() => setActiveDay(day)}
                      className="min-w-[100px]"
                    >
                      Día {day + 1}
                    </Button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div className="text-center py-12">Cargando menús...</div>
              ) : (
                <>
                  <div className="grid md:grid-cols-3 gap-6">
                    {demoRecipes.map((recipe, idx) => (
                      <Card key={recipe.id} className="hover:shadow-medium transition-all duration-300">
                        {recipe.image_url && (
                          <div className="h-48 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: `url(${recipe.image_url})` }} />
                        )}
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{recipe.meal}</CardTitle>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {recipe.prep_time} min
                            </Badge>
                          </div>
                          <p className="text-xl font-bold text-primary">{recipe.title}</p>
                          <p className="text-sm text-muted-foreground">{recipe.calories} kcal</p>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <p className="text-sm text-muted-foreground">{recipe.description}</p>
                            {recipe.ingredients && (
                              <div>
                                <h4 className="font-semibold mb-2">Ingredientes:</h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  {recipe.ingredients.slice(0, 3).map((ingredient: string, idx: number) => (
                                    <li key={idx} className="flex items-center">
                                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                                      {ingredient}
                                    </li>
                                  ))}
                                  {recipe.ingredients.length > 3 && (
                                    <li className="text-xs text-muted-foreground italic">
                                      +{recipe.ingredients.length - 3} más...
                                    </li>
                                  )}
                                </ul>
                              </div>
                            )}
                            <Button 
                              className="w-full mt-4" 
                              onClick={() => handleFeatureClick(`Receta de ${recipe.title}`)}
                            >
                              Ver Receta Completa
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="text-center mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                    <p className="text-green-700 dark:text-green-400 font-semibold mb-3">
                      ✨ Acceso completo durante tu prueba de {daysRemaining} días - Menús personalizados para cada día
                    </p>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="progreso" className="mt-8">
              <div className="grid gap-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Target className="w-4 h-4 text-accent" />
                        Meta de Peso
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-primary">-2.2kg</div>
                        <Progress value={44} className="h-2" />
                        <p className="text-xs text-muted-foreground">44% del objetivo alcanzado</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Activity className="w-4 h-4 text-accent" />
                        Calorías Promedio
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary">1,815</div>
                      <p className="text-xs text-muted-foreground mt-2">Objetivo: 1,800 kcal/día</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-accent" />
                        Días Activos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary">28</div>
                      <p className="text-xs text-muted-foreground mt-2">Racha actual: 7 días</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Evolución de Peso y Calorías</CardTitle>
                    <CardDescription>Progreso de las últimas 4 semanas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={progressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="semana" />
                        <YAxis yAxisId="left" domain={[70, 76]} />
                        <YAxis yAxisId="right" orientation="right" domain={[1700, 1900]} />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="peso" stroke="#10b981" strokeWidth={2} name="Peso (kg)" />
                        <Line yAxisId="right" type="monotone" dataKey="calorias" stroke="#3b82f6" strokeWidth={2} name="Calorías" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Consumo de Calorías Semanal</CardTitle>
                    <CardDescription>Última semana comparada con tu objetivo</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={weeklyCalories}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="dia" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="consumo" fill="#10b981" name="Consumo Real" />
                        <Bar dataKey="objetivo" fill="#cbd5e1" name="Objetivo" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                  <p className="text-blue-700 dark:text-blue-400 font-semibold">
                    📊 Seguimiento detallado de tu progreso con actualizaciones en tiempo real
                  </p>
                </div>
              </div>
            </TabsContent>

          <TabsContent value="recetas" className="mt-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-center mb-2">Recetas Premium Exclusivas</h3>
              <p className="text-center text-muted-foreground">
                Accede a nuestra colección completa de {recipes.length}+ recetas saludables
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {recipes.slice(0, 6).map((recipe) => (
                <Card key={recipe.id} className="overflow-hidden hover:shadow-medium transition-all duration-300">
                  {recipe.image_url && (
                    <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${recipe.image_url})` }} />
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">
                        <ChefHat className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {recipe.prep_time} min
                      </div>
                    </div>
                    <CardTitle className="text-lg">{recipe.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{recipe.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">Calorías:</span>
                        <span className="text-sm text-primary font-bold">{recipe.calories} kcal</span>
                      </div>
                      {recipe.ingredients && (
                        <div>
                          <span className="text-sm font-semibold">Ingredientes principales:</span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {recipe.ingredients.slice(0, 3).map((ing: string, idx: number) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {ing}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      <Button 
                        className="w-full" 
                        variant="default"
                        onClick={() => handleFeatureClick(`Receta Premium: ${recipe.title}`)}
                      >
                        Ver Receta Completa
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${recipesImage})` }} />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-accent" />
                    Lista de Compras Inteligente
                  </CardTitle>
                  <CardDescription>
                    Generación automática basada en tus menús semanales
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm mb-4">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      Organizada por categorías de supermercado
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      Cantidades exactas calculadas
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      Optimizada para evitar desperdicios
                    </li>
                  </ul>
                  <Button 
                    className="w-full" 
                    onClick={() => handleFeatureClick("Lista de Compras Inteligente")}
                  >
                    Generar Mi Lista
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${mealPlanImage})` }} />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5 text-accent" />
                    Video-Tutoriales
                  </CardTitle>
                  <CardDescription>
                    Aprende técnicas de cocina saludable
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm mb-4">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      Tutoriales paso a paso en video
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      Tips de nutricionistas profesionales
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      Técnicas de preparación avanzadas
                    </li>
                  </ul>
                  <Button 
                    className="w-full" 
                    onClick={() => handleFeatureClick("Video-Tutoriales")}
                  >
                    Ver Tutoriales
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
              <p className="text-purple-700 dark:text-purple-400 font-semibold">
                👨‍🍳 Nuevas recetas premium agregadas cada semana - {recipes.length}+ recetas disponibles
              </p>
            </div>
          </TabsContent>

          <TabsContent value="analisis" className="mt-8">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distribución de Macronutrientes</CardTitle>
                  <CardDescription>Balance ideal para tus objetivos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={macrosData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {macrosData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-semibold">Proteínas</span>
                          <span className="text-sm text-muted-foreground">135g (30%)</span>
                        </div>
                        <Progress value={30} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-semibold">Carbohidratos</span>
                          <span className="text-sm text-muted-foreground">203g (45%)</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-semibold">Grasas</span>
                          <span className="text-sm text-muted-foreground">50g (25%)</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Apple className="w-4 h-4 text-accent" />
                      Calidad Nutricional
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary mb-2">92/100</div>
                    <Progress value={92} className="h-2 mb-2" />
                    <p className="text-xs text-muted-foreground">Excelente balance nutricional</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-accent" />
                      Variedad de Alimentos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary mb-2">45</div>
                    <p className="text-xs text-muted-foreground">Alimentos diferentes esta semana</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Activity className="w-4 h-4 text-accent" />
                      Hidratación
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary mb-2">2.1L</div>
                    <Progress value={84} className="h-2 mb-2" />
                    <p className="text-xs text-muted-foreground">84% del objetivo diario</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Micronutrientes Destacados</CardTitle>
                  <CardDescription>Vitaminas y minerales esenciales</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Vitamina C</span>
                          <span className="text-sm text-muted-foreground">120% VD</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Hierro</span>
                          <span className="text-sm text-muted-foreground">95% VD</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Calcio</span>
                          <span className="text-sm text-muted-foreground">88% VD</span>
                        </div>
                        <Progress value={88} className="h-2" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Vitamina D</span>
                          <span className="text-sm text-muted-foreground">78% VD</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Omega-3</span>
                          <span className="text-sm text-muted-foreground">110% VD</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Fibra</span>
                          <span className="text-sm text-muted-foreground">92% VD</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">VD = Valor Diario recomendado</p>
                </CardContent>
              </Card>

              <div className="text-center p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg">
                <p className="text-amber-700 dark:text-amber-400 font-semibold">
                  🔬 Análisis nutricional detallado actualizado automáticamente con cada comida registrada
                </p>
              </div>
            </div>
          </TabsContent>

            <TabsContent value="consulta" className="mt-8">
              <div className="max-w-4xl mx-auto">
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Consulta con Nutricionista Profesional</CardTitle>
                    <p className="text-muted-foreground">
                      Acceso completo a consultas personalizadas con nuestros expertos en nutrición
                    </p>
                  </CardHeader>
                <CardContent className="p-8">
                  <div className="bg-accent/5 p-6 rounded-lg mb-6">
                    <h3 className="font-bold text-lg mb-4">👩‍⚕️ Dra. María González - Nutricionista</h3>
                    <div className="space-y-4 text-sm">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="font-semibold text-accent">Consulta:</p>
                        <p>"Hola! Cuéntame sobre tus objetivos de salud y estilo de vida actual."</p>
                      </div>
                      
                      <div className="bg-primary/5 p-4 rounded-lg">
                        <p className="font-semibold text-primary">Demo Usuario:</p>
                        <p>"Quiero bajar 5kg y mejorar mi energía. Trabajo desde casa y hago ejercicio 3 veces por semana."</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="font-semibold text-accent">Dra. González:</p>
                        <p>"Perfecto! Con tu nivel de actividad, te recomiendo un plan de 1800 kcal diarias, enfocado en proteínas magras y carbohidratos complejos. ¿Tienes alguna alergia o preferencia alimentaria?"</p>
                      </div>
                      
                      <div className="bg-primary/5 p-4 rounded-lg">
                        <p className="font-semibold text-primary">Demo Usuario:</p>
                        <p>"No tengo alergias, pero prefiero evitar los lácteos."</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="font-semibold text-accent">Dra. González:</p>
                        <p>"Excelente! Te voy a diseñar un plan sin lácteos, rico en proteínas vegetales y alternativas como leche de almendras. Te haré seguimiento semanal para ajustar las porciones según tu progreso."</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-accent/5">
                      <CardHeader>
                        <CardTitle className="text-lg">En la Versión Completa</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li>✅ Consultas ilimitadas por chat</li>
                          <li>✅ Videollamadas programadas</li>
                          <li>✅ Seguimiento de progreso detallado</li>
                          <li>✅ Ajustes de plan en tiempo real</li>
                          <li>✅ Acceso 24/7 a nutricionistas</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-primary/5">
                      <CardHeader>
                        <CardTitle className="text-lg">Tu Progreso Demo</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm">Objetivo: -5kg</span>
                            <span className="text-sm font-bold">-1.2kg (Demo)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-accent h-2 rounded-full" style={{ width: '24%' }}></div>
                          </div>
                          <p className="text-xs text-muted-foreground">Progreso simulado en 2 semanas</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="text-center mt-8">
                    <Button 
                      onClick={() => handleFeatureClick("Consulta con Nutricionista")}
                      className="bg-gradient-primary"
                    >
                      Agendar Mi Consulta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          </Tabs>
        )}

        {!trialActive && (
          <div className="text-center mt-8 p-12 bg-muted rounded-2xl">
            <Gift className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Inicia tu Prueba Gratis de 7 Días</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Activa tu prueba ahora para acceder a todas las funcionalidades sin costo ni compromiso
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90"
              onClick={startFreeTrial}
            >
              <Gift className="w-5 h-5 mr-2" />
              Activar Prueba Gratis
            </Button>
          </div>
        )}

        {trialActive && (
          <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl">
            <h3 className="text-2xl font-bold text-primary mb-4">¿Te está gustando?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Tienes {daysRemaining} días restantes de tu prueba gratis. Después, puedes elegir el plan que mejor se adapte a tus necesidades.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/services')} className="bg-gradient-primary px-8">
                Ver Todos los Planes
              </Button>
              <Button variant="outline" onClick={() => navigate('/service-details')}>
                Conocer Más Servicios
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Demo;