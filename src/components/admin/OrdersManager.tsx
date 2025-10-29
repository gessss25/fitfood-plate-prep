import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Order {
  id: string;
  payment_code: string;
  plan_name: string;
  amount: number;
  order_status: string;
  courier_name: string | null;
  courier_phone: string | null;
  estimated_delivery_time: string | null;
  customer_name: string;
  customer_phone: string;
  customer_address: string | null;
  created_at: string;
  payment_method: string | null;
  payment_status: string;
}

const OrdersManager = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    order_status: '',
    courier_name: '',
    courier_phone: '',
    estimated_delivery_time: '',
  });

  const statusOptions = [
    { value: 'received', label: 'Orden Recibida' },
    { value: 'preparing', label: 'En Preparación' },
    { value: 'quality_control', label: 'Control Nutricional/Empaque' },
    { value: 'in_delivery', label: 'En Reparto' },
    { value: 'delivered', label: 'Entregado' },
    { value: 'cancelled', label: 'Cancelado' },
  ];

  const paymentStatusOptions = [
    { value: 'pending', label: 'Pendiente' },
    { value: 'paid', label: 'Pagado' },
    { value: 'cancelled', label: 'Cancelado' },
  ];

  useEffect(() => {
    fetchOrders();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
        },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los pedidos',
        variant: 'destructive',
      });
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  const handleOrderSelect = (order: Order) => {
    setSelectedOrder(order);
    setFormData({
      order_status: order.order_status,
      courier_name: order.courier_name || '',
      courier_phone: order.courier_phone || '',
      estimated_delivery_time: order.estimated_delivery_time 
        ? new Date(order.estimated_delivery_time).toISOString().slice(0, 16)
        : '',
    });
  };

  const handleUpdateOrder = async () => {
    if (!selectedOrder) return;

    setUpdating(true);
    const updateData: any = {
      order_status: formData.order_status,
    };

    if (formData.order_status === 'in_delivery') {
      updateData.courier_name = formData.courier_name;
      updateData.courier_phone = formData.courier_phone;
      if (formData.estimated_delivery_time) {
        updateData.estimated_delivery_time = new Date(formData.estimated_delivery_time).toISOString();
      }
    }

    const { error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', selectedOrder.id);

    if (error) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el pedido',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Éxito',
        description: 'Pedido actualizado correctamente',
      });
      setSelectedOrder(null);
    }
    setUpdating(false);
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      received: { label: 'Recibida', variant: 'default' },
      preparing: { label: 'En Preparación', variant: 'secondary' },
      quality_control: { label: 'Control Nutricional', variant: 'secondary' },
      in_delivery: { label: 'En Reparto', variant: 'default' },
      delivered: { label: 'Entregado', variant: 'outline' },
      cancelled: { label: 'Cancelado', variant: 'destructive' },
    };

    const { label, variant } = statusMap[status] || { label: status, variant: 'default' };
    return <Badge variant={variant}>{label}</Badge>;
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      pending: { label: 'Pendiente', variant: 'secondary' },
      paid: { label: 'Pagado', variant: 'default' },
      cancelled: { label: 'Cancelado', variant: 'destructive' },
    };

    const { label, variant } = statusMap[status] || { label: status, variant: 'default' };
    return <Badge variant={variant}>{label}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Pedidos</CardTitle>
          <CardDescription>
            Administra el estado de los pedidos y asigna mensajeros
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Estado Pedido</TableHead>
                  <TableHead>Estado Pago</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No hay pedidos registrados
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-xs">{order.payment_code}</TableCell>
                      <TableCell>{order.customer_name}</TableCell>
                      <TableCell>{order.plan_name}</TableCell>
                      <TableCell>RD$ {order.amount}</TableCell>
                      <TableCell>{getStatusBadge(order.order_status)}</TableCell>
                      <TableCell>{getPaymentStatusBadge(order.payment_status)}</TableCell>
                      <TableCell>
                        {new Date(order.created_at).toLocaleDateString('es-DO')}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOrderSelect(order)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Ver/Editar
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Detalles del Pedido</DialogTitle>
                              <DialogDescription>
                                Código: {order.payment_code}
                              </DialogDescription>
                            </DialogHeader>

                            {selectedOrder?.id === order.id && (
                              <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Cliente</p>
                                    <p className="font-semibold">{order.customer_name}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Teléfono</p>
                                    <p className="font-semibold">{order.customer_phone}</p>
                                  </div>
                                  <div className="md:col-span-2">
                                    <p className="text-sm text-muted-foreground">Dirección</p>
                                    <p className="font-semibold">{order.customer_address || 'No especificada'}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Plan</p>
                                    <p className="font-semibold">{order.plan_name}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Monto</p>
                                    <p className="font-semibold">RD$ {order.amount}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Método de Pago</p>
                                    <p className="font-semibold">{order.payment_method || 'No especificado'}</p>
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <div>
                                    <Label htmlFor="order_status">Estado del Pedido</Label>
                                    <Select
                                      value={formData.order_status}
                                      onValueChange={(value) =>
                                        setFormData({ ...formData, order_status: value })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {statusOptions.map((option) => (
                                          <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  {formData.order_status === 'in_delivery' && (
                                    <>
                                      <div>
                                        <Label htmlFor="courier_name">Nombre del Mensajero</Label>
                                        <Input
                                          id="courier_name"
                                          value={formData.courier_name}
                                          onChange={(e) =>
                                            setFormData({ ...formData, courier_name: e.target.value })
                                          }
                                          placeholder="Ej: Juan Pérez"
                                        />
                                      </div>

                                      <div>
                                        <Label htmlFor="courier_phone">Teléfono del Mensajero</Label>
                                        <Input
                                          id="courier_phone"
                                          value={formData.courier_phone}
                                          onChange={(e) =>
                                            setFormData({ ...formData, courier_phone: e.target.value })
                                          }
                                          placeholder="Ej: 809-555-1234"
                                        />
                                      </div>

                                      <div>
                                        <Label htmlFor="estimated_delivery_time">
                                          Tiempo Estimado de Llegada
                                        </Label>
                                        <Input
                                          id="estimated_delivery_time"
                                          type="datetime-local"
                                          value={formData.estimated_delivery_time}
                                          onChange={(e) =>
                                            setFormData({
                                              ...formData,
                                              estimated_delivery_time: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                    </>
                                  )}
                                </div>

                                <div className="flex gap-2 pt-4">
                                  <Button
                                    onClick={handleUpdateOrder}
                                    disabled={updating}
                                    className="flex-1"
                                  >
                                    {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Actualizar Pedido
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersManager;
