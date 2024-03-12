
import {useEffect, useState} from "react";
import {z, ZodError} from "zod";
import useElementInsertedBanner from "../../hooks/useElementInsertedBanner.tsx";
import * as webflowService from "../../services/webflowService.ts";
import {useAppContext} from "../../contexts/AppContext.tsx";
import {Button} from "../../components/Button.tsx";
import {Tabs} from "../../components/Tabs.tsx";
import {TabHeader} from "../../components/TabHeader.tsx";
import {General} from "./General.tsx";
import {Styles} from "./Styles.tsx";
import {ConditionalLogic} from "./ConditionalLogic.tsx";


const inputSchema = z.object({
    fileInputLabel: z.string().min(1, "Please enter a label"),
    inputFieldName: z.string().min(1, "Please enter the input name"),
})

export default function FileUploader() {


    const {form} = useAppContext();
    const [isLoading, setIsLoading] = useState(false)

    const [fileInputLabel, setFileInputLabel] = useState("");
    const [inputFieldName, setInputFieldName] = useState("");
    const [acceptedFiles, setAcceptedFiles] = useState("")
    const [maxFileSize, setMaxFileSize] = useState("")
    const [maxFiles, setMaxFiles] = useState("")
    const [borderColor, setBorderColor] = useState('rgb(0, 0, 0)')
    const [borderStyle, setBorderStyle] = useState('solid')

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

            setIsLoading(true)
            await webflowService.insertFileUploaderToForm({
                form,
                label: fileInputLabel,
                inputName: inputFieldName,
                acceptedFiles,
                maxFileSize,
                maxFiles,
                borderColor,
                borderStyle,
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
                        inputFieldName={[inputFieldName, setInputFieldName]}
                        fileInputLabel={[fileInputLabel, setFileInputLabel]}
                        acceptedFiles={[acceptedFiles, setAcceptedFiles]}
                        maxFileSize={[maxFileSize, setMaxFileSize]}
                        maxFiles={[maxFiles, setMaxFiles]}
                        errors={errors}

                    />
                },
                {
                    menuItem: 'Styles',
                    render: () => <Styles
                        lightThemeHoverTextColor={[lightThemeHoverBackgroundColor, setLightThemeHoverBackgroundColor]}
                        lightThemeHoverBackgroundColor={[darkThemeHoverBackgroundColor, setDarkThemeHoverBackgroundColor]}
                        darkThemeHoverTextColor={[lightThemeHoverTextColor, setLightThemeHoverTextColor]}
                        darkThemeHoverBackgroundColor={[darkThemeHoverTextColor, setDarkThemeHoverTextColor]}
                        borderColor={[borderColor, setBorderColor]}
                        borderStyle={[borderStyle, setBorderStyle]}
                    />
                },
                {menuItem: 'Conditional logic', render: () => <ConditionalLogic/>},
            ]}>
                <TabHeader title={'File Upload field'}
                           description={'Custom file upload field with customization options'}/>
            </Tabs>
            <div className="mt-2 px-[18px]">
                <Banner/>
                <Button isLoading={isLoading} func={handleFileInputInsert}/>
            </div>
        </>
    )
}