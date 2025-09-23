import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import mealPlanImage from "@/assets/meal-plan.jpg";
import deliveryImage from "@/assets/delivery.jpg";
import recipesImage from "@/assets/recipes.jpg";

const Services = () => {
  const services = [
    {
      title: "Planes Personalizados",
      description: "Planes de alimentación diseñados específicamente para tus objetivos, preferencias alimentarias y estilo de vida.",
      image: mealPlanImage,
      features: ["Nutrición personalizada", "Seguimiento profesional", "Ajustes mensuales", "Soporte 24/7"]
    },
    {
      title: "Delivery Saludable", 
      description: "Platos frescos y nutritivos preparados por chefs especializados, entregados directamente en tu puerta.",
      image: deliveryImage,
      features: ["Entrega en 45 min", "Ingredientes frescos", "Comidas balanceadas", "Packaging eco-friendly"]
    },
    {
      title: "Recetas Nutritivas",
      description: "Accede a cientos de recetas fáciles de preparar con información nutricional completa y video tutoriales.",
      image: recipesImage,
      features: ["Videos paso a paso", "Lista de compras", "Información nutricional", "Filtros por dieta"]
    }
  ];

  return (
    <section id="servicios" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Todo lo que necesitas para llevar una alimentación saludable y balanceada
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-gradient-card border-none shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="p-0">
                <div className="h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 pb-0">
                  <CardTitle className="text-2xl text-primary mb-3">{service.title}</CardTitle>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 pt-0">
                <p className="text-muted-foreground mb-4">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-success rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full bg-gradient-primary hover:opacity-90"
                  onClick={() => window.location.href = '/services'}
                >
                  Conocer Más
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;