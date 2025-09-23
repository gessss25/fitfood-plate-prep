import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";

const Services = () => {
  const navigate = useNavigate();

  const plans = [
    {
      id: "basico",
      name: "Plan Básico",
      price: 65000,
      originalPrice: 89000,
      period: "/mes",
      description: "Ideal para empezar tu transformación saludable",
      features: [
        "3 comidas personalizadas diarias",
        "Recetas semanales fáciles de preparar", 
        "Lista de compras automatizada",
        "Soporte por email 24/7",
        "Acceso a app móvil básica",
        "Seguimiento de peso mensual"
      ],
      popular: false,
      color: "bg-card",
      savings: "Ahorra $24.000"
    },
    {
      id: "premium",
      name: "Plan Premium",
      price: 119000,
      originalPrice: 149000,
      period: "/mes",
      description: "La opción más completa para resultados óptimos",
      features: [
        "5 comidas personalizadas diarias",
        "Snacks saludables incluidos",
        "Consultas semanales con nutricionista",
        "Delivery 2 veces por semana en Valledupar",
        "App móvil premium con tracking",
        "Seguimiento de progreso detallado",
        "Plan de ejercicios personalizado",
        "Acceso a fisioterapeutas deportivos",
        "Acceso a comunidad exclusiva"
      ],
      popular: true,
      color: "bg-gradient-primary",
      savings: "Ahorra $30.000"
    },
    {
      id: "familiar", 
      name: "Plan Familiar",
      price: 199000,
      originalPrice: 249000,
      period: "/mes",
      description: "Alimentación saludable para toda la familia",
      features: [
        "Planes para hasta 4 personas",
        "Menús adaptados por edades",
        "Recetas familiares deliciosas",
        "Delivery familiar 3 veces/semana",
        "Educación nutricional para niños",
        "Consultas familiares mensuales",
        "Plan de actividades físicas grupales",
        "Soporte premium 24/7"
      ],
      popular: false,
      color: "bg-card",
      savings: "Ahorra $50.000"
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-16">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Inicio
          </Button>
          
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Nuestros Servicios
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Planes de alimentación saludable diseñados específicamente para el estilo de vida en Valledupar, Colombia
          </p>
          
          <div className="bg-accent/10 rounded-lg p-4 mt-8 max-w-2xl mx-auto">
            <p className="text-accent font-semibold">🎉 Promoción de Lanzamiento - Hasta 25% de descuento</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative border-none shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-2 ${
                plan.popular ? 'ring-2 ring-primary scale-105' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground">
                  Más Popular
                </Badge>
              )}

              {plan.savings && (
                <Badge className="absolute -top-3 right-4 bg-success text-success-foreground">
                  {plan.savings}
                </Badge>
              )}
              
              <CardHeader className={`${plan.color} ${plan.popular ? 'text-white' : ''} rounded-t-lg`}>
                <CardTitle className="text-center">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold">{formatPrice(plan.price)}</span>
                      <span className="text-lg opacity-80">{plan.period}</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-sm opacity-70 line-through mr-2">
                        {formatPrice(plan.originalPrice)}
                      </span>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-4 h-4 text-success mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="space-y-3">
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-primary hover:opacity-90' 
                        : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                    }`}
                    onClick={() => {
                      if (plan.id === "premium") {
                        navigate('/fisioterapia');
                      } else {
                        navigate(`/plan-details/${plan.id}`);
                      }
                    }}
                  >
                    {plan.popular ? 'Ver Fisioterapeutas' : 'Seleccionar Plan'}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate(`/plan-details/${plan.id}`)}
                  >
                    Conocer Más
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-primary mb-4">¿Tienes dudas sobre qué plan elegir?</h3>
          <p className="text-muted-foreground mb-6">
            Nuestro equipo de nutricionistas te ayudará a encontrar el plan perfecto para tus objetivos
          </p>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Consulta Gratuita
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Services;