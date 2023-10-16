import TextInput from "../components/form/TextInput";

export default function NumberSlider() {
  return (
    <div className="h-full px-20">
      <div className="leading-[1.15rem] border-b-[1.25px] border-b-[#363636] pb-[0.35rem] mb-2">
        <h3 className="font-semibold text-[0.82rem]">Number picker slider</h3>
        <p className="text-[0.77rem] font-light text-[#ABABAB]">
          Number slider that lets user select a value between a range
        </p>
      </div>

      <div className="border-b-[#363636] border-b-[1.25px]">
        <TextInput
          label="Label"
          // value={dropdownLabel}
          name="label"
          // onChange={setDropdownLabel}
          // error={errors.dropdownLabel}
        />
        <TextInput
          label="Field name"
          name="input"
          // value={inputFieldName}
          // onChange={setInputFieldName}
          // error={errors.inputFieldName}
        />
      </div>

      <div className="mt-[0.3rem]">
        <div className="mt-2">
          <button className="w-full bg-[#0073E6] text-center text-[0.77rem] py-1 border-[#363636] border-[1px] rounded-sm">
            Insert field
          </button>
        </div>
      </div>
    </div>
  );
}
