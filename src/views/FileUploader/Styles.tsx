import SelectInput from "../../components/form/SelectInput.tsx";
import ColorInput from "../../components/form/ColorInput.tsx";
import {Dispatch, SetStateAction} from "react";

type StylesParams = {
    lightThemeHoverBackgroundColor: [string, Dispatch<SetStateAction<string>>];
    darkThemeHoverBackgroundColor: [string, Dispatch<SetStateAction<string>>];
    lightThemeHoverTextColor: [string, Dispatch<SetStateAction<string>>];
    darkThemeHoverTextColor: [string, Dispatch<SetStateAction<string>>];
    borderColor: [string, Dispatch<SetStateAction<string>>];
    borderStyle: [string, Dispatch<SetStateAction<string>>];

}
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
export const Styles = ({
                           darkThemeHoverBackgroundColor,
                           lightThemeHoverTextColor,
                           lightThemeHoverBackgroundColor,
                           darkThemeHoverTextColor,
                           borderStyle,
                           borderColor
                       }: StylesParams) => {


    const [lightThemeHoverText, setLightThemeHoverTextColor] = lightThemeHoverTextColor
    const [darkThemeHoverText, setDarkThemeHoverTextColor] = darkThemeHoverTextColor
    const [lightThemeHoverBackground, setLightThemeHoverBackgroundColor] = lightThemeHoverBackgroundColor
    const [darkThemeHoverBackground, setDarkThemeHoverBackgroundColor] = darkThemeHoverBackgroundColor
    const [inputBorderColor, setInputBorderColor] = borderColor
    const [inputBorderStyle, setInputBorderStyle] = borderStyle


    return (
        <div>

            <SelectInput label="Border style" options={BORDER_STYLE} selectedValue={inputBorderStyle}
                         onChange={setInputBorderStyle}/>

            <ColorInput
                label="Border color"
                value={inputBorderColor}
                onChange={setInputBorderColor}
            />
            <ColorInput
                label="Hover text color (Light theme)"
                value={lightThemeHoverText}
                onChange={setLightThemeHoverTextColor}
            />
            <ColorInput
                label="Hover text color (Dark theme)"
                value={darkThemeHoverText}
                onChange={setDarkThemeHoverTextColor}
            />

            <ColorInput
                label="Hover background color (Light theme)"
                value={lightThemeHoverBackground}
                onChange={setLightThemeHoverBackgroundColor}
            />
            <ColorInput
                label="Hover background color (Dark theme)"
                value={darkThemeHoverBackground}
                onChange={setDarkThemeHoverBackgroundColor}
            />

        </div>
    )
}