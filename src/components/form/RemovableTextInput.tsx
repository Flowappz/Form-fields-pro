import CloseDefaultIcon from "../../icons/CloseDefault";
import TextInput, { TextInputProps } from "./TextInput";

interface RemovableTextInputProps extends TextInputProps {
  onRemove: () => void;
}

export default function RemovableTextInput({
  label,
  name = "",
  value,
  placeholder = "1000$",
  onChange = () => {},
  onRemove,
  error,
}: RemovableTextInputProps) {
  return (
    <div className="flex gap-1 justify-between items-start">
      <div className="flex-1">
        <TextInput
          placeholder={placeholder}
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          error={error}
        />
      </div>
      <div
        className="bg-[#5E5E5E] box-border mb-2 p-1 border-[#363636] border-[1px] rounded-sm cursor-pointer"
        onClick={onRemove}
      >
        <CloseDefaultIcon />
      </div>
    </div>
  );
}
