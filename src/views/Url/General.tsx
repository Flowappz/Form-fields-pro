import TextInput from "../../components/form/TextInput.tsx";
import {Dispatch, SetStateAction} from "react";
import CheckboxInput from "../../components/form/CheckboxInput.tsx";


type GeneralParams = {
    label: [string, Dispatch<SetStateAction<string>>];
    inputFieldName: [string, Dispatch<SetStateAction<string>>];
    placeholder: [string, Dispatch<SetStateAction<string>>];
    required: [boolean, Dispatch<SetStateAction<boolean>>];
    autofocus: [boolean, Dispatch<SetStateAction<boolean>>];
    errors: any;
}

export const General = ({label, placeholder, autofocus, required, inputFieldName, errors}: GeneralParams) => {

    const [InputLabel, setLabel] = label;
    const [fieldName, setInputFieldName] = inputFieldName
    const [inputPlaceholder, setPlaceholder] = placeholder
    const [inputRequired, setRequired] = required
    const [inputAutofocus, setAutofocus] = autofocus

    return (
        <div className="border-b-[#363636] border-b-[1.25px]">
            <TextInput
                label="Label"
                value={InputLabel}
                name="label"
                onChange={setLabel}
                error={errors.label}
            />
            <TextInput
                label="Name"
                name="name"
                value={fieldName}
                onChange={setInputFieldName}
                error={errors.inputFieldName}
            />
            <TextInput
                label="Placeholder"
                name="placeholder"
                value={inputPlaceholder}
                onChange={setPlaceholder}
                error={errors.placeholder}
            />
            <CheckboxInput onChange={setRequired} isChecked={inputRequired} label={'Required'} name={'required'}/>
            <CheckboxInput onChange={setAutofocus} isChecked={inputAutofocus} label={'Autofocus'} name={'autofocus'}/>
        </div>
    )
}
