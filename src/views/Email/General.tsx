import {Dispatch, SetStateAction} from "react";
import TextInput from "../../components/form/TextInput.tsx";

type GeneralParams = {
    label: [string, Dispatch<SetStateAction<string>>];
    inputFieldName: [string, Dispatch<SetStateAction<string>>];
    placeholder: [string, Dispatch<SetStateAction<string>>];
    emptyErrorMessage: [string, Dispatch<SetStateAction<string>>];
    invalidErrorMessage: [string, Dispatch<SetStateAction<string>>];
    errors: any
}
export const General = ({
                            errors,
                            invalidErrorMessage,
                            emptyErrorMessage,
                            placeholder,
                            inputFieldName,
                            label
                        }: GeneralParams) => {

    const [emailLabel, setEmailLabel] = label
    const [emailFieldName, setEmailFieldName] = inputFieldName
    const [inputPlaceholder, setInputPlaceholder] = placeholder
    const [emailInvalidErrorMessage, setEmailInvalidErrorMessage] = invalidErrorMessage
    const [emailEmptyErrorMessage, setEmailEmptyErrorMessage] = emptyErrorMessage

    return (
        <div className="border-b-[#363636] border-b-[1.25px]">

            <TextInput
                label="Label"
                value={emailLabel}
                name="label"
                onChange={setEmailLabel}
                error={errors.emailLabel}
            />
            <TextInput
                label="Field name"
                name="input"
                value={emailFieldName}
                onChange={setEmailFieldName}
                error={errors.emailFieldName}
            />
            <TextInput
                label="Placeholder"
                name="placeholder"
                value={inputPlaceholder}
                onChange={setInputPlaceholder}
            />
            <TextInput
                label="Error message when field is empty"
                name="emptyerrormessage"
                value={emailInvalidErrorMessage}
                onChange={setEmailInvalidErrorMessage}
            />
            <TextInput
                label="Error message when email is invalid"
                name="emptyerrormessage"
                value={emailEmptyErrorMessage}
                onChange={setEmailEmptyErrorMessage}
            />

        </div>
    )
}