import { type FC } from "react";

interface ProductPanelProps {
  name: string;
  tagline: string;
  image: string;
  variant: "tangerine" | "cobalt";
  offset: "up" | "down";
  onClick: () => void;
}

const ProductPanel: FC<ProductPanelProps> = ({ name, tagline, image, variant, offset, onClick }) => {
  const bgClass = variant === "tangerine" ? "bg-tangerine" : "bg-cobalt";
  const offsetClass = offset === "up" ? "-translate-y-6" : "translate-y-6";

  return (
    <div
      className={`relative flex-1 ${bgClass} flex flex-col items-center justify-center cursor-pointer group overflow-hidden`}
      onClick={onClick}
    >
      {/* Product image */}
      <div
        className={`${offsetClass} transition-all duration-700 ease-out`}
        style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.25))" }}
      >
        <img
          src={image}
          alt={name}
          className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain transition-all duration-500 group-hover:drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
          draggable={false}
        />
      </div>

      {/* Product name */}
      <div className={`${offset === "up" ? "mt-4" : "mt-2"} text-center`}>
        <h2 className="font-display text-primary-foreground text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
          {name}
        </h2>
        <p className="font-body text-primary-foreground/80 text-sm md:text-base mt-2 tracking-wide">
          {tagline}
        </p>
      </div>

      {/* CTA */}
      <button
        className="mt-6 font-body text-sm md:text-base text-primary-foreground/90 border border-primary-foreground/30 rounded-full px-6 py-2.5 
          transition-all duration-300 hover:bg-primary-foreground/10 hover:border-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/40"
      >
        Explorar
      </button>
    </div>
  );
};

export default ProductPanel;
