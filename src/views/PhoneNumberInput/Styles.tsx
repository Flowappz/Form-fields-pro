import ColorInput from "../../components/form/ColorInput.tsx";
import {Dispatch, SetStateAction} from "react";

type StylesParams = {
    lightThemeHoverBackgroundColor: [string, Dispatch<SetStateAction<string>>];
    darkThemeHoverBackgroundColor: [string, Dispatch<SetStateAction<string>>];
    lightThemeHoverTextColor: [string, Dispatch<SetStateAction<string>>];
    darkThemeHoverTextColor: [string, Dispatch<SetStateAction<string>>];

}
export const Styles = ({
                           lightThemeHoverTextColor,
                           darkThemeHoverTextColor,
                           lightThemeHoverBackgroundColor,
                           darkThemeHoverBackgroundColor
                       }: StylesParams) => {

    const [lightThemeHoverText, setLightThemeHoverTextColor] = lightThemeHoverTextColor
    const [darkThemeHoverText, setDarkThemeHoverTextColor] = darkThemeHoverTextColor

    const [lightThemeHoverBackground, setLightThemeHoverBackgroundColor] = lightThemeHoverBackgroundColor
    const [darkThemeHoverBackground, setDarkThemeHoverBackgroundColor] = darkThemeHoverBackgroundColor

    return (
        <div className="border-b-[#363636] border-b-[1.25px]">
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