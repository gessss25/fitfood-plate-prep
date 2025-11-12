import { openWhatsApp } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Logo variant="light" size="sm" />
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Tu partner en alimentación saludable. Transformamos vidas a través de la nutrición personalizada.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Facebook</a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Instagram</a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Twitter</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#planes" className="hover:text-primary-foreground transition-colors">Planes Personalizados</a></li>
              <li><a href="#delivery" className="hover:text-primary-foreground transition-colors">Delivery Saludable</a></li>
              <li><a href="#recetas" className="hover:text-primary-foreground transition-colors">Recetas Nutritivas</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Consultoría Nutricional</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Contacto</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Términos y Condiciones</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-primary-foreground/80">
              <p>📧 hola@fitfoodonline.com</p>
              <button 
                onClick={() => openWhatsApp('Hola! Me gustaría obtener más información sobre FitFood Online.')}
                className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                📱 +57 322 238 6414
              </button>
              <p>📍 Valledupar, Colombia</p>
              <p>🕐 Lun-Vie: 8:00 - 17:00</p>
            </div>
          </div>
        </div>
        
        <hr className="border-primary-foreground/20 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-primary-foreground/60 text-sm">
          <p>&copy; 2024 FitFood Online. Todos los derechos reservados.</p>
          <p>Diseñado con 💚 para una vida más saludable</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;