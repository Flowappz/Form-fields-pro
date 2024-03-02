import TextInput from "../components/form/TextInput.tsx";
import ColorInput from "../components/form/ColorInput.tsx";
import {useEffect, useState} from "react";
import {z, ZodError} from "zod";
import useElementInsertedBanner from "../hooks/useElementInsertedBanner.tsx";
import * as webflowService from "../services/webflowService.ts";
import {useAppContext} from "../contexts/AppContext.tsx";
import SelectInput from "../components/form/SelectInput.tsx";


export const BORDER_STYLE: { value: string; content: string }[] = [
    {
        content: "Solid",
        value: "solid",
    },
    {
        content: "Dotted",
        value: "dotted",
    },
    {
        content: "Dashed",
        value: "dashed",
    },
];

const inputSchema = z.object({
    fileInputLabel: z.string().min(1, "Please enter a label"),
    inputFieldName: z.string().min(1, "Please enter the input name"),
})

export default function FileUploader() {


    const {form} = useAppContext();

    const [fileInputLabel, setFileInputLabel] = useState("");
    const [inputFieldName, setInputFieldName] = useState("");
    const [acceptedFiles ,setAcceptedFiles ] = useState("")
    const [maxFileSize ,setMaxFileSize ] = useState("")
    const [maxFiles ,setMaxFiles ] = useState("")
    const [borderColor , setBorderColor] = useState('rgb(0, 0, 0)')
    const [borderStyle , setBorderStyle] = useState('solid')

    const [lightThemeHoverBackgroundColor, setLightThemeHoverBackgroundColor] =
        useState("rgb(0, 0, 0)");
    const [darkThemeHoverBackgroundColor, setDarkThemeHoverBackgroundColor] =
        useState("rgb(0, 0, 0)");
    const [lightThemeHoverTextColor, setLightThemeHoverTextColor] =
        useState("rgb(255, 255, 255)");
    const [darkThemeHoverTextColor, setDarkThemeHoverTextColor] =
        useState("rgb(255, 255, 255)");

    const {Banner, showBanner} = useElementInsertedBanner();
    const [errors, setErrors] = useState<any>({});


    // auto generate field name
    useEffect(() => {
        setInputFieldName(fileInputLabel.replace(/[\s,.]+/g, "-").toLowerCase());
    }, [fileInputLabel])

    const validateDate = () => {
        try {
            inputSchema.parse({
                fileInputLabel,
                inputFieldName,
            });

            setErrors({});

            return true;
        } catch (err) {
            if (err instanceof ZodError) {
                const errorsByField: { [x: string]: string } = {};

                for (const issue of err.errors) {
                    const {path, message} = issue;
                    const field = path.length === 1 ? path[0] : path.join(".");

                    errorsByField[field] = message;
                }

                setErrors(errorsByField);
            }
        }
    };

    const handleFileInputInsert = async () => {
        if (validateDate() && form) {

            webflowService.insertFileUploaderToForm({
                form,
                label:fileInputLabel,
                inputName:inputFieldName,
                acceptedFiles,
                maxFileSize,
                maxFiles,
                borderColor,
                borderStyle,})
            showBanner();
        }
    };

    return (
        <div className="h-full px-20 pt-10">
            <div className="leading-[1.15rem] border-b-[1.25px] border-b-[#363636] pb-[0.35rem] mb-2">
                <h3 className="font-semibold text-[#D9D9D9] text-[0.80rem]">File Upload field</h3>
                <p className="text-[0.70rem]  text-[#ABABAB]">Custom file upload field with customization options</p>
            </div>


            <div className="border-b-[#363636] border-b-[1.25px]">
                <TextInput
                    label="Label"
                    value={fileInputLabel}
                    name="label"
                    onChange={setFileInputLabel}
                    error={errors.fileInputLabel}
                />
                <TextInput
                    label="Field name"
                    name="input"
                    value={inputFieldName}
                    onChange={setInputFieldName}
                    error={errors.inputFieldName}
                />
                <TextInput
                    label="Accepted files(file extension with comma)"
                    name="input"
                    value={acceptedFiles}
                    onChange={setAcceptedFiles}

                />
                <TextInput
                    label="Maximum file size(MB)"
                    name="input"
                    value={maxFileSize}
                    onChange={setMaxFileSize}

                />
                <TextInput
                    label="Maximum files"
                    name="input"
                    value={maxFiles}
                    onChange={setMaxFiles}

                />

                <SelectInput label="Border style" options={BORDER_STYLE} selectedValue={borderStyle} onChange={setBorderStyle} />


                <ColorInput
                    label="Border color"
                    value={borderColor}
                    onChange={setBorderColor}
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


            <div className="mt-2">
                <Banner/>
                <button
                    className="boxShadows-action-colored mb-[60px] w-full bg-[#0073E6] text-center text-[0.77rem] py-1 border-[#363636] border-[1px] rounded-[4px]"
                    onClick={handleFileInputInsert}
                >
                    Insert field
                </button>
            </div>
        </div>
    )
}