import { useState } from "react";
import TextInput from "../components/form/TextInput";
import { ZodError, z } from "zod";
import { useAppContext } from "../contexts/AppContext";
import * as webflowService from "../services/webflowService";

const inputSchema = ({ max, min }: { max: number; min: number }) =>
  z.object({
    label: z.string().min(1, "Please enter a label"),
    inputName: z.string().min(1, "Please enter the input name"),

    maxRange: z
      .number({
        invalid_type_error: "Please enter a max range value",
      })
      .gt(min, "Max range should be greater than minimum range value"),
    minRange: z
      .number({
        invalid_type_error: "Please enter a max range value",
      })
      .lt(max, "Min range should be less than maximum range value"),

    defaultValue: z
      .number({
        invalid_type_error: "Please enter a min range value",
      })
      .gte(min, "Default value should be greater than or equal to minimum range value")
      .lte(max, "Default value should be less than or equal to max range value"),
  });

export default function NumberSlider() {
  const { form } = useAppContext();

  const [label, setLabel] = useState("");
  const [inputName, setInputName] = useState("");
  const [maxRange, setMaxRange] = useState<number | string>("");
  const [minRange, setMinRange] = useState<number | string>("");
  const [defaultValue, setDefaultValue] = useState<number | string>("");

  const [errors, setErrors] = useState<any>({});

  const validateData = () => {
    try {
      inputSchema({ max: maxRange as number, min: minRange as number }).parse({
        label,
        inputName,
        maxRange,
        minRange,
        defaultValue,
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
      await webflowService.insertNumberSliderToForm({
        form,
        label,
        inputName,
        maxRange: Number(maxRange),
        minRange: Number(minRange),
        defaultValue: Number(defaultValue),
      });
    }
  };

  return (
    <div className="h-full px-20">
      <div className="leading-[1.15rem] border-b-[1.25px] border-b-[#363636] pb-[0.35rem] mb-2">
        <h3 className="font-semibold text-[0.82rem]">Number picker slider</h3>
        <p className="text-[0.77rem] font-light text-[#ABABAB]">
          Number slider that lets user select a value between a range
        </p>
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
          label="Default value"
          name="defaultValue"
          type="number"
          value={defaultValue}
          onChange={(val) => setDefaultValue(Number(val))}
          error={errors.defaultValue}
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
