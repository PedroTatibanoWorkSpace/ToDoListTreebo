import React from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`appearance-none block w-full py-2 px-3 border border-gray-500 rounded-md shadow-md bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 ${className}`}
    />
  );
};

export default Input;
