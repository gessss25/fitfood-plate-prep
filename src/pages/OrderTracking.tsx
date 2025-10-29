import { useEffect, useState } from 'react';
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

  const statusSteps = [
    { key: 'received', label: 'Orden Recibida', icon: Package, color: 'bg-blue-500' },
    { key: 'preparing', label: 'En Preparación', icon: ChefHat, color: 'bg-yellow-500' },
    { key: 'quality_control', label: 'Control Nutricional/Empaque', icon: ClipboardCheck, color: 'bg-orange-500' },
    { key: 'in_delivery', label: 'En Reparto', icon: Truck, color: 'bg-purple-500' },
    { key: 'delivered', label: 'Entregado', icon: CheckCircle, color: 'bg-green-500' },
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
          setOrder(updatedOrder);
          
          // Show notification for status change
          const currentStatus = statusSteps.find(s => s.key === updatedOrder.order_status);
          if (currentStatus) {
            toast({
              title: 'Estado Actualizado',
              description: `Tu pedido ahora está: ${currentStatus.label}`,
            });
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Seguimiento de Pedido</CardTitle>
              <CardDescription>
                Código de pedido: <span className="font-mono font-semibold">{order.payment_code}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Info */}
              <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Plan</p>
                  <p className="font-semibold">{order.plan_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monto</p>
                  <p className="font-semibold">RD$ {order.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cliente</p>
                  <p className="font-semibold">{order.customer_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Teléfono</p>
                  <p className="font-semibold">{order.customer_phone}</p>
                </div>
                {order.customer_address && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground">Dirección</p>
                    <p className="font-semibold">{order.customer_address}</p>
                  </div>
                )}
              </div>

              {/* Status Timeline */}
              {!isCancelled && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Estado del Pedido</h3>
                  <div className="relative">
                    {statusSteps.map((step, index) => {
                      const Icon = step.icon;
                      const isCompleted = index <= currentStepIndex;
                      const isCurrent = index === currentStepIndex;

                      return (
                        <div key={step.key} className="flex items-start mb-8 last:mb-0">
                          {/* Vertical Line */}
                          {index < statusSteps.length - 1 && (
                            <div
                              className={`absolute left-5 top-12 w-0.5 h-16 ${
                                isCompleted ? 'bg-primary' : 'bg-muted'
                              }`}
                            />
                          )}

                          {/* Icon */}
                          <div
                            className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                              isCompleted ? step.color : 'bg-muted'
                            }`}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </div>

                          {/* Content */}
                          <div className="ml-4 flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className={`font-semibold ${isCurrent ? 'text-primary' : ''}`}>
                                {step.label}
                              </h4>
                              {isCurrent && (
                                <Badge variant="default">Actual</Badge>
                              )}
                            </div>
                            {isCurrent && (
                              <p className="text-sm text-muted-foreground mt-1">
                                Actualizado {formatDistanceToNow(new Date(order.status_updated_at), { 
                                  addSuffix: true,
                                  locale: es 
                                })}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {isCancelled && (
                <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
                  <p className="font-semibold text-destructive">Este pedido ha sido cancelado</p>
                </div>
              )}

              {/* Courier Info */}
              {order.order_status === 'in_delivery' && order.courier_name && (
                <Card className="border-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="w-5 h-5" />
                      Información del Mensajero
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Mensajero</p>
                        <p className="font-semibold">{order.courier_name}</p>
                      </div>
                    </div>
                    {order.courier_phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Teléfono</p>
                          <p className="font-semibold">{order.courier_phone}</p>
                        </div>
                      </div>
                    )}
                    {order.estimated_delivery_time && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Tiempo Estimado de Llegada</p>
                          <p className="font-semibold">
                            {new Date(order.estimated_delivery_time).toLocaleTimeString('es-DO', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    )}
                    {order.courier_location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm">
                          El mensajero está en camino a tu ubicación
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-4">
                <Button onClick={() => navigate('/')} variant="outline" className="flex-1">
                  Volver al Inicio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTracking;
