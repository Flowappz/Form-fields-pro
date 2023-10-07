import PinIcon from "../icons/Pin";

export default function NoFormSelectedState() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-3/4 bg-red-500 flex flex-col items-center p-[0.75rem] pb-[1.3rem] rounded">
        <PinIcon color="white" />

        <h4 className="text-center font-bold text-[0.82rem] mt-[0.2rem] leading-5">Please select a form first</h4>
        <p className="text-[0.77rem] font-light text-center">
          To use a form field, you must select a form in the designer console.
        </p>
      </div>
    </div>
  );
}