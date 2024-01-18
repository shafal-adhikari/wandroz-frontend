function Input({
  value,
  onChange,
  className,
  icon,
  name,
  type,
  inputClassName,
  placeholder,
}: {
  value: string;
  type: string;
  name?: string;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div
      className={`bg-slate-100 rounded-md flex items-center gap-2 ${className}`}
    >
      {icon}
      <input
        className={`border-none bg-transparent text-slate-600 grow outline-none ${inputClassName}`}
        value={value}
        type={type}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
