import React, { memo } from "react";
import { useFormContext, Controller } from "react-hook-form";

interface FormInputProps {
  name: string;
  placeholder?: string;
  icon?: React.ReactNode;
  type?: string;
  className?: string;
  inputClassName?: string;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  formatting?: (value: string) => string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

const FormInput: React.FC<FormInputProps> = memo(
  ({
    name,
    placeholder,
    icon,
    type = "text",
    className = "",
    inputClassName = "",
    required = false,
    disabled = false,
    autoFocus = false,
    formatting = (value: string) => value,
    onChange: customOnChange,
    onBlur: customOnBlur,
  }) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      onChange: (value: string) => void
    ) => {
      const value = e.target.value;
      let formattedValue: string;
      switch (type) {
        case "email":
          formattedValue = value.replace(/\s/g, "").toLowerCase();
          break;
        case "text":
          formattedValue = value.replace(/\s+/g, " ").trimStart();
          break;
        default:
          formattedValue = formatting(value);
          break;
      }
      onChange(formattedValue);
      if (customOnChange) {
        customOnChange(e);
      }
    };

    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <div className={`w-full ${className}`}>
            <div className="relative">
              {icon && (
                <div className="absolute left-3 top-[50%] transform translate-y-[-50%] text-gray-400 pointer-events-none">
                  {icon}
                </div>
              )}
              <input
                ref={ref}
                value={value ?? ""}
                onChange={(e) => handleChange(e, onChange)}
                onBlur={() => {
                  if (customOnBlur) {
                    customOnBlur();
                  } else {
                    onBlur();
                  }
                }}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                autoFocus={autoFocus}
                className={`w-full py-3 ${
                  icon ? "pl-10" : "pl-4"
                } pr-4 border ${
                  errors[name]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-purple-600"
                } rounded-md focus:outline-none focus:ring-2 transition-colors ${
                  disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
                } ${inputClassName}`}
              />
            </div>
            {errors[name] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[name]?.message as string}
              </p>
            )}
          </div>
        )}
      />
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
