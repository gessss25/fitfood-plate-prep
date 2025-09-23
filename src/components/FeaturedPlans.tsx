import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FeaturedPlans = () => {
  const plans = [
    {
      name: "Plan Básico",
      price: "$65.000",
      period: "/mes",
      description: "Perfecto para empezar tu journey saludable",
      features: [
        "3 comidas personalizadas",
        "Recetas semanales", 
        "Lista de compras",
        "Soporte por email"
      ],
      popular: false,
      color: "bg-card"
    },
    {
      name: "Plan Premium",
      price: "$119.000", 
      period: "/mes",
      description: "La opción más completa para resultados óptimos",
      features: [
        "5 comidas personalizadas",
        "Snacks saludables incluidos",
        "Consultas con nutricionista",
        "Delivery 2 veces/semana",
        "App móvil premium",
        "Fisioterapeutas deportivos"
      ],
      popular: true,
      color: "bg-gradient-primary"
    },
    {
      name: "Plan Familiar",
      price: "$199.000",
      period: "/mes", 
      description: "Alimentación saludable para toda la familia",
      features: [
        "Planes para 4 personas",
        "Menús adaptados por edades",
        "Recetas familiares",
        "Delivery familiar",
        "Educación nutricional"
      ],
      popular: false,
      color: "bg-card"
    }
  ];

  return (
    <section id="planes" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Planes de Alimentación
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tu estilo de vida y objetivos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-none shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-2 ${
                plan.popular ? 'ring-2 ring-primary scale-105' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground">
                  Más Popular
                </Badge>
              )}
              
              <CardHeader className={`${plan.color} ${plan.popular ? 'text-white' : ''} rounded-t-lg`}>
                <CardTitle className="text-center">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-lg opacity-80">{plan.period}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-success rounded-full mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-primary hover:opacity-90' 
                      : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                  }`}
                >
                  {plan.popular ? 'Empezar Ahora' : 'Seleccionar Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlans;