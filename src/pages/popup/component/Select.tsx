interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

export default function Select({ options, ...selectProps }: SelectProps) {
  return (
    <div className="relative">
      <select
        className="w-full px-2 py-1 text-xs border border-gray-200 !rounded-button custom-select cursor-pointer"
        {...selectProps}
      >
        <option value="" selected disabled>
          請選擇
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
