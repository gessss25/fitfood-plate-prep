import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          ¿Listo para Empezar tu 
          <span className="text-accent block">Transformación?</span>
        </h2>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          Comienza tu transformación hacia una vida más saludable con FitFood Online
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg font-semibold shadow-strong"
          >
            Empezar Prueba Gratuita
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white text-white hover:bg-white hover:text-primary px-10 py-6 text-lg"
          >
            Hablar con Experto
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 text-center text-sm opacity-80">
          <div>✅ Sin compromiso inicial</div>
          <div>✅ Cancelación en cualquier momento</div>  
          <div>✅ Soporte personalizado</div>
        </div>
      </div>
    </section>
  );
};

export default CTA;