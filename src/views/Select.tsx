import { useState } from "react";
import TextInput from "../components/form/TextInput";
import RemovableTextInput from "../components/form/RemovableTextInput";
import { ZodError, z } from "zod";
import { useAppContext } from "../contexts/AppContext";
import * as webflowService from "../services/webflowService";
import ColorInput from "../components/form/ColorInput";
import useElementInsertedBanner from "../hooks/useElementInsertedBanner";
import { useFocus } from "../hooks/useFocus";
import CheckboxInput from "../components/form/CheckboxInput";

const inputSchema = z.object({
  dropdownLabel: z.string().min(1, "Please enter a label"),
  inputFieldName: z.string().min(1, "Please enter the input name"),
  dropdownItems: z
    .string()
    .min(1, "Please enter option value")
    .array()
    .min(1, "Please add at least one option to select from!"),
});

export default function Select() {
  const { form } = useAppContext();

  const [dropdownLabel, setDropdownLabel] = useState("");
  const [inputFieldName, setInputFieldName] = useState("");
  const [isSearchable, setIsSearchable] = useState(false);
  const [dropdownItems, setDropdownItems] = useState<string[]>(new Array(3).fill(""));

  const [lightThemeHoverBackgroundColor, setLightThemeHoverBackgroundColor] = useState("rgb(0, 0, 0)");
  const [darkThemeHoverBackgroundColor, setDarkThemeHoverBackgroundColor] = useState("rgb(0, 0, 0)");
  const [lightThemeHoverTextColor, setLightThemeHoverTextColor] = useState("rgb(255, 255, 255)");
  const [darkThemeHoverTextColor, setDarkThemeHoverTextColor] = useState("rgb(255, 255, 255)");

  const [errors, setErrors] = useState<any>({});
  const { Banner, showBanner } = useElementInsertedBanner();
  const { focusRef } = useFocus<HTMLDivElement>();

  const handleDropdownItemChange = (idx: number, val: string) => {
    const items = [...dropdownItems];
    items[idx] = val;

    setDropdownItems(items);
  };

  const handleDropdownItemRemove = (idx: number) => {
    const items = dropdownItems.filter((item, i) => {
      item;
      return i !== idx;
    });
    setDropdownItems(items);
  };

  const validateDate = () => {
    try {
      inputSchema.parse({
        dropdownLabel,
        inputFieldName,
        dropdownItems,
      });

      setErrors({});

      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        const errorsByField: { [x: string]: string } = {};

        for (const issue of err.errors) {
          const { path, message } = issue;
          const field = path.length === 1 ? path[0] : path.join(".");

          errorsByField[field] = message;
        }

        setErrors(errorsByField);
      }
    }
  };

  const handleDropdownInsert = async () => {
    if (validateDate() && form) {
      const data = {
        form,
        label: dropdownLabel,
        inputName: inputFieldName,
        items: dropdownItems,
        lightThemeHoverTextColor,
        darkThemeHoverTextColor,
        lightThemeHoverBackgroundColor,
        darkThemeHoverBackgroundColor,
      };

      if (isSearchable) await webflowService.insertSearchableDropdownToForm(data);
      else await webflowService.insertDropdownToForm(data);

      showBanner();
    }
  };

  return (
    <div className="h-full px-20 pt-10" tabIndex={0} ref={focusRef}>
      <div className="leading-[1.15rem] border-b-[1.25px] border-b-[#363636] pb-[0.35rem] mb-2">
        <h3 className="font-semibold text-[#D9D9D9] text-[0.80rem]">Select Input</h3>
        <p className="text-[0.70rem]  text-[#ABABAB]">Custom select input with customization options</p>
      </div>

      <div className="border-b-[#363636] border-b-[1.25px]">
        <TextInput
          label="Label"
          value={dropdownLabel}
          name="label"
          onChange={setDropdownLabel}
          error={errors.dropdownLabel}
        />
        <TextInput
          label="Field name"
          name="input"
          value={inputFieldName}
          onChange={setInputFieldName}
          error={errors.inputFieldName}
        />

        <CheckboxInput
          label="Make it searchable"
          helpText="Let user search through the options"
          checked={isSearchable}
          onChange={setIsSearchable}
        />

        <ColorInput
          label="Hover text color (Light theme)"
          value={lightThemeHoverTextColor}
          onChange={setLightThemeHoverTextColor}
        />
        <ColorInput
          label="Hover text color (Dark theme)"
          value={darkThemeHoverTextColor}
          onChange={setDarkThemeHoverTextColor}
        />

        <ColorInput
          label="Hover background color (Light theme)"
          value={lightThemeHoverBackgroundColor}
          onChange={setLightThemeHoverBackgroundColor}
        />
        <ColorInput
          label="Hover background color (Dark theme)"
          value={darkThemeHoverBackgroundColor}
          onChange={setDarkThemeHoverBackgroundColor}
        />
      </div>

      <div className="mt-[0.3rem]">
        <p className="text-[0.77rem] box-border inline-block  text-[#ABABAB]">Select Options</p>

        {dropdownItems.map((item, idx) => (
          <RemovableTextInput
            key={idx}
            value={item}
            onChange={(val) => handleDropdownItemChange(idx, val)}
            onRemove={() => handleDropdownItemRemove(idx)}
            error={errors[`dropdownItems.${idx}`]}
            placeholder={`Option ${idx + 1}`}
          />
        ))}

        <div className="border-b-[1.25px] border-b-[#363636] pb-[0.5rem]">
          <button
            className="boxShadows-action-secondary action-secondary-background w-full bg-[#5E5E5E] text-center text-[0.77rem] py-1 border-[#363636] border-[1px] rounded-[4px]"
            onClick={() => setDropdownItems([...dropdownItems, ""])}
          >
            Add item
          </button>
          {errors.dropdownItems && <span className="text-red-400 text-[0.74rem]">{errors.dropdownItems}</span>}
        </div>

        <div className="mt-2">
          <Banner />
          <button
            className="boxShadows-action-colored mb-[60px] w-full bg-[#0073E6] text-center text-[0.77rem] py-1 border-[#363636] border-[1px] rounded-[4px]"
            onClick={handleDropdownInsert}
          >
            Insert field
          </button>
        </div>
      </div>
    </div>
  );
}
