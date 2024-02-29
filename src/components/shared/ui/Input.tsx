import { forwardRef, ForwardedRef } from "react";

export interface InputProps {
  value: string;
  type: string;
  name?: string;
  className?: string;
  label?: string;
  inputClassName?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function MyInput(
  {
    value,
    onChange,
    className,
    label,
    icon,
    name,
    type,
    inputClassName,
    placeholder,
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="flex flex-col gap-2 w-full items-center">
      {label && <label className="text-slate-800">{label}</label>}
      <div
        className={`bg-slate-100 flex w-full items-center gap-2 ${className}`}
      >
        {icon}
        <input
          ref={ref}
          className={`border-none bg-transparent text-slate-600 grow outline-none ${inputClassName}`}
          value={value}
          type={type}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

const Input = forwardRef(MyInput);
export default Input;
