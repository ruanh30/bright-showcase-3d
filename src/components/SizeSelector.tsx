import { type FC, useState } from "react";
import { Minus, Plus } from "lucide-react";

interface SizeVariation {
  label: string;
  ref: string;
}

interface SizeSelectorProps {
  sizes: SizeVariation[];
  quantities: Record<string, number>;
  onQuantityChange: (ref: string, qty: number) => void;
}

const SizeSelector: FC<SizeSelectorProps> = ({ sizes, quantities, onQuantityChange }) => {
  return (
    <div className="space-y-3">
      <h3 className="font-display font-semibold text-foreground text-sm">Escolha as Variações</h3>
      <div className="divide-y divide-border">
        {sizes.map((size) => {
          const qty = quantities[size.ref] || 0;
          return (
            <div key={size.ref} className="flex items-center justify-between py-3">
              <div>
                <p className="font-body font-medium text-foreground text-sm">{size.label}</p>
                <span className="font-body text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  # {size.ref}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onQuantityChange(size.ref, Math.max(0, qty - 1))}
                  className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center font-body text-sm text-foreground font-medium tabular-nums">
                  {qty}
                </span>
                <button
                  onClick={() => onQuantityChange(size.ref, qty + 1)}
                  className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;
