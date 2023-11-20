export interface TextInputProps {
  label?: string;
  placeholder?: string;
  name?: string;
  value?: string | number;
  type?: "text" | "number";
  onChange?: (val: string) => void;
  error?: string;
}

export default function TextInput({
  label,
  placeholder = "Type here...",
  name = "",
  value = "",
  type = "text",
  onChange = () => {},
  error,
}: TextInputProps) {
  return (
    <div className="pb-2 m-0 flex flex-col gap-1">
      {label ? (
        <span className="text-[0.70rem] box-border inline-block font-light text-[#ABABAB] m-0 p-0">{label}</span>
      ) : null}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-inner-shadow rounded-[4px] bg-[#00000015] border-[1px] border-[#ffffff24] shadow-xl text-[#f5f5f5] placeholder:text-[#ffffff66] w-full px-[0.3rem] text-[0.7rem] leading-[1.1rem] p-1 focus:outline-none"
      />
      {error && <span className="text-red-400 text-[0.74rem]">{error}</span>}
    </div>
  );
}
