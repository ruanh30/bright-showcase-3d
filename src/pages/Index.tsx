import { useState } from "react";
import ProductDrawer from "@/components/ProductDrawer";
import ProductModalCenter from "@/components/ProductModalCenter";
import { ShoppingCart, PanelRight, Square } from "lucide-react";

import conjunto1 from "@/assets/modelo-conjunto1.jpg";
import conjunto1b from "@/assets/modelo-conjunto1-b.jpg";
import vestido1 from "@/assets/modelo-vestido1.jpg";
import conjunto2 from "@/assets/modelo-conjunto2.jpg";
import conjunto3 from "@/assets/modelo-conjunto3.jpg";
import macacao1 from "@/assets/modelo-macacao1.jpg";
import vestido2 from "@/assets/modelo-vestido2.jpg";

const allProducts = [
  {
    id: "1",
    name: "Conjunto 2674",
    category: "Conjuntos",
    price: 58.0,
    sales: 7,
    images: [conjunto1, conjunto1b],
    tag: "Destaque",
    sizes: [
      { label: "M 38/40", ref: "FZ38573921" },
      { label: "G 40/42", ref: "FZ38573922" },
    ],
    description: "Alfaiataria Barbie. Conjunto composto por cropped e short de alfaiataria em tecido premium. Peça versátil que transita entre o casual e o sofisticado com muito estilo.",
  },
  {
    id: "2",
    name: "Vestido Linho 1045",
    category: "Vestidos",
    price: 79.0,
    sales: 12,
    images: [vestido1],
    tag: "Destaque",
    sizes: [
      { label: "P 34/36", ref: "VL10451" },
      { label: "M 38/40", ref: "VL10452" },
      { label: "G 40/42", ref: "VL10453" },
    ],
    description: "Vestido em linho natural com modelagem solta e confortável. Ideal para dias quentes com um toque de elegância atemporal.",
  },
  {
    id: "3",
    name: "Conjunto Mint 2488",
    category: "Conjuntos",
    price: 35.0,
    originalPrice: 55.0,
    discount: 36,
    sales: 6,
    images: [conjunto2],
    tag: "Destaque",
    sizes: [
      { label: "P 34/36", ref: "CM24881" },
      { label: "M 38/40", ref: "CM24882" },
    ],
    description: "Conjunto cropped e saia em malha canelada na cor mint. Peça leve e fresca, perfeita para o verão.",
  },
  {
    id: "4",
    name: "Macacão Coral 3100",
    category: "Macacão e Macaquinho",
    price: 56.0,
    sales: 33,
    images: [macacao1],
    tag: "Destaque",
    sizes: [
      { label: "M 38/40", ref: "MC31001" },
      { label: "G 40/42", ref: "MC31002" },
    ],
    description: "Macaquinho em viscose com detalhe de babado no decote. Elástico na cintura para melhor caimento.",
  },
  {
    id: "5",
    name: "Macacão Elegance 2651",
    category: "Macacão e Macaquinho",
    price: 66.0,
    sales: 15,
    images: [conjunto3],
    tag: "Destaque",
    sizes: [
      { label: "P 34/36", ref: "ME26511" },
      { label: "M 38/40", ref: "ME26512" },
    ],
    description: "Macacão longo em malha crepe com decote transpassado. Peça sofisticada para ocasiões especiais.",
  },
  {
    id: "6",
    name: "Vestido Sol 2090",
    category: "Vestidos",
    price: 88.0,
    sales: 3,
    images: [vestido2],
    sizes: [
      { label: "P 34/36", ref: "VS20901" },
      { label: "M 38/40", ref: "VS20902" },
      { label: "G 40/42", ref: "VS20903" },
    ],
    description: "Vestido de alças em tecido fluido na cor amarelo sol. Caimento solto e elegante para o dia a dia.",
  },
];

type LayoutMode = "lateral" | "central";

