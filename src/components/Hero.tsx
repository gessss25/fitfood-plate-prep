import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-healthy-food.jpg";

const Hero = () => {
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
            className="px-6 py-3 text-base"
          >
            Explorar Planes
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="px-6 py-3 text-base"
          >
            Ver Menú del Día
          </Button>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;