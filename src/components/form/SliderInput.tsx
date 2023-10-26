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
      <span className="text-[0.77rem] box-border inline-block font-light text-[#ABABAB] m-0 p-0">{label}</span>

      <div className="w-full flex justify-between text-xs gap-3">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="range accent-green-500 flex-1"
          step="1"
        />
        <span>{String(value).padStart(2, "0")}</span>
      </div>
    </div>
  );
}
