import TextInput from "../components/form/TextInput.tsx";
import {useEffect, useState} from "react";
import {z, ZodError} from "zod";
import useElementInsertedBanner from "../hooks/useElementInsertedBanner.tsx";
import {useAppContext} from "../contexts/AppContext.tsx";
import * as webflowService from "../services/webflowService";

const inputSchema = z.object({
    emailLabel: z.string().min(1, "Please enter a label"),
    emailFieldName: z.string().min(1, "Please enter the input name"),
})

export default function AdvancedEmailField() {

    const {form} = useAppContext();

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
            await webflowService.insertEmailToForm({
                form,
                emailLabel,
                emailFieldName,
                placeholder,
                emptyErrorMessage,
                invalidErrorMessage
            })
            showBanner();
        }
    }

    return (
        <div className="h-full px-20 pt-10">
            <div className="leading-[1.15rem] border-b-[1.25px] border-b-[#363636] pb-[0.35rem] mb-2">
                <h3 className="font-semibold text-[#D9D9D9] text-[0.80rem]">Email</h3>
                <p className="text-[0.70rem]  text-[#ABABAB]">Email field with custom error message</p>
            </div>
            <div className="border-b-[#363636] border-b-[1.25px]">
                <TextInput
                    label="Label"
                    value={emailLabel}
                    name="label"
                    onChange={setEmailLabel}
                    error={errors.emailLabel}
                />
                <TextInput
                    label="Field name"
                    name="input"
                    value={emailFieldName}
                    onChange={setEmailFieldName}
                    error={errors.emailFieldName}
                />
                <TextInput
                    label="Placeholder"
                    name="placeholder"
                    value={placeholder}
                    onChange={setPlaceholder}
                />
                <TextInput
                    label="Error message when field is empty"
                    name="emptyerrormessage"
                    value={emptyErrorMessage}
                    onChange={setEmptyErrorMessage}
                />
                <TextInput
                    label="Error message when email is invalid"
                    name="emptyerrormessage"
                    value={invalidErrorMessage}
                    onChange={setInvalidErrorMessage}
                />
            </div>
            <div className="mt-2">
                <Banner/>
                <button
                    className="boxShadows-action-colored mb-[60px] w-full bg-[#0073E6] text-center text-[0.77rem] py-1 border-[#363636] border-[1px] rounded-[4px]"
                    onClick={handleEmailInsert}
                >
                    Insert field
                </button>
            </div>
        </div>
    )
}