import { useState } from "react";
import TextInput from "../components/form/TextInput";
import { ZodError, z } from "zod";

export default function NumberRangePicker() {
  const [label, setLabel] = useState("");
  const [inputName, setInputName] = useState("");
  const [maxRange, setMaxRange] = useState<number | string>("");
  const [minRange, setMinRange] = useState<number | string>("");
  const [defaultMaxValue, setDefaultMaxValue] = useState<number | string>("");
  const [defaultMinValue, setDefaultMinValue] = useState<number | string>("");

  const [errors, setErrors] = useState<any>({});

  return (
    <div className="h-full px-20">
      <div className="leading-[1.15rem] border-b-[1.25px] border-b-[#363636] pb-[0.35rem] mb-2">
        <h3 className="font-semibold text-[0.82rem]">Number range picker</h3>
        <p className="text-[0.77rem] font-light text-[#ABABAB]">Lets user pick max & min value between two ranges</p>
      </div>

      <div className="border-b-[#363636] border-b-[1.25px]">
        <TextInput label="Label" value={label} name="label" onChange={setLabel} error={errors.label} />
        <TextInput label="Field name" name="input" value={inputName} onChange={setInputName} error={errors.inputName} />

        <TextInput
          label="Max range"
          name="maxRange"
          type="number"
          value={maxRange}
          onChange={(val) => setMaxRange(Number(val))}
          error={errors.maxRange}
        />

        <TextInput
          label="Min range"
          name="minRange"
          type="number"
          value={minRange}
          onChange={(val) => setMinRange(Number(val))}
          error={errors.minRange}
        />

        <TextInput
          label="Default max value"
          name="defaultMaxValue"
          type="number"
          value={defaultMaxValue}
          onChange={(val) => setDefaultMaxValue(Number(val))}
          error={errors.defaultMaxValue}
        />

        <TextInput
          label="Default min value"
          name="defaultMinValue"
          type="number"
          value={defaultMinValue}
          onChange={(val) => setDefaultMinValue(Number(val))}
          error={errors.defaultMinValue}
        />
      </div>

      <div className="mt-[0.3rem]">
        <div className="mt-2">
          <button
            className="w-full bg-[#0073E6] text-center text-[0.77rem] py-1 border-[#363636] border-[1px] rounded-sm"
            // onClick={validateData}
          >
            Insert field
          </button>
        </div>
      </div>
    </div>
  );
}
