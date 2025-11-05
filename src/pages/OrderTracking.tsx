import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Package, ChefHat, ClipboardCheck, Truck, CheckCircle, Phone, MapPin, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface Order {
  id: string;
  payment_code: string;
  plan_name: string;
  amount: number;
  order_status: string;
  courier_name: string | null;
  courier_phone: string | null;
  courier_location: any;
  estimated_delivery_time: string | null;
  status_updated_at: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string | null;
  created_at: string;
}

const OrderTracking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paymentCode = searchParams.get('code');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const previousStatusRef = useRef<string | null>(null);

  const statusSteps = [
    { 
      key: 'received', 
      label: 'Orden Recibida', 
      description: 'Hemos recibido tu pedido',
      icon: Package, 
      gradient: 'from-blue-500 to-blue-600' 
    },
    { 
      key: 'preparing', 
      label: 'En Preparación', 
      description: 'Tu comida está siendo preparada',
      icon: ChefHat, 
      gradient: 'from-amber-500 to-orange-500' 
    },
    { 
      key: 'quality_control', 
      label: 'Control Nutricional', 
      description: 'Verificando valores nutricionales y empacando',
      icon: ClipboardCheck, 
      gradient: 'from-purple-500 to-purple-600' 
    },
    { 
      key: 'in_delivery', 
      label: 'En Reparto', 
      description: 'Tu pedido está en camino',
      icon: Truck, 
      gradient: 'from-green-500 to-emerald-600' 
    },
    { 
      key: 'delivered', 
      label: 'Entregado', 
      description: '¡Disfruta tu comida!',
      icon: CheckCircle, 
      gradient: 'from-green-600 to-green-700' 
    },
  ];

  useEffect(() => {
    if (!paymentCode) {
      navigate('/');
      return;
    }

    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('payment_code', paymentCode)
        .single();

      if (error || !data) {
        toast({
          title: 'Error',
          description: 'No se pudo encontrar el pedido',
          variant: 'destructive',
        });
        navigate('/');
        return;
      }

      setOrder(data);
      setLoading(false);
    };

    fetchOrder();

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`order-${paymentCode}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `payment_code=eq.${paymentCode}`,
        },
        (payload) => {
          const updatedOrder = payload.new as Order;
          const oldStatus = previousStatusRef.current;
          previousStatusRef.current = updatedOrder.order_status;
          
          setOrder(updatedOrder);
          
          // Special notification when order goes to delivery
          if (updatedOrder.order_status === 'in_delivery' && oldStatus !== 'in_delivery') {
            const etaText = updatedOrder.estimated_delivery_time 
              ? ` - ETA: ${new Date(updatedOrder.estimated_delivery_time).toLocaleTimeString('es-DO', { hour: '2-digit', minute: '2-digit' })}`
              : '';
            
            toast({
              title: '🚚 ¡Tu pedido está en camino!',
              description: updatedOrder.courier_name 
                ? `${updatedOrder.courier_name} ha tomado tu pedido${etaText}`
                : `Un mensajero ha tomado tu pedido${etaText}`,
              duration: 8000,
            });
          } else {
            // Show notification for other status changes
            const currentStatus = statusSteps.find(s => s.key === updatedOrder.order_status);
            if (currentStatus && oldStatus !== updatedOrder.order_status) {
              toast({
                title: 'Estado Actualizado',
                description: `${currentStatus.label}: ${currentStatus.description}`,
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [paymentCode, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!order) return null;

  const currentStepIndex = statusSteps.findIndex(s => s.key === order.order_status);
  const isCancelled = order.order_status === 'cancelled';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Seguimiento en Vivo
            </h1>
            <p className="text-muted-foreground text-lg">
              Código: <span className="font-mono font-bold text-foreground">{order.payment_code}</span>
            </p>
          </div>

          {/* Visual Status Progress - Domino's Style */}
          {!isCancelled && (
            <div className="relative">
              {/* Progress Bar Background */}
              <div className="absolute top-16 left-0 right-0 h-2 bg-muted rounded-full hidden md:block" />
              <div 
                className="absolute top-16 left-0 h-2 bg-gradient-to-r from-primary to-primary-glow rounded-full hidden md:block transition-all duration-1000 ease-out"
                style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
              />
              
              {/* Status Steps */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {statusSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;

                  return (
                    <div key={step.key} className="flex flex-col items-center text-center relative">
                      {/* Icon Circle */}
                      <div
                        className={`w-32 h-32 rounded-2xl flex flex-col items-center justify-center mb-4 transition-all duration-500 transform ${
                          isCurrent ? 'scale-110 shadow-2xl' : 'scale-100'
                        } ${
                          isCompleted
                            ? `bg-gradient-to-br ${step.gradient} text-white shadow-lg`
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <Icon className={`${isCurrent ? 'w-12 h-12' : 'w-10 h-10'} mb-2 transition-all`} />
                        {isCurrent && (
                          <div className="flex gap-1 mt-2">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-100" />
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-200" />
                          </div>
                        )}
                      </div>

                      {/* Label */}
                      <div className="space-y-1">
                        <h3 className={`font-bold text-sm md:text-base ${isCurrent ? 'text-primary' : ''}`}>
                          {step.label}
                        </h3>
                        <p className="text-xs text-muted-foreground hidden md:block">
                          {step.description}
                        </p>
                        {isCurrent && (
                          <Badge variant="default" className="mt-2">
                            En Proceso
                          </Badge>
                        )}
                        {isCompleted && !isCurrent && (
                          <CheckCircle className="w-5 h-5 text-success mx-auto mt-2" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Order Details Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-muted/50 to-background">
              <CardTitle>Detalles del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Plan Seleccionado</p>
                    <p className="text-lg font-bold text-foreground">{order.plan_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monto Total</p>
                    <p className="text-2xl font-bold text-primary">RD$ {order.amount}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Cliente</p>
                    <p className="text-lg font-semibold">{order.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <p className="font-semibold">{order.customer_phone}</p>
                  </div>
                  {order.customer_address && (
                    <div>
                      <p className="text-sm text-muted-foreground">Dirección de Entrega</p>
                      <p className="font-semibold">{order.customer_address}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cancelled State */}
          {isCancelled && (
            <Card className="border-destructive shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 p-6 bg-destructive/10 rounded-lg">
                  <div className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center">
                    <Package className="w-8 h-8 text-destructive-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-destructive">Pedido Cancelado</h3>
                    <p className="text-muted-foreground">Este pedido ha sido cancelado</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Courier Info - Prominent Card */}
          {order.order_status === 'in_delivery' && order.courier_name && (
            <Card className="border-2 border-primary shadow-2xl bg-gradient-to-br from-primary/5 to-primary-glow/5 animate-in fade-in duration-500">
              <CardHeader className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Truck className="w-6 h-6 animate-pulse" />
                  </div>
                  Tu pedido está en camino
                </CardTitle>
                <CardDescription className="text-primary-foreground/90 text-base">
                  Un mensajero ha tomado tu pedido y se dirige a tu ubicación
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tu Mensajero</p>
                      <p className="font-bold text-lg">{order.courier_name}</p>
                      {order.courier_phone && (
                        <p className="text-sm text-muted-foreground mt-1">{order.courier_phone}</p>
                      )}
                    </div>
                  </div>
                  
                  {order.estimated_delivery_time && (
                    <div className="flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-warning" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Llegada Estimada</p>
                        <p className="font-bold text-2xl text-warning">
                          {new Date(order.estimated_delivery_time).toLocaleTimeString('es-DO', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(new Date(order.estimated_delivery_time), { 
                            addSuffix: true,
                            locale: es 
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 animate-pulse">
                      <MapPin className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Estado</p>
                      <p className="font-bold text-success">En Camino</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Rumbo a tu dirección
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center">
            <Button 
              onClick={() => navigate('/')} 
              variant="outline" 
              size="lg"
              className="min-w-[200px]"
            >
              Volver al Inicio
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTracking;
