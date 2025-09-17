import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "María González",
      role: "Ejecutiva",
      testimonial: "FitFood cambió completamente mi relación con la comida. Los planes personalizados se adaptaron perfectamente a mi rutina laboral.",
      rating: 5
    },
    {
      name: "Carlos Ruiz", 
      role: "Deportista",
      testimonial: "El delivery es súper conveniente y la comida siempre llega fresca. He mejorado mi rendimiento deportivo significativamente.",
      rating: 5
    },
    {
      name: "Ana Martín",
      role: "Madre de familia",
      testimonial: "Las recetas son fáciles y nutritivas. Mis hijos ahora comen más verduras sin quejarse. ¡Increíble!",
      rating: 5
    }
  ];

  const benefits = [
    {
      number: "10k+",
      title: "Clientes Satisfechos",
      description: "Miles de personas han transformado su alimentación"
    },
    {
      number: "500+", 
      title: "Recetas Disponibles",
      description: "Variedad infinita para todos los gustos"
    },
    {
      number: "98%",
      title: "Tasa de Éxito",
      description: "Clientes que logran sus objetivos nutricionales"
    },
    {
      number: "24/7",
      title: "Soporte Disponible", 
      description: "Estamos aquí cuando nos necesites"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Estadísticas */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {benefit.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonios */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Lo que Dicen Nuestros Clientes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Historias reales de personas que han transformado su vida con FitFood Online
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gradient-card border-none shadow-medium hover:shadow-strong transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-accent text-xl">★</span>
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.testimonial}"
                </p>
                
                <div className="border-t pt-4">
                  <p className="font-semibold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;