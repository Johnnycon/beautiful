import { Link } from "@/i18n/navigation";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

const variants = {
  primary: "bg-rouge text-pearl hover:bg-rouge-deep",
  secondary: "bg-midnight text-pearl hover:bg-midnight-soft",
  outline: "border border-current hover:bg-midnight hover:text-pearl hover:border-midnight",
};

const sizes = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-[0.9375rem]",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-[3px] font-medium tracking-[0.01em] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
