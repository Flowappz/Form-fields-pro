import { useState } from "react";
import TextInput from "../components/form/TextInput";

export default function NumberSlider() {
  const [label, setLabel] = useState("");
  const [inputName, setInputName] = useState("");
  const [maxRange, setMaxRange] = useState("");
  const [minRange, setMinRange] = useState("");
  const [defaultValue, setDefaultValue] = useState("");

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
          value={label}
          name="label"
          onChange={setLabel}
          // error={errors.dropdownLabel}
        />
        <TextInput
          label="Field name"
          name="input"
          value={inputName}
          onChange={setInputName}
          // error={errors.inputFieldName}
        />

        <TextInput label="Max range" name="maxRange" type="number" value={maxRange} onChange={setMaxRange} />

        <TextInput label="Min range" name="minRange" type="number" value={minRange} onChange={setMinRange} />

        <TextInput
          label="Default value"
          name="defaultValue"
          type="number"
          value={defaultValue}
          onChange={setDefaultValue}
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
