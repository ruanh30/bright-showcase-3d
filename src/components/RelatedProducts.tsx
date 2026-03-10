import { type FC, useRef } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";

interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  sales: number;
  image: string;
  tag?: string;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
  onProductClick: (id: string) => void;
}

const RelatedProducts: FC<RelatedProductsProps> = ({ products, onProductClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -220 : 220, behavior: "smooth" });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-display font-bold text-foreground text-base">Produtos Relacionados</h3>
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors -ml-2"
        >
          <ChevronLeft size={18} />
        </button>

        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide px-2 py-1">
          {products.map((p) => (
            <div
              key={p.id}
              className="min-w-[180px] max-w-[180px] bg-card rounded-xl overflow-hidden shadow-sm border border-border cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onProductClick(p.id)}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                {p.tag && (
                  <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-display font-semibold px-2 py-0.5 rounded">
                    {p.tag}
                  </span>
                )}
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3 text-center space-y-1.5">
                <p className="font-display font-semibold text-foreground text-sm truncate">{p.name}</p>
                <div className="flex items-center justify-center gap-2">
                  {p.originalPrice && (
                    <span className="text-muted-foreground text-xs line-through font-body">
                      R$ {p.originalPrice.toFixed(2).replace(".", ",")}
                    </span>
                  )}
                  {p.discount && (
                    <span className="text-destructive text-[10px] font-display font-bold">
                      ▼ {p.discount}%
                    </span>
                  )}
                </div>
                <p className="font-display font-bold text-foreground text-base">
                  R$ {p.price.toFixed(2).replace(".", ",")}
                </p>
                <p className="text-muted-foreground text-xs font-body flex items-center justify-center gap-1">
                  <ShoppingCart size={12} /> {p.sales} vendas
                </p>
                <button className="w-full mt-2 bg-primary/10 text-primary font-display font-semibold text-xs rounded-lg py-2 hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-1.5">
                  <ShoppingCart size={13} />
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-colors -mr-2"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default RelatedProducts;
