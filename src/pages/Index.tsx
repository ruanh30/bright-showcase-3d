import { useState } from "react";
import ProductPanel from "@/components/ProductPanel";
import ProductModal from "@/components/ProductModal";
import hoodieImg from "@/assets/product-hoodie.png";
import sneakerImg from "@/assets/product-sneaker.png";

const products = [
  {
    name: "Nuvem Hoodie",
    tagline: "Conforto que abraça.",
    image: hoodieImg,
    price: "R$ 389",
    description:
      "O Nuvem Hoodie é feito com algodão orgânico 400gsm e modelagem oversized. Cada peça é tingida à mão com pigmentos naturais, garantindo uma tonalidade única. O caimento volumoso e a construção sem costuras laterais criam uma silhueta que é tanto escultural quanto confortável.",
    features: ["Algodão Orgânico", "Oversized Fit", "Tingimento Natural", "Unissex"],
  },
  {
    name: "Stride One",
    tagline: "Cada passo, uma declaração.",
    image: sneakerImg,
    price: "R$ 649",
    description:
      "O Stride One combina couro italiano com solado de borracha reciclada. Design minimalista que transita do casual ao sofisticado. Palmilha em memory foam e forro antibacteriano para conforto durante o dia inteiro.",
    features: ["Couro Italiano", "Solado Reciclado", "Memory Foam", "Edição Limitada"],
  },
];

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
      <ProductPanel
        name={products[0].name}
        tagline={products[0].tagline}
        image={products[0].image}
        variant="tangerine"
        offset="up"
        onClick={() => setSelectedProduct(0)}
      />
      <ProductPanel
        name={products[1].name}
        tagline={products[1].tagline}
        image={products[1].image}
        variant="cobalt"
        offset="down"
        onClick={() => setSelectedProduct(1)}
      />

      <ProductModal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct !== null ? products[selectedProduct] : null}
      />
    </div>
  );
};

export default Index;
