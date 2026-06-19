import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errMsg?: string | null;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  errMsg,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1 w-full text-left">
      {label && (
        <label className="text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-[#0a0a0a] text-white placeholder-gray-500 rounded-lg border border-gray-800 px-4 py-3 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition duration-200 ${className} ${
          errMsg ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
        }`}
        {...props}
      />
      {errMsg && (
        <span className="text-xs text-red-500 font-medium mt-1">
          {errMsg}
        </span>
      )}
    </div>
  );
};
