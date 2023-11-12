export interface RadioInputProps {
  label?: string;
  options: RadioOption[];
  selected: string;
  onChange: (val: string) => void;
}

export interface RadioOption {
  value: string;
  label: string;
  helpContent?: string;
}

export default function RadioInput({ label, options, selected, onChange }: RadioInputProps) {
  return (
    <div className="pb-2 m-0 flex flex-col gap-3 text-[0.77rem]">
      <span className="text-[0.77rem] box-border inline-block font-light text-[#ABABAB] m-0 p-0">{label}</span>

      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <div key={option.value} className="flex flex-row items-start">
            <div>
              <input
                id={option.value}
                aria-describedby="helper-radio-text"
                type="radio"
                value={option.value}
                checked={option.value === selected}
                className="text-[#ABABAB] bg-gray-100 border-gray-300 focus:ring-blue-500"
                onChange={(e) => onChange(e.target.value)}
              />
            </div>
            <div className="ms-2 mt-[-0.2rem]">
              <label htmlFor={option.value} className="text-[#ABABAB]">
                {option.label}
              </label>
              <p id="helper-radio-text" className="text-xs font-normal text-[#ABABAB]">
                {option.helpContent}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
