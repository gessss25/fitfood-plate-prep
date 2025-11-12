import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
import AuthModal from "./AuthModal";
import { User } from "@supabase/supabase-js";
import { Shield, MessageCircle } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAdmin } = useUserRole();

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
          <a href="/service-details" className="text-foreground hover:text-primary transition-colors">Servicios</a>
          <a href="/menu-del-dia" className="text-foreground hover:text-primary transition-colors">Menú del Día</a>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => openWhatsApp('Hola! Me gustaría obtener más información sobre FitFood Online.')}
            className="gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Contacto
          </Button>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm">Hola, {user.email?.split('@')[0]}</span>
              {isAdmin && (
                <Link to="/admin">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    Admin
                  </Button>
                </Link>
              )}
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