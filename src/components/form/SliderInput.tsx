export interface SliderInputProps {
  label: string;
  max: number | string;
  min: number | string;
  value: number | string;
  onChange: (val: string) => void;
}

export default function SliderInput({ label, max, min, value, onChange }: SliderInputProps) {
  return (
    <div className="pb-2 m-0 flex flex-col gap-1">
      <span className="text-[0.77rem] box-border inline-block text-[#ABABAB] m-0 p-0">{label}</span>

      <div className="w-full flex justify-between items-center text-xs gap-3">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="range accent-[#0073E6] flex-1 focus:outline-none"
          step="1"
        />
        <span className="p-1 bg-[#2B2B2B] font-bold">{String(value).padStart(2, "0")}</span>
      </div>
    </div>
  );
}
