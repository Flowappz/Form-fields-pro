
import {useEffect, useState} from "react";
import {z, ZodError} from "zod";
import {useAppContext} from "../../contexts/AppContext.tsx";
import useElementInsertedBanner from "../../hooks/useElementInsertedBanner.tsx";
import * as webflowService from "../../services/webflowService.ts";
import {Tabs} from "../../components/Tabs.tsx";
import {TabHeader} from "../../components/TabHeader.tsx";
import {Button} from "../../components/Button.tsx";
import {General} from "./General.tsx";
import {Styles} from "./Styles.tsx";
import {ConditionalLogic} from "./ConditionalLogic.tsx";


const inputSchema = z.object({
    numberInputLabel: z.string().min(1, "Please enter a label"),
    inputFieldName: z.string().min(1, "Please enter the input name"),
})


export default function PhoneNumberInput() {

    const {form} = useAppContext();
    const [isLoading, setIsLoading] = useState(false)

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
        setInputFieldName(numberInputLabel.replace(/[\s,.]+/g, "-").toLowerCase());
    }, [numberInputLabel])

    const handleNumberInputInsert = async () => {
        if (validateDate() && form) {
            setIsLoading(true)
            await webflowService.insertNumberInputToForm({
                form,
                label: numberInputLabel,
                inputName: inputFieldName,
                placeholderText: inputFieldPlaceholder
            })
            setIsLoading(false)
            showBanner();
        }
    };


    return (
        <>
            <Tabs tabs={[
                {
                    menuItem: 'General',
                    render: () => <General

                        numberInputLabel={[numberInputLabel, setNumberInputLabel]}
                        inputFieldName={[inputFieldName, setInputFieldName]}
                        inputFieldPlaceholder={[inputFieldPlaceholder, setInputFieldPlaceholder]}
                        errors={errors}
                    />
                },
                {
                    menuItem: 'Styles',
                    render: () => <Styles
                        lightThemeHoverTextColor={[lightThemeHoverTextColor, setLightThemeHoverTextColor]}
                        lightThemeHoverBackgroundColor={[lightThemeHoverBackgroundColor, setLightThemeHoverBackgroundColor]}
                        darkThemeHoverTextColor={[darkThemeHoverTextColor, setDarkThemeHoverTextColor]}
                        darkThemeHoverBackgroundColor={[darkThemeHoverBackgroundColor, setDarkThemeHoverBackgroundColor]}
                    />
                },
                {menuItem: 'Conditional logic', render: () => <ConditionalLogic/>},
            ]}>
                <TabHeader title={'Phone Number Input'} description={'Phone Number Input With Country Code'}/>
            </Tabs>
            <div className="mt-2 px-[18px]">
                <Banner/>
                <Button isLoading={isLoading} func={handleNumberInputInsert}/>
            </div>
        </>
    )
}