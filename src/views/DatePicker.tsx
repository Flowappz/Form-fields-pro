import { useState } from "react";
import TextInput from "../components/form/TextInput";
import { ZodError, z } from "zod";
import { useAppContext } from "../contexts/AppContext";
import * as webflowService from "../services/webflowService";
import SelectInput from "../components/form/SelectInput";
import { WEEKDAYS } from "../config/date";

const inputSchema = z.object({
  label: z.string().min(1, "Please enter a label"),
  inputName: z.string().min(1, "Please enter the input name"),
});

export default function DatePicker() {
  const { form } = useAppContext();

  const [label, setLabel] = useState("");
  const [inputName, setInputName] = useState("");
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(String(WEEKDAYS[0].value));

  const [errors, setErrors] = useState<any>({});

  const validateData = () => {
    try {
      inputSchema.parse({
        label,
        inputName,
      });

      setErrors({});

      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        const errorsByField: { [x: string]: string } = {};

        for (let issue of err.errors) {
          const { path, message } = issue;
          const field = path.length === 1 ? path[0] : path.join(".");

          errorsByField[field] = message;
        }

        setErrors(errorsByField);
      }
    }
  };

  const handleInsert = async () => {
    if (validateData() && form) {
      await webflowService.insertDatePickerToForm({
        form,
        label,
        inputName,
      });
    }
  };

  return (
    <div className="h-full px-20">
      <div className="leading-[1.15rem] border-b-[1.25px] border-b-[#363636] pb-[0.35rem] mb-2">
        <h3 className="font-semibold text-[0.82rem]">Date picker</h3>
        <p className="text-[0.77rem] font-light text-[#ABABAB]">A beautiful date picker</p>
      </div>

      <div className="border-b-[#363636] border-b-[1.25px]">
        <TextInput label="Label" value={label} name="label" onChange={setLabel} error={errors.label} />
        <TextInput label="Field name" name="input" value={inputName} onChange={setInputName} error={errors.inputName} />
        <SelectInput
          label="First day of the week"
          options={WEEKDAYS}
          selectedValue={firstDayOfWeek}
          onChange={setFirstDayOfWeek}
        />
      </div>

      <div className="mt-[0.3rem]">
        <div className="mt-2">
          <button
            className="w-full bg-[#0073E6] text-center text-[0.77rem] py-1 border-[#363636] border-[1px] rounded-sm"
            onClick={handleInsert}
          >
            Insert field
          </button>
        </div>
      </div>
    </div>
  );
}
