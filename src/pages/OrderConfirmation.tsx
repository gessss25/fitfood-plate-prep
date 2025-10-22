import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2 } from "lucide-react";

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const paymentCode = searchParams.get("code");

  useEffect(() => {
    const fetchOrder = async () => {
      if (!paymentCode) {
        navigate("/");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("payment_code", paymentCode)
          .single();

        if (error) throw error;
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [paymentCode, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case "card":
        return "Tarjeta de Crédito/Débito";
      case "transfer":
        return "Transferencia Bancaria";
      case "cash":
        return "Pago en Efectivo";
      default:
        return method;
    }
  };

  const getPaymentInstructions = (method: string) => {
    switch (method) {
      case "card":
        return "Te contactaremos pronto para procesar el pago con tarjeta.";
      case "transfer":
        return "Te enviaremos los datos bancarios a tu email para realizar la transferencia.";
      case "cash":
        return "Coordinaremos contigo para el pago en efectivo al momento de la entrega.";
      default:
        return "Te contactaremos pronto con las instrucciones de pago.";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">¡Orden Confirmada!</h1>
            <p className="text-muted-foreground mb-8">
              Tu orden ha sido registrada exitosamente
            </p>

            <div className="bg-accent/50 rounded-lg p-6 mb-6 text-left">
              <h2 className="text-xl font-semibold mb-4">Detalles de la Orden</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Código de Pago:</span>
                  <span className="font-mono font-bold">{order.payment_code}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan:</span>
                  <span className="font-semibold">{order.plan_name}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monto:</span>
                  <span className="font-semibold text-primary">
                    ${parseFloat(order.amount).toLocaleString("es-CO")} COP
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Método de Pago:</span>
                  <span className="font-semibold">
                    {getPaymentMethodLabel(order.payment_method)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estado:</span>
                  <span className="font-semibold text-yellow-600">Pendiente</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 mb-6">
              <p className="text-sm">
                {getPaymentInstructions(order.payment_method)}
              </p>
            </div>

            <div className="text-left mb-6">
              <h3 className="font-semibold mb-2">Datos de Contacto:</h3>
              <p className="text-sm text-muted-foreground">
                {order.customer_name}<br />
                {order.customer_email}<br />
                {order.customer_phone}<br />
                {order.customer_address}
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => navigate("/")}
              >
                Volver al Inicio
              </Button>
              <Button
                className="flex-1"
                onClick={() => navigate("/services")}
              >
                Ver Más Planes
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmation;
