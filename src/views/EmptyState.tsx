import PinIcon from "../icons/Pin";

export default function EmptyState() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-3/4 bg-[#4D4D4D] flex flex-col items-center p-[0.75rem] pb-[1.3rem] rounded">
        <PinIcon />

        <h4 className="text-center font-bold text-[0.82rem] mt-[0.2rem] leading-5">Select a field type</h4>
        <p className="text-[0.77rem] font-light text-[#ABABAB] text-center">
          To use a form field, select it and add relevant settings, then press insert
        </p>
      </div>
    </div>
  );
}
