import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  customerName: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(100),
  customerEmail: z.string().email("Email inválido").max(255),
  customerPhone: z.string().min(10, "Teléfono inválido").max(20),
  customerAddress: z.string().min(5, "Dirección inválida").max(200),
  paymentMethod: z.enum(["card", "transfer", "cash"], {
    required_error: "Selecciona un método de pago",
  }),
});

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const planId = searchParams.get("planId");
  const planName = searchParams.get("planName");
  const amount = searchParams.get("amount");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      customerAddress: "",
      paymentMethod: "card",
    },
  });

  const generatePaymentCode = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `PAY-${timestamp}-${random}`.toUpperCase();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!planId || !planName || !amount) {
      toast({
        title: "Error",
        description: "Información del plan incompleta",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const paymentCode = generatePaymentCode();
      const { data: userData } = await supabase.auth.getUser();

      const { error } = await supabase.from("orders").insert({
        user_id: userData.user?.id || null,
        plan_id: planId,
        plan_name: planName,
        amount: parseFloat(amount),
        payment_code: paymentCode,
        payment_method: values.paymentMethod,
        payment_status: "pending",
        customer_name: values.customerName,
        customer_email: values.customerEmail,
        customer_phone: values.customerPhone,
        customer_address: values.customerAddress,
      });

      if (error) throw error;

      toast({
        title: "¡Orden creada!",
        description: `Tu código de pago es: ${paymentCode}`,
      });

      navigate(`/order-confirmation?code=${paymentCode}`);
    } catch (error) {
      console.error("Error creating order:", error);
      toast({
        title: "Error",
        description: "No se pudo procesar tu orden. Intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            ← Volver
          </Button>

          <Card className="p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Finalizar Compra</h1>
              <div className="text-muted-foreground">
                <p>Plan: {planName}</p>
                <p className="text-2xl font-bold text-primary mt-2">
                  ${parseFloat(amount || "0").toLocaleString("es-CO")} COP
                </p>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Datos Personales</h2>
                  
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre Completo *</FormLabel>
                        <FormControl>
                          <Input placeholder="Juan Pérez" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="juan@ejemplo.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono *</FormLabel>
                        <FormControl>
                          <Input placeholder="3001234567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dirección *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Calle 123 #45-67"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Método de Pago</h2>
                  
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-accent cursor-pointer">
                              <RadioGroupItem value="card" id="card" />
                              <Label htmlFor="card" className="flex-1 cursor-pointer">
                                {getPaymentMethodLabel("card")}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-accent cursor-pointer">
                              <RadioGroupItem value="transfer" id="transfer" />
                              <Label htmlFor="transfer" className="flex-1 cursor-pointer">
                                {getPaymentMethodLabel("transfer")}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-accent cursor-pointer">
                              <RadioGroupItem value="cash" id="cash" />
                              <Label htmlFor="cash" className="flex-1 cursor-pointer">
                                {getPaymentMethodLabel("cash")}
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Procesando..." : "Confirmar Compra"}
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
