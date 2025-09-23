import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import AuthModal from "./AuthModal";
import { User } from "@supabase/supabase-js";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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
          <a href="/#planes" className="text-foreground hover:text-primary transition-colors">Planes</a>
          <a href="/services" className="text-foreground hover:text-primary transition-colors">Servicios</a>
          <a href="/menu-del-dia" className="text-foreground hover:text-primary transition-colors">Menú del Día</a>
          <a href="#contacto" className="text-foreground hover:text-primary transition-colors">Contacto</a>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm">Hola, {user.email?.split('@')[0]}</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => supabase.auth.signOut()}
              >
                Cerrar Sesión
              </Button>
            </div>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAuthModal(true)}
              >
                Iniciar Sesión
              </Button>
              <Button 
                size="sm" 
                className="bg-gradient-primary hover:opacity-90"
                onClick={() => setShowAuthModal(true)}
              >
                Registro
              </Button>
            </>
          )}
        </div>
      </div>
      
      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal} 
      />
    </header>
  );
};

export default Header;