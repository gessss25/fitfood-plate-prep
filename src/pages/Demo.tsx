import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Users, Star, Play, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import mealPlanImage from "@/assets/meal-plan.jpg";
import recipesImage from "@/assets/recipes.jpg";
import { openWhatsApp } from "@/lib/whatsapp";

const Demo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeDay, setActiveDay] = useState("dia1");
  const [daysRemaining, setDaysRemaining] = useState<number>(7);
  const [trialActive, setTrialActive] = useState<boolean>(false);

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
  }, []);

  const demoMenus = {
    dia1: {
      desayuno: {
        name: "Bowl de Avena con Frutas",
        calories: "320 kcal",
        ingredients: ["Avena integral", "Plátano", "Fresas", "Miel", "Nueces"],
        time: "10 min"
      },
      almuerzo: {
        name: "Pollo a la Plancha con Quinoa",
        calories: "450 kcal", 
        ingredients: ["Pechuga de pollo", "Quinoa", "Brócoli", "Zanahoria", "Aceite de oliva"],
        time: "25 min"
      },
      cena: {
        name: "Salmón con Vegetales",
        calories: "380 kcal",
        ingredients: ["Filete de salmón", "Espárragos", "Calabacín", "Limón"],
        time: "20 min"
      }
    },
    dia2: {
      desayuno: {
        name: "Smoothie Verde Energizante",
        calories: "280 kcal",
        ingredients: ["Espinaca", "Mango", "Plátano", "Leche de almendras", "Chía"],
        time: "5 min"
      },
      almuerzo: {
        name: "Ensalada de Garbanzos",
        calories: "400 kcal",
        ingredients: ["Garbanzos", "Tomate cherry", "Pepino", "Feta", "Aceitunas"],
        time: "15 min"
      },
      cena: {
        name: "Pescado con Arroz Integral",
        calories: "420 kcal",
        ingredients: ["Pescado blanco", "Arroz integral", "Pimientos", "Cebolla"],
        time: "30 min"
      }
    },
    dia3: {
      desayuno: {
        name: "Tostadas de Aguacate",
        calories: "350 kcal",
        ingredients: ["Pan integral", "Aguacate", "Tomate", "Huevo", "Semillas"],
        time: "8 min"
      },
      almuerzo: {
        name: "Lenteja con Vegetales",
        calories: "380 kcal",
        ingredients: ["Lentejas", "Apio", "Zanahoria", "Cebolla", "Ajo"],
        time: "35 min"
      },
      cena: {
        name: "Pavo con Batata",
        calories: "360 kcal",
        ingredients: ["Pechuga de pavo", "Batata", "Espinaca", "Aceite de coco"],
        time: "25 min"
      }
    }
  };

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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="menu">Plan de Alimentación</TabsTrigger>
              <TabsTrigger value="recetas">Biblioteca de Recetas</TabsTrigger>
              <TabsTrigger value="consulta">Consulta Nutricionista</TabsTrigger>
            </TabsList>

            <TabsContent value="menu" className="mt-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-center mb-4">Tu Plan de Alimentación Completo</h3>
              <div className="flex justify-center gap-2 mb-6">
                {Object.keys(demoMenus).map((day, index) => (
                  <Button
                    key={day}
                    variant={activeDay === day ? "default" : "outline"}
                    onClick={() => setActiveDay(day)}
                    className="min-w-[100px]"
                  >
                    Día {index + 1}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(demoMenus[activeDay as keyof typeof demoMenus]).map(([meal, details]) => (
                <Card key={meal} className="hover:shadow-medium transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg capitalize">{meal}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {details.time}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-primary">{details.name}</p>
                    <p className="text-sm text-muted-foreground">{details.calories}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-2">Ingredientes:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {details.ingredients.map((ingredient, idx) => (
                            <li key={idx} className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                              {ingredient}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button 
                        className="w-full mt-4" 
                        onClick={() => handleFeatureClick(`Receta de ${details.name}`)}
                      >
                        Ver Receta Completa
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

              <div className="text-center mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-green-700 dark:text-green-400 font-semibold mb-3">
                  ✨ Acceso completo durante tu prueba de {daysRemaining} días - Menús personalizados, seguimiento nutricional y más
                </p>
              </div>
            </TabsContent>

          <TabsContent value="recetas" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="overflow-hidden">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${mealPlanImage})` }} />
                <CardHeader>
                  <CardTitle>Biblioteca de Recetas</CardTitle>
                  <p className="text-muted-foreground">
                    Accede a más de 200+ recetas saludables y fáciles de preparar
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-accent" />
                      <span className="text-sm">Recetas paso a paso con fotos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" />
                      <span className="text-sm">Tiempo de preparación optimizado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-accent" />
                      <span className="text-sm">Porciones ajustables</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    onClick={() => handleFeatureClick("Biblioteca de Recetas")}
                  >
                    Explorar Todas las Recetas
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${recipesImage})` }} />
                <CardHeader>
                  <CardTitle>Lista de Compras Inteligente</CardTitle>
                  <p className="text-muted-foreground">
                    Generamos automáticamente tu lista de compras basada en tus menús
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span className="text-sm">Organizada por semanas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-accent" />
                      <span className="text-sm">Optimizada por categorías</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-accent" />
                      <span className="text-sm">Cantidades exactas</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    onClick={() => handleFeatureClick("Lista de Compras Inteligente")}
                  >
                    Generar Mi Lista
                  </Button>
                </CardContent>
              </Card>
            </div>

              <div className="text-center mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-green-700 dark:text-green-400 font-semibold">
                  📚 Acceso completo a video-tutoriales y tips de preparación incluidos en tu prueba
                </p>
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