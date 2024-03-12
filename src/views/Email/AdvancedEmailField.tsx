import {useEffect, useState} from "react";
import {z, ZodError} from "zod";
import useElementInsertedBanner from "../../hooks/useElementInsertedBanner.tsx";
import {useAppContext} from "../../contexts/AppContext.tsx";
import * as webflowService from "../../services/webflowService.ts";
import {Button} from "../../components/Button.tsx";
import {Tabs} from "../../components/Tabs.tsx";
import {TabHeader} from "../../components/TabHeader.tsx";
import {ConditionalLogic} from "./ConditionalLogic.tsx";
import {Styles} from "./Styles.tsx";
import {General} from "./General.tsx";

const inputSchema = z.object({
    emailLabel: z.string().min(1, "Please enter a label"),
    emailFieldName: z.string().min(1, "Please enter the input name"),
})

export default function AdvancedEmailField() {

    const {form} = useAppContext();
    const [isLoading, setIsLoading] = useState(false)

    const [emailLabel, setEmailLabel] = useState('')
    const [emailFieldName, setEmailFieldName] = useState('')
    const [placeholder, setPlaceholder] = useState('name@domain.com')
    const [emptyErrorMessage, setEmptyErrorMessage] = useState('This field is required')
    const [invalidErrorMessage, setInvalidErrorMessage] = useState('Please enter a valid email address')

    const [errors, setErrors] = useState<any>({});
    const {Banner, showBanner} = useElementInsertedBanner();

    const validateDate = () => {
        try {
            inputSchema.parse({
                emailLabel,
                emailFieldName,

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
        setEmailFieldName(emailLabel.replace(/[\s,.]+/g, "-").toLowerCase());
    }, [emailLabel])


    const handleEmailInsert = async () => {
        if (validateDate() && form) {
            setIsLoading(true)
            await webflowService.insertEmailToForm({
                form,
                emailLabel,
                emailFieldName,
                placeholder,
                emptyErrorMessage,
                invalidErrorMessage
            })
            setIsLoading(false)
            showBanner();
        }
    }

    return (

        <>

            <Tabs tabs={[
                {
                    menuItem: "General", render: () => <General
                        label={[emailLabel, setEmailLabel]}
                        inputFieldName={[emailFieldName, setEmailFieldName]}
                        placeholder={[placeholder, setPlaceholder]}
                        invalidErrorMessage={[emptyErrorMessage, setEmptyErrorMessage]}
                        emptyErrorMessage={[invalidErrorMessage, setInvalidErrorMessage]}
                        errors={errors}

                    />
                },
                {menuItem: "Styles", render: () => <Styles/>},
                {menuItem: "Conditional logic", render: () => <ConditionalLogic/>},
            ]}>

                <TabHeader title={'URL'} description={'Collect website url with validation'}/>

            </Tabs>

            <div className="mt-2 px-[18px]">
                <Banner/>
                <Button isLoading={isLoading} func={handleEmailInsert}/>
            </div>

        </>

    )
}