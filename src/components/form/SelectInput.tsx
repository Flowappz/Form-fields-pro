export interface SelectInputProps {
  label: string;
  options: { content: string; value: number | string }[];
  selectedValue: number | string;
  onChange: (val: string) => void;
}

export default function SelectInput({ label, options, selectedValue, onChange }: SelectInputProps) {
  return (
    <div className="pb-2 m-0 flex flex-col gap-1">
      <span className="text-[0.77rem] box-border inline-block font-light text-[#ABABAB] m-0 p-0">{label}</span>

      <select
        className="rounded-sm w-full px-[0.3rem] bg-[#2B2B2B] text-[0.7rem] leading-[1.1rem] p-1 focus:outline-none"
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((op) => (
          <option key={op.value} value={op.value} selected={selectedValue === op.value}>
            {op.content}
          </option>
        ))}
      </select>
    </div>
  );
}
