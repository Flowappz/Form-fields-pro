import TextInput from "../../components/form/TextInput.tsx";
import {Dispatch, SetStateAction} from "react";

type GeneralParams = {
    fileInputLabel: [string, Dispatch<SetStateAction<string>>];
    inputFieldName: [string, Dispatch<SetStateAction<string>>];
    acceptedFiles: [string, Dispatch<SetStateAction<string>>];
    maxFileSize: [string, Dispatch<SetStateAction<string>>];
    maxFiles: [string, Dispatch<SetStateAction<string>>];
    errors: any
}
export const General = ({
                            fileInputLabel,
                            inputFieldName,
                            acceptedFiles,
                            maxFileSize,
                            maxFiles,
                            errors
                        }: GeneralParams) => {

    const [label, setFileInputLabel] = fileInputLabel
    const [fieldName, setInputFieldName] = inputFieldName
    const [fieldAcceptedFiles, setAcceptedFiles] = acceptedFiles
    const [maximumFileSize, setMaxFileSize] = maxFileSize
    const [acceptedMaxFiles, setMaxFiles] = maxFiles


    return (
        <div className="border-b-[#363636] border-b-[1.25px]">
            <TextInput
                label="Label"
                value={label}
                name="label"
                onChange={setFileInputLabel}
                error={errors.fileInputLabel}
            />
            <TextInput
                label="Field name"
                name="input"
                value={fieldName}
                onChange={setInputFieldName}
                error={errors.inputFieldName}
            />
            <TextInput
                label="Accepted files(file extension with comma)"
                name="input"
                value={fieldAcceptedFiles}
                onChange={setAcceptedFiles}

            />
            <TextInput
                label="Maximum file size(MB)"
                name="input"
                value={maximumFileSize}
                onChange={setMaxFileSize}

            />
            <TextInput
                label="Maximum files"
                name="input"
                value={acceptedMaxFiles}
                onChange={setMaxFiles}

            />

        </div>
    )
}