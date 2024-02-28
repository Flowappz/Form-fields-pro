import TextInput from "../components/form/TextInput.tsx";
import ColorInput from "../components/form/ColorInput.tsx";
import {useEffect, useState} from "react";
import useElementInsertedBanner from "../hooks/useElementInsertedBanner.tsx";
import {z, ZodError} from "zod";
import {useAppContext} from "../contexts/AppContext.tsx";
import * as webflowService from "../services/webflowService.ts";


const inputSchema = z.object({
    colorPickerLabel: z.string().min(1, "Please enter a label"),
    inputFieldName: z.string().min(1, "Please enter the input name"),
})

export default function ColorPickerInput() {
    const {form} = useAppContext()

    const {Banner, showBanner} = useElementInsertedBanner();

    const [colorPickerLabel, setColorPickerLabel] = useState("");
    const [inputFieldName, setInputFieldName] = useState("");

    const [defaultColor, setDefaultColor] = useState("rgb(0, 0, 0)");


    const [lightThemeHoverBackgroundColor, setLightThemeHoverBackgroundColor] =
        useState("rgb(0, 0, 0)");
    const [darkThemeHoverBackgroundColor, setDarkThemeHoverBackgroundColor] =
        useState("rgb(0, 0, 0)");
    const [lightThemeHoverTextColor, setLightThemeHoverTextColor] =
        useState("rgb(255, 255, 255)");
    const [darkThemeHoverTextColor, setDarkThemeHoverTextColor] =
        useState("rgb(255, 255, 255)");

    const [errors, setErrors] = useState<any>({});


    const validateDate = () => {
        try {
            inputSchema.parse({
                colorPickerLabel,
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
        setInputFieldName(colorPickerLabel.replace(/\s+/g, '-').toLowerCase());
    }, [colorPickerLabel])


    const handleColorPickerInsert =async () => {
        if (validateDate() && form) {

           await webflowService.insertColorPickerToForm({
                label: colorPickerLabel,
                inputName: inputFieldName,
                defaultColor,
                form,
            })

            showBanner();

        }
    }

    return (

        <div className="h-full px-20 pt-10">
            <div className="leading-[1.15rem] border-b-[1.25px] border-b-[#363636] pb-[0.35rem] mb-2">
                <h3 className="font-semibold text-[#D9D9D9] text-[0.80rem]">Color Picker Input</h3>
                <p className="text-[0.70rem]  text-[#ABABAB]">An stylish color picker input</p>
            </div>
            <div className="border-b-[#363636] border-b-[1.25px]">
                <TextInput
                    label="Label"
                    value={colorPickerLabel}
                    name="label"
                    onChange={setColorPickerLabel}
                    error={errors.colorPickerLabel}
                />
                <TextInput
                    label="Field name"
                    name="input"
                    value={inputFieldName}
                    onChange={setInputFieldName}
                    error={errors.inputFieldName}
                />

                <ColorInput
                    label="Default Color"
                    value={defaultColor}
                    onChange={setDefaultColor}
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
                    onClick={handleColorPickerInsert}
                >
                    Insert field
                </button>
            </div>


        </div>
    )
}