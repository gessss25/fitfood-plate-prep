import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Users, Star, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import mealPlanImage from "@/assets/meal-plan.jpg";
import recipesImage from "@/assets/recipes.jpg";

const Demo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeDay, setActiveDay] = useState("dia1");

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

  const handleStartDemo = (feature: string) => {
    toast({
      title: "🎉 Demo Activado",
      description: `Probando ${feature}. En la versión completa tendrás acceso ilimitado.`,
    });
  };

  const handleUpgrade = () => {
    toast({
      title: "🚀 ¡Únete Ahora!",
      description: "Accede a todos los planes y funcionalidades completas.",
    });
    navigate('/services');
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
          
          <Badge className="mb-4 bg-accent text-accent-foreground">
            <Play className="w-4 h-4 mr-2" />
            Modo Demo Gratuito
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            prueba nuestros servicios
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experimenta cómo funciona nuestro sistema de alimentación saludable con esta demo gratuita de 3 días
          </p>
        </div>

        <Tabs defaultValue="menu" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="menu">Menú Demo</TabsTrigger>
            <TabsTrigger value="recetas">Recetas</TabsTrigger>
            <TabsTrigger value="consulta">Consulta Demo</TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="mt-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-center mb-4">Menú de 3 Días - Muestra</h3>
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
                        variant="outline"
                        onClick={() => handleStartDemo(`receta de ${details.name}`)}
                      >
                        Ver Receta Completa
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8 p-6 bg-accent/10 rounded-lg">
              <p className="text-accent font-semibold mb-3">
                🎯 En la versión completa obtienes menús personalizados para 30 días
              </p>
              <Button onClick={handleUpgrade} className="bg-gradient-primary">
                Acceder a Menús Completos
              </Button>
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
                    onClick={() => handleStartDemo("biblioteca de recetas")}
                  >
                    Explorar Recetas Demo
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
                    variant="outline"
                    onClick={() => handleStartDemo("lista de compras inteligente")}
                  >
                    Ver Lista Demo
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8 p-6 bg-accent/10 rounded-lg">
              <p className="text-accent font-semibold mb-3">
                📚 Versión completa incluye video-tutoriales y tips de preparación
              </p>
              <Button onClick={handleUpgrade} className="bg-gradient-primary">
                Desbloquear Todas las Recetas
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="consulta" className="mt-8">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Consulta Demo con Nutricionista</CardTitle>
                  <p className="text-muted-foreground">
                    Experimenta cómo funciona una consulta personalizada con nuestros expertos
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
                      onClick={() => handleStartDemo("consulta con nutricionista")}
                      className="mr-4"
                      variant="outline"
                    >
                      Continuar Demo
                    </Button>
                    <Button onClick={handleUpgrade} className="bg-gradient-primary">
                      Obtener Consultas Reales
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl">
          <h3 className="text-2xl font-bold text-primary mb-4">¿Listo para la Experiencia Completa?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Esta es solo una pequeña muestra. Con nuestros planes completos obtienes menús personalizados ilimitados, 
            consultas reales con nutricionistas y seguimiento completo de tu progreso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleUpgrade} className="bg-gradient-primary px-8">
              Ver Todos los Planes
            </Button>
            <Button variant="outline" onClick={() => navigate('/service-details')}>
              Conocer Más Servicios
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;