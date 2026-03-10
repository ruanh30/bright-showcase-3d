import { type FC, useState } from "react";
import { Truck } from "lucide-react";

const ShippingCalculator: FC = () => {
  const [cep, setCep] = useState("");

  return (
    <div className="space-y-3">
      <h3 className="font-display font-semibold text-foreground text-sm flex items-center gap-2">
        <Truck size={16} className="text-muted-foreground" />
        Simular Frete
      </h3>
      <div className="flex gap-2">
        <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 flex-1">
          <span className="text-xs font-body text-muted-foreground">🇧🇷 BR</span>
          <input
            type="text"
            placeholder="00000-000"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            className="bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1 w-0"
            maxLength={9}
          />
        </div>
        <button className="bg-primary text-primary-foreground font-body text-sm font-medium rounded-lg px-4 py-2 hover:opacity-90 transition-opacity flex items-center gap-1.5">
          <Truck size={14} />
          Calcular
        </button>
      </div>
    </div>
  );
};

export default ShippingCalculator;
