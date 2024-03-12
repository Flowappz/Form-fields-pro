import TextInput from "../../components/form/TextInput.tsx";
import {Dispatch, SetStateAction} from "react";

type GeneralParams = {
    numberInputLabel: [string, Dispatch<SetStateAction<string>>];
    inputFieldName: [string, Dispatch<SetStateAction<string>>];
    inputFieldPlaceholder: [string, Dispatch<SetStateAction<string>>];
    errors: any
}
export const General = ({numberInputLabel, inputFieldName, inputFieldPlaceholder, errors}: GeneralParams) => {

    const [inputLabel, setNumberInputLabel] = numberInputLabel
    const [inputName, setInputFieldName] = inputFieldName
    const [inputPlaceholder, setInputFieldPlaceholder] = inputFieldPlaceholder

    return (
        <div className="border-b-[#363636] border-b-[1.25px]">
            <TextInput
                label="Label"
                value={inputLabel}
                name="label"
                onChange={setNumberInputLabel}
                error={errors.numberInputLabel}
            />
            <TextInput
                label="Field name"
                name="input"
                value={inputName}
                onChange={setInputFieldName}
                error={errors.inputFieldName}
            />

            <TextInput
                label="Field Placeholder"
                name="input"
                value={inputPlaceholder}
                onChange={setInputFieldPlaceholder}
                error={errors.inputFieldName}
            />

        </div>
    )
}