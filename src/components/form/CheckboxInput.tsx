export interface CheckboxInputProps {
  label?: string;
  helpText?: string;
  name?: string;
  checked: boolean;
  value?: string;
  onChange: (state: boolean) => void;
}

export default function CheckboxInput({ label, helpText, checked, onChange }: CheckboxInputProps) {
  return (
    <div className="flex pb-3">
      <div className="flex items-center h-5">
        <input
          id="helper-checkbox"
          aria-describedby="helper-checkbox-text"
          type="checkbox"
          value=""
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-[3.5] h-[3.5] text-[#0073E6] bg-gray-100 border-gray-300 rounded focus:ring-[#0073E6] focus:ring-2"
        />
      </div>
      <div className="ms-2 mt-[-0.25rem]">
        <label htmlFor="helper-checkbox" className="font-medium text-[#ABABAB] text-[0.77rem]">
          {label}
        </label>
        <p id="helper-checkbox-text" className="text-xs font-normal text-[#ABABAB]">
          {helpText}
        </p>
      </div>
    </div>
  );
}
