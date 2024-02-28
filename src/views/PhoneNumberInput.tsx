import TextInput from "../components/form/TextInput.tsx";
import ColorInput from "../components/form/ColorInput.tsx";
import {useEffect, useState} from "react";
import {z, ZodError} from "zod";
import {useAppContext} from "../contexts/AppContext.tsx";
import useElementInsertedBanner from "../hooks/useElementInsertedBanner.tsx";
import * as webflowService from "../services/webflowService.ts";


const inputSchema = z.object({
    numberInputLabel: z.string().min(1, "Please enter a label"),
    inputFieldName: z.string().min(1, "Please enter the input name"),
})


export default function PhoneNumberInput() {

    const {form} = useAppContext();

    const [numberInputLabel, setNumberInputLabel] = useState("");
    const [inputFieldName, setInputFieldName] = useState("");
    const [inputFieldPlaceholder, setInputFieldPlaceholder] = useState("");

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


    const validateDate = () => {
        try {
            inputSchema.parse({
                numberInputLabel,
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


    // auto generate field name
    useEffect(() => {
        setInputFieldName(numberInputLabel.replace(/\s+/g, '-').toLowerCase());
    }, [numberInputLabel])

    const handleNumberInputInsert = async () => {
        if (validateDate() && form) {

            await webflowService.insertNumberInputToForm({
                form,
                label: numberInputLabel,
                inputName: inputFieldName,
                placeholderText:inputFieldPlaceholder
            })

            showBanner();
        }
    };


    return (
        <div className="h-full px-20 pt-10">
            <div className="leading-[1.15rem] border-b-[1.25px] border-b-[#363636] pb-[0.35rem] mb-2">
                <h3 className="font-semibold text-[#D9D9D9] text-[0.80rem]">Phone Number Input</h3>
                <p className="text-[0.70rem]  text-[#ABABAB]">Phone Number Input With Country Code</p>
            </div>
            <div className="border-b-[#363636] border-b-[1.25px]">
                <TextInput
                    label="Label"
                    value={numberInputLabel}
                    name="label"
                    onChange={setNumberInputLabel}
                    error={errors.numberInputLabel}
                />
                <TextInput
                    label="Field name"
                    name="input"
                    value={inputFieldName}
                    onChange={setInputFieldName}
                    error={errors.inputFieldName}
                />

                <TextInput
                    label="Field Placeholder"
                    name="input"
                    value={inputFieldPlaceholder}
                    onChange={setInputFieldPlaceholder}
                    error={errors.inputFieldName}
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
                    onClick={handleNumberInputInsert}
                >
                    Insert field
                </button>
            </div>


        </div>
    )
}