const Index = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("central");

  const selectedProduct = selectedId ? allProducts.find((p) => p.id === selectedId) : null;

  const productData = selectedProduct
    ? {
        ...selectedProduct,
        relatedProducts: allProducts
          .filter((p) => p.id !== selectedId)
          .map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            originalPrice: (p as any).originalPrice,
            discount: (p as any).discount,
            sales: p.sales,
            image: p.images[0],
            tag: p.tag,
          })),
      }
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-secondary text-secondary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-display font-bold text-xl tracking-tight">Bella Moda</h1>
          <nav className="hidden md:flex gap-6 text-sm font-display font-semibold tracking-wide uppercase">
            <span className="opacity-80 hover:opacity-100 cursor-pointer transition-opacity">Início</span>
            <span className="opacity-80 hover:opacity-100 cursor-pointer transition-opacity">Vestidos</span>
            <span className="opacity-80 hover:opacity-100 cursor-pointer transition-opacity">Macacão</span>
            <span className="opacity-80 hover:opacity-100 cursor-pointer transition-opacity">Conjuntos</span>
          </nav>
          <button className="relative text-secondary-foreground">
            <ShoppingCart size={22} />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </header>

      {/* Layout mode switcher */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-2">
          <span className="font-body text-xs text-muted-foreground mr-2">Visualização do produto:</span>
          <button
            onClick={() => setLayoutMode("central")}
            className={`flex items-center gap-1.5 font-display text-xs font-semibold px-4 py-2 rounded-lg transition-colors ${
              layoutMode === "central"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <Square size={14} />
            Card Central
          </button>
          <button
            onClick={() => setLayoutMode("lateral")}
            className={`flex items-center gap-1.5 font-display text-xs font-semibold px-4 py-2 rounded-lg transition-colors ${
              layoutMode === "lateral"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <PanelRight size={14} />
            Drawer Lateral
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-primary/10 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-display font-bold text-foreground text-3xl md:text-4xl">
            Nova Coleção Verão
          </h2>
          <p className="font-body text-muted-foreground mt-2 text-sm md:text-base">
            Peças exclusivas com até 36% de desconto
          </p>
        </div>
      </div>

      {/* Product grid */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card rounded-xl overflow-hidden border border-border cursor-pointer hover:shadow-md transition-shadow group"
              onClick={() => setSelectedId(product.id)}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                {product.tag && (
                  <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-display font-semibold px-2.5 py-0.5 rounded z-10">
                    {product.tag}
                  </span>
                )}
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 text-center space-y-1.5">
                <p className="font-display font-semibold text-foreground text-sm truncate">{product.name}</p>
                <div className="flex items-center justify-center gap-2">
                  {(product as any).originalPrice && (
                    <span className="text-muted-foreground text-xs line-through font-body">
                      R$ {(product as any).originalPrice.toFixed(2).replace(".", ",")}
                    </span>
                  )}
                  {(product as any).discount && (
                    <span className="text-destructive text-[10px] font-display font-bold">
                      ▼ {(product as any).discount}%
                    </span>
                  )}
                </div>
                <p className="font-display font-bold text-foreground text-lg">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </p>
                <p className="text-muted-foreground text-xs font-body flex items-center justify-center gap-1">
                  <ShoppingCart size={11} /> {product.sales} vendas
                </p>
                <button className="w-full mt-1 bg-primary/10 text-primary font-display font-semibold text-xs rounded-lg py-2 hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-1.5">
                  <ShoppingCart size={13} />
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Conditional layout */}
      {layoutMode === "lateral" ? (
        <ProductDrawer
          isOpen={selectedId !== null}
          onClose={() => setSelectedId(null)}
          product={productData}
        />
      ) : (
        <ProductModalCenter
          isOpen={selectedId !== null}
          onClose={() => setSelectedId(null)}
          product={productData}
        />
      )}
    </div>
  );
};

export default Index;
