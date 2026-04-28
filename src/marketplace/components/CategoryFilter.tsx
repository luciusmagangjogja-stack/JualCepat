import { CATEGORIES, Category } from "../types";

export default function CategoryFilter({
  value,
  onChange,
}: {
  value: Category | "all";
  onChange: (v: Category | "all") => void;
}) {
  const opts: { value: Category | "all"; label: string }[] = [
    { value: "all", label: "Semua" },
    ...CATEGORIES.map((c) => ({ value: c.value, label: c.label })),
  ];
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
      {opts.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${
            value === o.value
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card text-foreground border-border hover:border-primary"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}