import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.message) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa tu nombre y mensaje.",
        variant: "destructive"
      });
      return;
    }

    const whatsappMessage = `Hola! Mi nombre es ${formData.name}.
${formData.email ? `Email: ${formData.email}` : ''}
${formData.phone ? `Teléfono: ${formData.phone}` : ''}

Mensaje: ${formData.message}`;

    openWhatsApp(whatsappMessage);
    
    toast({
      title: "¡Redirigiendo a WhatsApp!",
      description: "Te llevaremos a WhatsApp para enviar tu mensaje.",
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Teléfono",
      content: "+57 322 238 6414",
      action: () => openWhatsApp("Hola! Me gustaría obtener más información sobre FitFood Online.")
    },
    {
      icon: Mail,
      title: "Email",
      content: "hola@fitfoodonline.com",
      action: () => window.location.href = "mailto:hola@fitfoodonline.com"
    },
    {
      icon: MapPin,
      title: "Ubicación",
      content: "Valledupar, Colombia",
      action: null
    },
    {
      icon: Clock,
      title: "Horario",
      content: "Lun-Vie: 8:00 - 17:00",
      action: null
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Contáctanos
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Estamos aquí para ayudarte en tu viaje hacia una vida más saludable.
              ¡Escríbenos y te responderemos lo antes posible!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Envíanos un Mensaje
                </CardTitle>
                <CardDescription>
                  Completa el formulario y te contactaremos por WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium block mb-2">
                      Nombre *
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-sm font-medium block mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="text-sm font-medium block mb-2">
                      Teléfono
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+57 300 123 4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="text-sm font-medium block mb-2">
                      Mensaje *
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="¿En qué podemos ayudarte?"
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Enviar por WhatsApp
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información de Contacto</CardTitle>
                  <CardDescription>
                    Encuentra todas las formas de comunicarte con nosotros
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <div
                        key={index}
                        className={`flex items-start gap-4 p-4 rounded-lg border border-border transition-colors ${
                          info.action ? 'hover:bg-accent cursor-pointer' : ''
                        }`}
                        onClick={info.action || undefined}
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                          <p className="text-muted-foreground">{info.content}</p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Quick Contact Button */}
              <Card className="bg-gradient-hero text-white border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">¿Necesitas ayuda inmediata?</h3>
                  <p className="mb-4 text-white/90">
                    Contáctanos directamente por WhatsApp y te responderemos en minutos
                  </p>
                  <Button
                    onClick={() => openWhatsApp("Hola! Necesito ayuda urgente. ¿Pueden atenderme?")}
                    className="w-full bg-white text-primary hover:bg-white/90"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat en Vivo por WhatsApp
                  </Button>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card>
                <CardHeader>
                  <CardTitle>¿Por qué elegirnos?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                    <p className="text-muted-foreground">
                      Respuesta rápida en menos de 24 horas
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                    <p className="text-muted-foreground">
                      Asesoría personalizada con expertos en nutrición
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                    <p className="text-muted-foreground">
                      Planes adaptados a tus necesidades y objetivos
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                    <p className="text-muted-foreground">
                      Soporte continuo durante todo tu proceso
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
