import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Users, Utensils, Truck, Calendar, Heart } from "lucide-react";

const ServiceDetails = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <Utensils className="w-12 h-12 text-primary" />,
      title: "Planes de Alimentación Personalizados",
      description: "Diseñamos tu plan nutricional ideal basado en tus objetivos, restricciones alimentarias y estilo de vida.",
      features: [
        "Evaluación nutricional completa",
        "Menús personalizados semanales",
        "Ajustes mensuales según progreso",
        "Recetas fáciles de preparar",
        "Lista de compras automatizada"
      ],
      action: () => navigate('/services')
    },
    {
      icon: <Truck className="w-12 h-12 text-primary" />,
      title: "Delivery de Comidas Saludables",
      description: "Platos frescos, nutritivos y deliciosos preparados por chefs especializados y entregados en tu puerta.",
      features: [
        "Entrega en 30-45 minutos",
        "Ingredientes 100% frescos",
        "Comidas balanceadas nutricionalmente",
        "Packaging eco-friendly",
        "Temperatura perfecta garantizada"
      ],
      action: () => navigate('/services')
    },
    {
      icon: <Calendar className="w-12 h-12 text-primary" />,
      title: "Consultoría Nutricional Online",
      description: "Sesiones virtuales con nutricionistas certificados para resolver dudas y optimizar tu alimentación.",
      features: [
        "Consultas virtuales programadas",
        "Análisis de hábitos alimentarios",
        "Recomendaciones personalizadas",
        "Seguimiento de progreso",
        "Soporte 24/7 vía chat"
      ],
      action: () => navigate('/services')
    },
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "Planes Familiares",
      description: "Alimentación saludable para toda la familia, adaptada a diferentes edades y necesidades nutricionales.",
      features: [
        "Menús adaptados por edades",
        "Recetas familiares divertidas",
        "Educación nutricional para niños",
        "Actividades físicas grupales",
        "Descuentos por múltiples miembros"
      ],
      action: () => navigate('/services')
    },
    {
      icon: <Heart className="w-12 h-12 text-primary" />,
      title: "Asistencia Fisioterapéutica Deportiva",
      description: "Fisioterapeutas especializados en deporte te ayudan con rehabilitación y prevención de lesiones.",
      features: [
        "Evaluación postural completa",
        "Planes de rehabilitación personalizados",
        "Prevención de lesiones deportivas",
        "Terapia manual especializada",
        "Seguimiento continuo de progreso"
      ],
      action: () => navigate('/fisioterapia')
    },
    {
      icon: <Clock className="w-12 h-12 text-primary" />,
      title: "Monitoreo y Seguimiento",
      description: "Tecnología avanzada para trackear tu progreso y hacer ajustes en tiempo real a tu plan nutricional.",
      features: [
        "App móvil con tracking",
        "Medición de progreso semanal",
        "Alertas y recordatorios",
        "Gráficos de evolución",
        "Reportes detallados mensuales"
      ],
      action: () => navigate('/services')
    }
  ];

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
            Nuestros Servicios Especializados
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubre todos los servicios que tenemos disponibles para ayudarte a alcanzar tus objetivos de salud y bienestar
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="border-none shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-2"
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-xl text-primary mb-3">{service.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <div className="w-2 h-2 bg-success rounded-full mr-3 mt-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full bg-gradient-primary hover:opacity-90 mt-4"
                  onClick={service.action}
                >
                  Explorar Servicio
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-card rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-4">¿Necesitas ayuda para elegir?</h3>
            <p className="text-muted-foreground mb-6">
              Nuestro equipo de expertos está disponible para guiarte hacia el servicio que mejor se adapte a tus necesidades específicas
            </p>
            <div className="space-y-3 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">
                Consulta Gratuita
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Contactar Asesor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;