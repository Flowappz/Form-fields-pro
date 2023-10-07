interface TextInputProps {
  label?: string;
}

export default function TextInput({ label }: TextInputProps) {
  return (
    <div className="pb-2 m-0 flex flex-col gap-1">
      {label ? (
        <span className="text-[0.77rem] box-border inline-block font-light text-[#ABABAB] m-0 p-0">{label}</span>
      ) : null}
      <input
        type="text"
        placeholder="Search"
        className="rounded-sm w-full px-[0.3rem] bg-[#2B2B2B] text-[0.7rem] leading-[1.1rem] p-1 focus:outline-none"
      />
    </div>
  );
}
