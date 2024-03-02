import {useEffect, useState} from "react";
import TextInput from "../components/form/TextInput";
import { ZodError, z } from "zod";
import { useAppContext } from "../contexts/AppContext";
import * as webflowService from "../services/webflowService";
import { DATE_FORMATS, DATE_PICKER_LANGUAGES, WEEKDAYS } from "../config/date";
import SelectInput from "../components/form/SelectInput";
import SliderInput from "../components/form/SliderInput";

const inputSchema = z.object({
  label: z.string().min(1, "Please enter a label"),
  inputName: z.string().min(1, "Please enter the input name"),
  zIndex: z.number().min(0),
});

export default function DateRangePicker() {
  const { form } = useAppContext();

  const [label, setLabel] = useState("");
  const [inputName, setInputName] = useState("");
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(String(WEEKDAYS[0].value));
  const [language, setLanguage] = useState(DATE_PICKER_LANGUAGES[0].value);
  const [dateFormat, setDateFormat] = useState(DATE_FORMATS[0].value);
  const [numberOfMonthsToShow, setNumberOfMonthsToShow] = useState("2");
  const [columns, setColumns] = useState("2");
  const [zIndex, setZIndex] = useState("10");

  const [errors, setErrors] = useState<any>({});

  const validateData = () => {
    try {
      inputSchema.parse({
        label,
        inputName,
        zIndex: Number(zIndex),
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

  // auto generate field name
  useEffect(() => {
    setInputName(label.replace(/[\s,.]+/g, "-").toLowerCase());
  }, [label])

  const handleInsert = async () => {
    if (validateData() && form) {
      await webflowService.insertDateRangePickerToForm({
        form,
        label,
        inputName,
        firstDayOfWeek,
        language,
        dateFormat,
        numberOfMonthsToShow,
        columns,
        zIndex,
      });
    }
  };

  return (
    <div className="h-full px-20 pt-10">
      <div className="leading-[1.15rem] border-b-[1.25px] border-b-[#363636] pb-[0.35rem] mb-2">
        <h3 className="font-semibold text-[0.82rem]">Date range picker</h3>
        <p className="text-[0.77rem]  text-[#ABABAB]">A beautiful date picker to select between multiple dates</p>
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
        <SelectInput
          label="Calender language"
          options={DATE_PICKER_LANGUAGES}
          selectedValue={language}
          onChange={setLanguage}
        />
        <SelectInput label="Date format" options={DATE_FORMATS} selectedValue={dateFormat} onChange={setDateFormat} />

        <SliderInput
          label="How many months to show by default"
          max={12}
          min={1}
          value={numberOfMonthsToShow}
          onChange={setNumberOfMonthsToShow}
        />
        <SliderInput label="Number of columns" max={12} min={1} value={columns} onChange={setColumns} />

        <TextInput
          label="Z-index"
          name="zIndex"
          type="number"
          value={zIndex}
          onChange={setZIndex}
          error={errors.zIndex}
        />
      </div>

      <div className="mt-[0.3rem]">
        <div className="mt-2">
          <button
            className="boxShadows-action-colored mb-[60px] w-full bg-[#0073E6] text-center text-[0.77rem] py-1 border-[#363636] border-[1px] rounded-[4px]"
            onClick={handleInsert}
          >
            Insert field
          </button>
        </div>
      </div>
    </div>
  );
}
