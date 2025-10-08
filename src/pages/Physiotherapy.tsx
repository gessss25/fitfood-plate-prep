import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Award, Clock, MessageCircle, Calendar, Shield } from "lucide-react";
import { useState } from "react";
import { openWhatsApp } from "@/lib/whatsapp";
import { useToast } from "@/hooks/use-toast";

const Physiotherapy = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    issue: '',
    urgency: 'normal'
  });

  const physiotherapists = [
    {
      name: "Dr. Carlos Mendoza",
      specialty: "Fisioterapeuta Deportivo",
      experience: "8 años",
      certifications: ["Certificado en Medicina Deportiva", "Especialista en Rehabilitación"],
      rating: 4.9,
      availability: "Disponible",
      image: "👨‍⚕️"
    },
    {
      name: "Dra. Ana Rodríguez",
      specialty: "Fisioterapeuta y Kinesióloga",
      experience: "12 años",
      certifications: ["Master en Terapia Manual", "Certificado en Pilates Terapéutico"],
      rating: 4.8,
      availability: "Disponible",
      image: "👩‍⚕️"
    },
    {
      name: "Dr. Miguel Santos",
      specialty: "Fisioterapeuta Deportivo",
      experience: "6 años",
      certifications: ["Especialista en Lesiones Deportivas", "Certified Strength Coach"],
      rating: 4.7,
      availability: "Ocupado",
      image: "👨‍⚕️"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const urgencyText = {
      normal: 'Normal (24-48 horas)',
      urgent: 'Urgente (Mismo día)',
      emergency: 'Emergencia (Inmediato)'
    }[formData.urgency];
    
    const message = `Hola! Solicito consulta de fisioterapia deportiva:

*Nombre:* ${formData.name}
*Email:* ${formData.email}
*Teléfono:* ${formData.phone}
*Urgencia:* ${urgencyText}

*Descripción de la situación:*
${formData.issue}`;

    openWhatsApp(message);
    
    toast({
      title: "Redirigiendo a WhatsApp",
      description: "Te conectaremos con nuestro equipo de fisioterapeutas",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-16">
          <Button 
            variant="outline" 
            onClick={() => navigate('/services')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Planes
          </Button>
          
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Asistencia Fisioterapéutica Deportiva
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Fisioterapeutas especializados en deporte para ayudarte con rehabilitación, prevención de lesiones y optimización del rendimiento
          </p>
          
          <div className="bg-accent/10 rounded-lg p-4 mt-8 max-w-2xl mx-auto">
            <p className="text-accent font-semibold">🏥 Consulta inicial gratuita - Evaluación completa incluida</p>
          </div>
        </div>

        {/* Equipo de Fisioterapeutas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">Nuestro Equipo de Especialistas</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {physiotherapists.map((physio, index) => (
              <Card key={index} className="border-none shadow-medium hover:shadow-strong transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{physio.image}</div>
                  <CardTitle className="text-xl text-primary">{physio.name}</CardTitle>
                  <p className="text-muted-foreground">{physio.specialty}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Award className="w-4 h-4 text-primary mr-2" />
                      <span className="text-sm">{physio.experience}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-semibold">⭐ {physio.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {physio.certifications.map((cert, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={physio.availability === "Disponible" ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {physio.availability}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Formulario de Consulta */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-6">Describe tu Situación</h3>
            <Card className="border-none shadow-medium">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Nombre Completo</label>
                      <Input 
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input 
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Teléfono</label>
                    <Input 
                      placeholder="3XX XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Describe tu situación o lesión</label>
                    <Textarea 
                      placeholder="Cuéntanos sobre tu lesión, dolor, o qué tipo de asesoría necesitas..."
                      rows={4}
                      value={formData.issue}
                      onChange={(e) => setFormData({...formData, issue: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Urgencia</label>
                    <select 
                      className="w-full p-2 border border-border rounded-md"
                      value={formData.urgency}
                      onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                    >
                      <option value="normal">Normal (24-48 horas)</option>
                      <option value="urgent">Urgente (Mismo día)</option>
                      <option value="emergency">Emergencia (Inmediato)</option>
                    </select>
                  </div>
                  
                  <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Enviar Consulta
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Información de Servicios */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-6">¿Cómo te Ayudamos?</h3>
            
            <div className="space-y-6">
              <Card className="border-none shadow-medium">
                <CardHeader>
                  <div className="flex items-center">
                    <Clock className="w-6 h-6 text-primary mr-3" />
                    <CardTitle className="text-lg">Atención Inmediata</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Respuesta en menos de 2 horas durante horario laboral. Para emergencias, atención inmediata.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-medium">
                <CardHeader>
                  <div className="flex items-center">
                    <User className="w-6 h-6 text-primary mr-3" />
                    <CardTitle className="text-lg">Evaluación Personalizada</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Cada caso es único. Nuestros especialistas analizan tu situación específica para darte el mejor tratamiento.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-medium">
                <CardHeader>
                  <div className="flex items-center">
                    <Calendar className="w-6 h-6 text-primary mr-3" />
                    <CardTitle className="text-lg">Seguimiento Continuo</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    No solo tratamos, te acompañamos en todo el proceso de recuperación y prevención.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-medium">
                <CardHeader>
                  <div className="flex items-center">
                    <Shield className="w-6 h-6 text-primary mr-3" />
                    <CardTitle className="text-lg">Confidencialidad Garantizada</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Toda tu información médica se maneja con total confidencialidad y profesionalismo.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Physiotherapy;