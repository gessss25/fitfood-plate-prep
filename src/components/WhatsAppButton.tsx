import { MessageCircle } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

const WhatsAppButton = () => {
  return (
    <button
      onClick={() => openWhatsApp('Hola! Me gustaría obtener más información sobre FitFood Online.')}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA59] text-white p-4 rounded-full shadow-strong transition-all duration-300 hover:scale-110 animate-bounce"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
};

export default WhatsAppButton;
