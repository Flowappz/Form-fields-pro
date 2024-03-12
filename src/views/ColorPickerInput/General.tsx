import TextInput from "../../components/form/TextInput.tsx";
import {Dispatch, SetStateAction} from "react";

type GeneralParams = {
    colorPickerLabel:[string, Dispatch<SetStateAction<string>>];
    inputFieldName:[string, Dispatch<SetStateAction<string>>];
    errors:any
}
export const General = ({colorPickerLabel ,inputFieldName ,errors}:GeneralParams) => {

    const [pickerLabel ,setColorPickerLabel] = colorPickerLabel
    const [pickerFieldName ,setInputFieldName] = inputFieldName

    return (
        <div className="border-b-[#363636] border-b-[1.25px]">
            <TextInput
                label="Label"
                value={pickerLabel}
                name="label"
                onChange={setColorPickerLabel}
                error={errors.colorPickerLabel}
            />
            <TextInput
                label="Field name"
                name="input"
                value={pickerFieldName}
                onChange={setInputFieldName}
                error={errors.inputFieldName}
            />

        </div>
    )
}