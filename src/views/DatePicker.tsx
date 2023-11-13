import { useState } from "react";
import TextInput from "../components/form/TextInput";
import { ZodError, z } from "zod";
import { useAppContext } from "../contexts/AppContext";
import * as webflowService from "../services/webflowService";
import SelectInput from "../components/form/SelectInput";
import { DATE_FORMATS, DATE_PICKER_LANGUAGES, WEEKDAYS } from "../config/date";
import SliderInput from "../components/form/SliderInput";
import ColorInput from "../components/form/ColorInput";
import RadioInput, { RadioOption } from "../components/form/RadioInput";

const inputSchema = z.object({
  label: z.string().min(1, "Please enter a label"),
  inputName: z.string().min(1, "Please enter the input name"),
  zIndex: z.number().min(0),
});

const datePickerTypes: { [x in "singlePicker" | "rangePicker"]: RadioOption } = {
  singlePicker: {
    value: "single",
    label: "Single date picker",
    helpContent: "Let's user select a single date only",
  },
  rangePicker: {
    value: "range",
    label: "Date range picker",
    helpContent: "Let's user select all dates between two dates",
  },
};

export default function DatePicker() {
  const { form } = useAppContext();

  const [label, setLabel] = useState("");
  const [inputName, setInputName] = useState("");
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(String(WEEKDAYS[0].value));
  const [language, setLanguage] = useState(DATE_PICKER_LANGUAGES[0].value);
  const [dateFormat, setDateFormat] = useState(DATE_FORMATS[0].value);
  const [numberOfMonthsToShow, setNumberOfMonthsToShow] = useState("2");
  const [columns, setColumns] = useState("2");
  const [zIndex, setZIndex] = useState("10");

  const [lightThemeSelectedDateTextColor, setLightThemeSelectedDateTextColor] = useState("rgb(255, 255, 255)");
  const [darkThemeSelectedDateTextColor, setDarkThemeSelectedDateTextColor] = useState("rgb(255, 255, 255)");

  const [lightThemeSelectedDateColor, setLightThemeSelectedDateColor] = useState("rgb(107 130 255)");
  const [darkThemeSelectedDateColor, setDarkThemeSelectedDateColor] = useState("rgb(107 130 255)");

  const [lightThemeTodayColor, setLightThemeTodayColor] = useState("rgb(230 55 87)");
  const [darkThemeTodayColor, setDarkThemeTodayColor] = useState("rgb(230 55 87)");

  const [datePickerType, setDatePickerType] = useState(datePickerTypes.singlePicker.value);

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

  const handleInsert = async () => {
    if (!validateData() || !form) return;

    const config = {
      form,
      label,
      inputName,
      firstDayOfWeek,
      language,
      dateFormat,
      numberOfMonthsToShow,
      columns,
      zIndex,
      lightThemeSelectedDateColor,
      darkThemeSelectedDateColor,
      lightThemeTodayColor,
      darkThemeTodayColor,
    };

    if (datePickerType === datePickerTypes.singlePicker.value) {
      await webflowService.insertDatePickerToForm(config);
    } else {
      await webflowService.insertDateRangePickerToForm(config);
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

        <div className="border-y-[1.25px] border-y-[#363636] py-1 my-3">
          <RadioInput
            label="Date picker type"
            options={Object.values(datePickerTypes)}
            selected={datePickerType}
            onChange={setDatePickerType}
          />
        </div>
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

        <ColorInput
          label="Selected date text color (Light theme)"
          value={lightThemeSelectedDateTextColor}
          onChange={setLightThemeSelectedDateTextColor}
        />
        <ColorInput
          label="Selected date text color (Dark theme)"
          value={darkThemeSelectedDateTextColor}
          onChange={setDarkThemeSelectedDateTextColor}
        />

        <ColorInput
          label="Selected date background color (Light theme)"
          value={lightThemeSelectedDateColor}
          onChange={setLightThemeSelectedDateColor}
        />
        <ColorInput
          label="Selected date background color (Dark theme)"
          value={darkThemeSelectedDateColor}
          onChange={setDarkThemeSelectedDateColor}
        />

        <ColorInput
          label="Today date color (Light theme)"
          value={lightThemeTodayColor}
          onChange={setLightThemeTodayColor}
        />
        <ColorInput
          label="Today date color (Dark theme)"
          value={darkThemeTodayColor}
          onChange={setDarkThemeTodayColor}
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
