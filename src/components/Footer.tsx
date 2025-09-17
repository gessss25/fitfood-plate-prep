const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">F</span>
              </div>
              <h3 className="text-xl font-bold">FitFood Online</h3>
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
              <p>📱 +57 300 123 4567</p>
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