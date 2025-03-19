import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "normal" | "text";
}

export default function Button({ children, variant = "normal", ...buttonProps }: ButtonProps) {
  const className = clsx("flex items-center gap-1.5 text-xs !rounded-button transition-colors cursor-pointer", {
    "px-2 py-1 bg-blue-800 text-white hover:bg-blue-800/90": variant === "normal",
    "text-blue-800 hover:text-blue-800/90": variant !== "normal"
  });
  return (
    <button className={className} {...buttonProps}>
      {children}
    </button>
  );
}
