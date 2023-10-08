import { useState } from "react";
import TextInput from "../components/form/TextInput";
import RemovableTextInput from "../components/form/RemovableTextInput";
import { ZodError, z } from "zod";

const inputSchema = z.object({
  dropdownLabel: z.string().min(1, "Please enter a label"),
  inputFieldName: z.string().min(1, "Please enter the input name"),
  dropdownItems: z
    .string()
    .min(1, "Please enter dropdown item value")
    .array()
    .min(1, "Please add at least one dropdown item!"),
});

export default function Dropdown() {
  const [dropdownLabel, setDropdownLabel] = useState("");
  const [inputFieldName, setInputFieldName] = useState("");
  const [dropdownItems, setDropdownItems] = useState<string[]>(new Array(3).fill(""));

  const [errors, setErrors] = useState<any>({});

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

  const handleDropdownInsert = () => {
    validateDate();
  };

  return (
    <div className="h-full px-20">
      <div className="leading-[1.15rem] border-b-[1.25px] border-b-[#363636] pb-[0.35rem] mb-2">
        <h3 className="font-semibold text-[0.82rem]">Dropdown</h3>
        <p className="text-[0.77rem] font-light text-[#ABABAB]">Custom dropdown menu</p>
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
      </div>

      <div className="mt-[0.3rem]">
        <p className="text-[0.77rem] box-border inline-block font-light text-[#ABABAB]">Sub Items</p>

        {dropdownItems.map((item, idx) => (
          <RemovableTextInput
            key={idx}
            value={item}
            onChange={(val) => handleDropdownItemChange(idx, val)}
            onRemove={() => handleDropdownItemRemove(idx)}
            error={errors[`dropdownItems.${idx}`]}
          />
        ))}

        <div className="border-b-[1.25px] border-b-[#363636] pb-[0.5rem]">
          <button
            className="w-full bg-[#5E5E5E] text-center text-[0.77rem] py-1 border-[#363636] border-[1px] rounded-sm"
            onClick={() => setDropdownItems([...dropdownItems, ""])}
          >
            Add item
          </button>
          {errors.dropdownItems && <span className="text-red-400 text-[0.74rem]">{errors.dropdownItems}</span>}
        </div>

        <div className="mt-2">
          <button
            className="w-full bg-[#0073E6] text-center text-[0.77rem] py-1 border-[#363636] border-[1px] rounded-sm"
            onClick={handleDropdownInsert}
          >
            Insert field
          </button>
        </div>
      </div>
    </div>
  );
}
