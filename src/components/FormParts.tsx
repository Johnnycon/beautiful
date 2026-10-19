import type { ReactNode } from "react";
import { Check } from "lucide-react";

// Small pieces shared by the booking and contact forms

export function FieldHint({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 text-sm text-slate">
      {children}
    </p>
  );
}

export function FieldError({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-2 text-sm font-medium text-rouge">
      {children}
    </p>
  );
}

export function OptionalTag({ children }: { children: ReactNode }) {
  return <span className="ml-2 font-normal text-slate">{children}</span>;
}

// A radio option drawn as a bordered tile; the real radio stays in the DOM for
// keyboard, screen readers and validation
export function ChoiceTile({
  name,
  value,
  checked,
  onChange,
  required,
  invalid,
  describedBy,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  invalid?: boolean;
  describedBy?: string;
  children: ReactNode;
}) {
  return (
    <label
      className={`group flex min-h-13 cursor-pointer items-center gap-3 rounded-[3px] border px-4 py-3 leading-snug transition-[background-color,border-color] duration-200 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-rouge ${
        checked
          ? "border-rouge bg-petal/45"
          : invalid
            ? "border-rouge/60 bg-white hover:border-midnight"
            : "border-crystal bg-white hover:border-midnight"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        required={required}
        aria-describedby={describedBy}
        className="sr-only"
      />
      {/* Hollow ring that fills with rouge and a check when chosen */}
      <span
        aria-hidden
        className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
          checked ? "border-rouge bg-rouge text-pearl" : "border-slate/50 bg-white group-hover:border-midnight"
        }`}
      >
        <Check
          size={12}
          strokeWidth={3}
          className={`transition-[opacity,scale] duration-200 ${checked ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
        />
      </span>
      <span className={checked ? "font-medium" : undefined}>{children}</span>
    </label>
  );
}
