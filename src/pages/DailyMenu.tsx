import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";

const DailyMenu = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("desayunos");

  const categories = [
    { id: "desayunos", name: "Desayunos" },
    { id: "almuerzos", name: "Almuerzos" },
    { id: "cenas", name: "Cenas" },
    { id: "snacks", name: "Snacks" }
  ];

  const menuItems = {
    desayunos: [
      {
        name: "Bowl de Açaí Tropical",
        description: "Açaí, plátano, mango, granola casera y coco rallado",
        price: 18000,
        calories: 320,
        protein: "8g",
        image: "🥣"
      },
      {
        name: "Tostadas de Aguacate",
        description: "Pan integral, aguacate, tomate cherry, semillas de chía",
        price: 15000,
        calories: 280,
        protein: "12g",
        image: "🥑"
      },
      {
        name: "Smoothie Verde Energético",
        description: "Espinaca, piña, manzana verde, jengibre y proteína vegetal",
        price: 12000,
        calories: 250,
        protein: "15g",
        image: "🥤"
      }
    ],
    almuerzos: [
      {
        name: "Salmón a la Plancha",
        description: "Salmón, quinoa, brócoli al vapor y salsa de yogurt",
        price: 28000,
        calories: 450,
        protein: "35g",
        image: "🐟"
      },
      {
        name: "Bowl Buddha Vegetariano",
        description: "Garbanzos, quinoa, vegetales asados y tahini",
        price: 22000,
        calories: 380,
        protein: "18g",
        image: "🥗"
      },
      {
        name: "Pollo Mediterráneo",
        description: "Pechuga de pollo, ensalada griega y hummus casero",
        price: 25000,
        calories: 420,
        protein: "32g",
        image: "🍗"
      }
    ],
    cenas: [
      {
        name: "Sopa de Lentejas Rojas",
        description: "Lentejas, vegetales, cúrcuma y pan integral",
        price: 16000,
        calories: 300,
        protein: "14g",
        image: "🍲"
      },
      {
        name: "Ensalada de Atún",
        description: "Atún fresco, quinoa, aguacate y vinagreta de limón",
        price: 20000,
        calories: 350,
        protein: "28g",
        image: "🥙"
      },
      {
        name: "Tortilla de Vegetales",
        description: "Huevos orgánicos, espinaca, tomate y queso de cabra",
        price: 18000,
        calories: 280,
        protein: "20g",
        image: "🥚"
      }
    ],
    snacks: [
      {
        name: "Mix de Frutos Secos",
        description: "Almendras, nueces, arándanos y semillas de girasol",
        price: 8000,
        calories: 180,
        protein: "6g",
        image: "🥜"
      },
      {
        name: "Yogurt Griego con Berries",
        description: "Yogurt griego natural, fresas, arándanos y miel",
        price: 10000,
        calories: 150,
        protein: "12g",
        image: "🫐"
      },
      {
        name: "Hummus con Vegetales",
        description: "Hummus casero, zanahoria, apio y pimiento",
        price: 12000,
        calories: 120,
        protein: "5g",
        image: "🥕"
      }
    ]
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-6"
          >
            ← Volver al Inicio
          </Button>
          
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Menú del Día
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comidas frescas y nutritivas preparadas diariamente en Valledupar
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="min-w-24"
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {menuItems[selectedCategory as keyof typeof menuItems].map((item, index) => (
            <Card key={index} className="hover:shadow-medium transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
              <CardHeader className="text-center">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{item.image}</div>
                <CardTitle className="text-xl text-primary">{item.name}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm text-center">
                  {item.description}
                </p>
                
                <div className="flex justify-between items-center text-sm">
                  <Badge variant="secondary">{item.calories} cal</Badge>
                  <Badge variant="outline">{item.protein} proteína</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(item.price)}
                  </span>
                  <Button 
                    size="sm" 
                    className="bg-gradient-primary hover:scale-105 transition-transform duration-200"
                  >
                    Agregar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            ¿Necesitas algo personalizado?
          </p>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Hablar con Nutricionista
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DailyMenu;