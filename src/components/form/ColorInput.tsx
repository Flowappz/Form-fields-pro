import { useState } from "react";
import { RgbStringColorPicker } from "react-colorful";

export interface ColorInputProps {
  label?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange: (val: string) => void;
  error?: string;
}

export default function ColorInput({ label, placeholder, name, value, onChange, error }: ColorInputProps) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="pb-2 m-0 flex flex-col gap-1">
      {label ? <span className="text-[0.77rem] box-border inline-block text-[#ABABAB] m-0 p-0">{label}</span> : null}
      <div className="relative" tabIndex={-1} onFocus={() => setShowPicker(true)} onBlur={() => setShowPicker(false)}>
        <div className="absolute bottom-0 right-[-70px] z-[3]">
          {showPicker && <RgbStringColorPicker color={value} onChange={onChange} />}
        </div>
        <input
          type="text"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-[4px] w-full px-[0.3rem] bg-[#2B2B2B] text-[0.7rem] leading-[1.1rem] p-1 focus:outline-none"
        />
        {error && <span className="text-red-400 text-[0.74rem]">{error}</span>}
      </div>
    </div>
  );
}
