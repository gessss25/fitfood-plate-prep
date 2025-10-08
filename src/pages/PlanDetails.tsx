import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check, Clock, Users, Utensils, MapPin } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

const PlanDetails = () => {
  const { planId } = useParams();
  const navigate = useNavigate();

  const planData: Record<string, any> = {
    basico: {
      name: "Plan Básico",
      price: 89000,
      originalPrice: 120000,
      description: "Perfecto para empezar tu journey saludable en Valledupar",
      image: "🥗",
      features: [
        "3 comidas balanceadas diarias",
        "Recetas adaptadas al clima caribeño",
        "Lista de compras con productos locales",
        "Soporte nutricional por WhatsApp",
        "Acceso a app móvil básica",
        "Seguimiento mensual de peso"
      ],
      includes: [
        "Desayuno saludable (7am - 9am)",
        "Almuerzo balanceado (12pm - 2pm)", 
        "Cena ligera (6pm - 8pm)",
        "Guía de hidratación para clima cálido",
        "Recetas con ingredientes de Valledupar"
      ],
      schedule: "Lunes a Viernes",
      duration: "Plan mensual renovable",
      location: "Valledupar, Cesar"
    },
    premium: {
      name: "Plan Premium",
      price: 149000,
      originalPrice: 200000,
      description: "La opción más completa para resultados óptimos en el Caribe colombiano",
      image: "⭐",
      features: [
        "5 comidas personalizadas diarias",
        "Snacks tropicales incluidos",
        "Consultas semanales presenciales",
        "Delivery 2 veces por semana",
        "App premium con tracking completo",
        "Plan de ejercicios para clima cálido",
        "Acceso a comunidad VIP",
        "Recetas exclusivas del chef"
      ],
      includes: [
        "Desayuno energizante (6:30am - 8:30am)",
        "Media mañana tropical (10am - 11am)",
        "Almuerzo gourmet (12pm - 2pm)",
        "Merienda refrescante (4pm - 5pm)",
        "Cena premium (6:30pm - 8pm)",
        "Delivery en zonas centrales de Valledupar",
        "Consulta nutricional semanal de 45 min"
      ],
      schedule: "7 días a la semana",
      duration: "Plan trimestral con descuentos",
      location: "Valledupar centro y alrededores"
    },
    familiar: {
      name: "Plan Familiar",
      price: 249000,
      originalPrice: 320000,
      description: "Alimentación saludable para toda la familia vallenata",
      image: "👨‍👩‍👧‍👦",
      features: [
        "Planes para hasta 4 personas",
        "Menús adaptados por edades (niños/adultos)",
        "Recetas familiares tradicionales saludables",
        "Delivery familiar 3 veces por semana",
        "Educación nutricional para niños",
        "Actividades físicas familiares",
        "Consultas grupales mensuales",
        "Soporte 24/7 por WhatsApp"
      ],
      includes: [
        "Menús diferenciados por edad",
        "Porciones familiares generosas",
        "Recetas de la cocina vallenata saludable",
        "Kit de utensilios familiares",
        "Talleres de cocina para niños",
        "Plan de actividades al aire libre",
        "Consulta familiar mensual de 1 hora"
      ],
      schedule: "Lunes a Domingo",
      duration: "Plan semestral con beneficios",
      location: "Todo Valledupar y municipios cercanos"
    }
  };

  const currentPlan = planData[planId as string];

  if (!currentPlan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Plan no encontrado</h1>
          <Button onClick={() => navigate('/services')}>
            Volver a Servicios
          </Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const sampleMenu = {
    desayuno: [
      {
        name: "Bowl de Açaí Tropical",
        description: "Açaí, mango, plátano, granola casera",
        image: "🥣"
      },
      {
        name: "Arepa Integral con Aguacate",
        description: "Arepa de maíz integral, aguacate, huevo",
        image: "🫓"
      }
    ],
    almuerzo: [
      {
        name: "Pescado al Coco Caribeño",
        description: "Pescado fresco, arroz integral, ensalada tropical",
        image: "🐟"
      },
      {
        name: "Pollo Guisado Saludable",
        description: "Pollo con vegetales, yuca asada, ensalada",
        image: "🍗"
      }
    ],
    cena: [
      {
        name: "Sopa de Lentejas Criolla",
        description: "Lentejas, vegetales frescos, arepa pequeña",
        image: "🍲"
      },
      {
        name: "Ensalada de Quinoa Tropical",
        description: "Quinoa, frutas de la región, aderezo natural",
        image: "🥗"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <Button 
          variant="outline" 
          onClick={() => navigate('/services')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a Servicios
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Plan Info */}
          <div>
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{currentPlan.image}</div>
              <h1 className="text-4xl font-bold text-primary mb-4">{currentPlan.name}</h1>
              <p className="text-xl text-muted-foreground mb-6">{currentPlan.description}</p>
              
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">{formatPrice(currentPlan.price)}</div>
                  <div className="text-sm text-muted-foreground line-through">
                    {formatPrice(currentPlan.originalPrice)}
                  </div>
                </div>
                <Badge className="bg-success text-success-foreground">
                  Ahorra {formatPrice(currentPlan.originalPrice - currentPlan.price)}
                </Badge>
              </div>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Check className="w-5 h-5 text-success mr-2" />
                  Qué Incluye
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {currentPlan.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-4 h-4 text-success mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="font-semibold">Horario</p>
                  <p className="text-sm text-muted-foreground">{currentPlan.schedule}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="font-semibold">Cobertura</p>
                  <p className="text-sm text-muted-foreground">{currentPlan.location}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Interactive Menu & Details */}
          <div>
            <Tabs defaultValue="menu" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="menu">Menú</TabsTrigger>
                <TabsTrigger value="includes">Detalles</TabsTrigger>
                <TabsTrigger value="schedule">Horarios</TabsTrigger>
              </TabsList>
              
              <TabsContent value="menu" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Utensils className="w-5 h-5 text-primary mr-2" />
                      Menús de Ejemplo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {Object.entries(sampleMenu).map(([meal, items]) => (
                      <div key={meal}>
                        <h4 className="font-semibold mb-3 capitalize text-primary">{meal}</h4>
                        <div className="grid gap-3">
                          {items.map((item, index) => (
                            <div key={index} className="flex items-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                              <span className="text-2xl mr-3">{item.image}</span>
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="includes">
                <Card>
                  <CardHeader>
                    <CardTitle>Detalles del Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {currentPlan.includes.map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0 mt-2" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="schedule">
                <Card>
                  <CardHeader>
                    <CardTitle>Información del Servicio</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-semibold text-primary">Duración:</p>
                      <p className="text-sm text-muted-foreground">{currentPlan.duration}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Horario de Atención:</p>
                      <p className="text-sm text-muted-foreground">{currentPlan.schedule}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Cobertura:</p>
                      <p className="text-sm text-muted-foreground">{currentPlan.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-8 space-y-4">
              <Button 
                className="w-full bg-gradient-primary text-lg py-6"
                onClick={() => openWhatsApp(`Hola! Quiero empezar con el ${currentPlan.name} (${formatPrice(currentPlan.price)}/mes). ¿Cómo puedo inscribirme?`)}
              >
                Empezar con {currentPlan.name}
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => openWhatsApp(`Hola! Me gustaría recibir una consulta personalizada gratuita sobre el ${currentPlan.name}.`)}
              >
                Consulta Personalizada Gratis
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;