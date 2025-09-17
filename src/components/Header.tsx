import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">F</span>
          </div>
          <h1 className="text-2xl font-bold text-primary">FitFood Online</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#planes" className="text-foreground hover:text-primary transition-colors">Planes</a>
          <a href="#delivery" className="text-foreground hover:text-primary transition-colors">Delivery</a>
          <a href="#recetas" className="text-foreground hover:text-primary transition-colors">Recetas</a>
          <a href="#contacto" className="text-foreground hover:text-primary transition-colors">Contacto</a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">Iniciar Sesión</Button>
          <Button size="sm" className="bg-gradient-primary hover:opacity-90">Registro</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;