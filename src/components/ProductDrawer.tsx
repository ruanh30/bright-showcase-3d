import { type FC, useEffect, useState } from "react";
import { X, Heart, MessageCircle, Share2, ShoppingCart } from "lucide-react";
import ImageGallery from "@/components/ImageGallery";
import SizeSelector from "@/components/SizeSelector";
import ShippingCalculator from "@/components/ShippingCalculator";
import RelatedProducts from "@/components/RelatedProducts";

interface ProductSize {
  label: string;
  ref: string;
}

interface RelatedProductData {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  sales: number;
  image: string;
  tag?: string;
}

interface ProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    category: string;
    price: number;
    sales: number;
    images: string[];
    sizes: ProductSize[];
    description: string;
    relatedProducts: RelatedProductData[];
  } | null;
}

const ProductDrawer: FC<ProductDrawerProps> = ({ isOpen, onClose, product }) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setQuantities({});
  }, [product]);

  if (!isOpen || !product) return null;

  const pixPrice = (product.price * 0.95).toFixed(2).replace(".", ",");
  const installment = (product.price / 6).toFixed(2).replace(".", ",");

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-foreground/40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-4xl bg-card overflow-y-auto animate-slide-in-right">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-border transition-colors"
        >
          <X size={20} />
        </button>


        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Image gallery */}
            <ImageGallery images={product.images} alt={product.name} />

            {/* Right: Product info */}
            <div className="space-y-5">
              <div>
                <h1 className="font-display font-bold text-foreground text-2xl">{product.name}</h1>
                <div className="flex gap-2 mt-2">
                  <span className="bg-muted text-muted-foreground text-xs font-body px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <span className="bg-muted text-muted-foreground text-xs font-body px-3 py-1 rounded-full flex items-center gap-1">
                    <ShoppingCart size={11} /> {product.sales} vendas
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="font-display font-bold text-foreground text-3xl">
                    R$ {product.price.toFixed(2).replace(".", ",")}
                  </span>
                  <span className="font-body text-sm text-muted-foreground">
                    6x de R$ {installment} no Cartão
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-body text-sm text-muted-foreground">
                    ou <strong className="text-foreground">R$ {pixPrice}</strong> no <span className="text-[#32BCAD] font-semibold">PIX</span>
                  </span>
                  <span className="bg-primary text-primary-foreground text-[10px] font-display font-bold px-2 py-0.5 rounded">
                    5% de desconto
                  </span>
                </div>
              </div>

              {/* Sizes */}
              <SizeSelector
                sizes={product.sizes}
                quantities={quantities}
                onQuantityChange={(ref, qty) => setQuantities((prev) => ({ ...prev, [ref]: qty }))}
              />

              {/* Shipping */}
              <ShippingCalculator />

              {/* Add to cart */}
              <button className="w-full bg-primary text-primary-foreground font-display font-bold text-base rounded-xl py-4 hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <ShoppingCart size={18} />
                Adicionar ao Carrinho
              </button>

              {/* Social icons */}
              <div className="flex justify-center gap-8 pt-2">
                {[
                  { icon: Heart, label: "Favoritar" },
                  { icon: MessageCircle, label: "Mensagem" },
                  { icon: Share2, label: "Compartilhar" },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon size={20} />
                    <span className="text-[10px] font-body">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-10 border-t border-border pt-6">
            <h3 className="font-display font-bold text-foreground text-base mb-2">Descrição do Produto</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Related products */}
          <div className="mt-10 border-t border-border pt-6">
            <RelatedProducts
              products={product.relatedProducts}
              onProductClick={() => {}}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDrawer;
