import {useState} from "react";
import {General} from "./General.tsx";
import {Styles} from "./Styles.tsx";
import {ConditionalLogic} from "./ConditionalLogic.tsx";
import useElementInsertedBanner from "../../hooks/useElementInsertedBanner.tsx";
import {useAppContext} from "../../contexts/AppContext.tsx";
import {z, ZodError} from "zod";
import * as webflowService from "./../../services/webflowService.ts"
import {Tabs} from "../../components/Tabs.tsx";
import {Button} from "../../components/Button.tsx";
import {TabHeader} from "../../components/TabHeader.tsx";

const inputSchema = z.object({
    label: z.string().min(1, "Please enter a label"),
    inputFieldName: z.string().min(1, "Please enter the input name"),
    placeholder: z.string().min(1, "Please enter the input placeholder"),

});

export default function Url() {

    const {form} = useAppContext()
    const [isLoading, setIsLoading] = useState(false)

    const {Banner, showBanner} = useElementInsertedBanner();

    const [label, setLabel] = useState("");
    const [inputFieldName, setInputFieldName] = useState(label.replace(/\s+/g, '-').toLowerCase());
    const [placeholder, setPlaceholder] = useState("");
    const [required, setRequired] = useState(true)
    const [autofocus, setAutofocus] = useState(false)

    const [errors, setErrors] = useState<any>({});

    const validateDate = () => {
        try {
            inputSchema.parse({
                label,
                inputFieldName,
                placeholder
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

    const handleUrlInsert = async () => {
        if (validateDate() && form) {
            setIsLoading(true)
            await webflowService.insertUrlFieldToForm({
                label,
                inputFieldName,
                placeholder,
                required,
                autofocus,
                form,

            })
            setIsLoading(false)
            showBanner()
        }
    }

    return (
        <>

            <Tabs tabs={[
                {
                    menuItem: "General", render: () => <General label={[label, setLabel]}
                                                                inputFieldName={[inputFieldName, setInputFieldName]}
                                                                placeholder={[placeholder, setPlaceholder]}
                                                                required={[required, setRequired]}
                                                                autofocus={[autofocus, setAutofocus]}
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
                <Button isLoading={isLoading} func={handleUrlInsert}/>
            </div>

        </>
    )

}