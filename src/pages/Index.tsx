import { useState } from "react";
import ProductPanel from "@/components/ProductPanel";
import ProductModal from "@/components/ProductModal";
import headphonesImg from "@/assets/product-headphones.png";
import speakerImg from "@/assets/product-speaker.png";

const products = [
  {
    name: "Aura Pro",
    tagline: "Silêncio, redesenhado.",
    image: headphonesImg,
    price: "R$ 1.490",
    description:
      "O Aura Pro redefine a experiência auditiva com cancelamento de ruído adaptativo e drivers de 40mm em titânio. Cada detalhe, do couro sintético premium aos acabamentos em cobre, foi pensado para quem não aceita menos que a perfeição.",
    features: ["ANC Adaptativo", "40h de Bateria", "Bluetooth 5.3", "Hi-Res Audio"],
  },
  {
    name: "Monolith",
    tagline: "Som que preenche o vazio.",
    image: speakerImg,
    price: "R$ 2.190",
    description:
      "O Monolith é uma coluna de som 360° que transforma qualquer ambiente em uma experiência imersiva. Com tecido acústico Kvadrat e processamento espacial em tempo real, cada nota encontra seu lugar no espaço.",
    features: ["Som 360°", "Tecido Kvadrat", "Wi-Fi 6E", "Áudio Espacial"],
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
