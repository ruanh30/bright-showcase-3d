import { type FC, useEffect } from "react";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    tagline: string;
    image: string;
    price: string;
    description: string;
    features: string[];
  } | null;
}

const ProductModal: FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 z-40 transition-all duration-500"
        style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-card rounded-2xl pointer-events-auto w-full max-w-2xl overflow-hidden animate-scale-in"
          style={{ boxShadow: "var(--shadow-modal)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Product image area */}
          <div className="bg-muted flex items-center justify-center py-10 px-8">
            <img
              src={product.image}
              alt={product.name}
              className="w-48 h-48 md:w-64 md:h-64 object-contain animate-fade-in"
              style={{ filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.15))" }}
              draggable={false}
            />
          </div>

          {/* Details */}
          <div className="p-8 md:p-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-display text-foreground text-2xl md:text-3xl font-bold tracking-tight">
                  {product.name}
                </h3>
                <p className="font-body text-muted-foreground text-sm mt-1">
                  {product.tagline}
                </p>
              </div>
              <span className="font-display text-foreground text-2xl md:text-3xl font-bold">
                {product.price}
              </span>
            </div>

            <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.features.map((f) => (
                <span
                  key={f}
                  className="font-body text-xs md:text-sm bg-muted text-muted-foreground rounded-full px-4 py-1.5"
                >
                  {f}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                className="flex-1 font-display font-semibold text-sm md:text-base bg-primary text-primary-foreground rounded-xl py-3.5 
                  transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring"
              >
                Comprar Agora
              </button>
              <button
                onClick={onClose}
                className="font-body text-sm md:text-base text-muted-foreground border border-border rounded-xl px-6 py-3.5 
                  transition-all duration-300 hover:bg-muted focus:outline-none"
              >
                Fechar
              </button>
            </div>

            {/* Brand mark */}
            <p className="font-display text-[10px] text-muted-foreground/50 text-right mt-6 tracking-widest uppercase">
              Estúdio Vazio Pleno
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
