import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-healthy-food.jpg";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="relative z-10 container mx-auto px-4 text-center text-foreground">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Alimentación <br />
          <span className="text-primary">Saludable</span> <br />
          a tu Alcance
        </h1>
        
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
          Descubre planes personalizados, delivery de comida saludable y recetas nutritivas 
          para transformar tu estilo de vida
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button 
            size="lg" 
            className="px-6 py-3 text-base bg-gradient-primary hover:opacity-90"
            onClick={() => navigate('/services')}
          >
            Explorar Planes
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="px-6 py-3 text-base border-accent text-accent hover:bg-accent hover:text-white"
            onClick={() => navigate('/demo')}
          >
            🎯 Prueba Demo Gratis
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="px-6 py-3 text-base"
            onClick={() => navigate('/service-details')}
          >
            Explorar Nuestros Servicios
          </Button>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;