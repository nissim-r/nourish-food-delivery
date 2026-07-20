import { Minus, Plus } from "lucide-react";

export function QuantityControl({
  value,
  onChange,
  min = 0,
  size = "md",
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  size?: "sm" | "md";
}) {
  const btn =
    size === "sm"
      ? "h-8 w-8 rounded-lg"
      : "h-10 w-10 rounded-xl";
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const num = size === "sm" ? "w-6 text-sm" : "w-8 text-base";

  return (
    <div className="inline-flex items-center gap-1 rounded-2xl bg-cream-100 p-0.5">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className={`qty-btn flex items-center justify-center bg-white text-charcoal-800 shadow-sm transition enabled:hover:bg-cream-50 disabled:opacity-40 ${btn}`}
      >
        <Minus className={icon} />
      </button>
      <span
        className={`text-center font-semibold tabular-nums text-charcoal-900 ${num}`}
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        className={`qty-btn flex items-center justify-center bg-coral-500 text-white shadow-sm transition hover:bg-coral-600 ${btn}`}
      >
        <Plus className={icon} />
      </button>
    </div>
  );
}
