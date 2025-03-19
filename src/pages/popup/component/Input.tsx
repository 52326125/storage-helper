export default function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`px-2 py-1 text-xs border border-gray-200 !rounded-button ${className}`} {...props} />;
}
