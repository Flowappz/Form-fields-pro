import {useEffect, useState} from "react";
import useElementInsertedBanner from "../../hooks/useElementInsertedBanner.tsx";
import {z, ZodError} from "zod";
import {useAppContext} from "../../contexts/AppContext.tsx";
import * as webflowService from "../../services/webflowService.ts";
import {Tabs} from "../../components/Tabs.tsx";
import {TabHeader} from "../../components/TabHeader.tsx";
import {General} from "./General.tsx";
import {Styles} from "./Styles.tsx";
import {ConditionalLogic} from "./ConditionalLogic.tsx";
import {Button} from "../../components/Button.tsx";


const inputSchema = z.object({
    colorPickerLabel: z.string().min(1, "Please enter a label"),
    inputFieldName: z.string().min(1, "Please enter the input name"),
})

export default function ColorPickerInput() {
    const {form} = useAppContext()
    const [isLoading, setIsLoading] = useState(false)

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
        setInputFieldName(colorPickerLabel.replace(/[\s,.]+/g, "-").toLowerCase());
    }, [colorPickerLabel])

    const handleColorPickerInsert = async () => {
        if (validateDate() && form) {
            setIsLoading(true)
            await webflowService.insertColorPickerToForm({
                label: colorPickerLabel,
                inputName: inputFieldName,
                defaultColor,
                form,
            })
            setIsLoading(false)
            showBanner();

        }
    }

    return (

        <>

            <Tabs tabs={[
                {
                    menuItem: 'General',
                    render: () => <General
                        colorPickerLabel={[colorPickerLabel, setColorPickerLabel]}
                        inputFieldName={[inputFieldName, setInputFieldName]}
                        errors={errors}
                    />
                },
                {
                    menuItem: 'Styles',
                    render: () => <Styles
                        lightThemeHoverTextColor={[lightThemeHoverTextColor, setLightThemeHoverTextColor]}
                        lightThemeHoverBackgroundColor={[lightThemeHoverBackgroundColor, setLightThemeHoverBackgroundColor]}
                        darkThemeHoverBackgroundColor={[darkThemeHoverBackgroundColor, setDarkThemeHoverBackgroundColor]}
                        darkThemeHoverTextColor={[darkThemeHoverTextColor, setDarkThemeHoverTextColor]}
                        defaultColor={[defaultColor, setDefaultColor]}
                    />
                },
                {menuItem: 'Conditional logic', render: () => <ConditionalLogic/>}
            ]}>
                <TabHeader title={'Color Picker Input'} description={'An stylish color picker input'}/>
            </Tabs>
            <div className="mt-2 px-[18px]">
                <Banner/>
                <Button isLoading={isLoading} func={handleColorPickerInsert}/>
            </div>

        </>
    )
}