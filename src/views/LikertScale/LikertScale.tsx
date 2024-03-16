import {Tabs} from "../../components/Tabs.tsx";
import {TabHeader} from "../../components/TabHeader.tsx";
import {Button} from "../../components/Button.tsx";
import {useEffect, useState} from "react";
import useElementInsertedBanner from "../../hooks/useElementInsertedBanner.tsx";
import {General, QuestionAndAnswer} from "./General.tsx";
import {z, ZodError} from "zod";
import {useAppContext} from "../../contexts/AppContext.tsx";


const inputSchema = z.object({
    label: z.string().min(1, "Please enter a label"),
    name: z.string().min(1, "Please enter a name"),
    questions: z
        .string()
        .min(1, "Please enter question")
        .array()
        .min(1, "Please add at least one question to select from!"),
    answers: z
        .string()
        .min(1, "Please enter answer")
        .array()
        .min(1, "Please add at least one answer to select from!"),
})

const defaultAnswer = [
    'Strongly Disagree',
    'Disagree',
    'Neutral',
    'Agree',
    'Strongly Agree'
]

export const LikertScale = () => {

    const {form} = useAppContext()

    const [isLoading, setIsLoading] = useState(false)

    const [label, setLabel] = useState('')
    const [name, setName] = useState('')


    const [questions, setQuestions] = useState<QuestionAndAnswer[]>(
        new Array(1).fill("").map((value) => ({id: `${Date.now()}-form-field-pro-` + Math.random(), value}))
    )
    const [answers, setAnswers] = useState<QuestionAndAnswer[]>(
        defaultAnswer.map((value) => ({id: `${Date.now()}-form-field-pro-` + Math.random(), value}))
    )


    const [required, setRequired] = useState(true)
    const [autofocus, setAutofocus] = useState(false)
    const [multipleResponses, setMultipleResponses] = useState(false)

    const {Banner, showBanner} = useElementInsertedBanner();
    const [errors, setErrors] = useState<any>({});


    const validateDate = () => {
        try {
            inputSchema.parse({
                label,
                name,
                questions: questions.map((i) => i.value),
                answers: answers.map((i) => i.value),

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
        setName(label.replace(/[\s,.]+/g, "-").toLowerCase());
    }, [label])

    const handleLikertScaleInsert = async () => {

        if (validateDate() && form) {
            setIsLoading(true)
            showBanner()
            setIsLoading(false)
        }
    }

    return (
        <>

            <Tabs tabs={[
                {
                    menuItem: 'General',
                    render: () => <General
                        likertScaleLabel={[label, setLabel]}
                        likertScaleName={[name, setName]}
                        likertScaleRequired={[required, setRequired]}
                        likertScaleAutofocus={[autofocus, setAutofocus]}
                        likertScaleMultipleResponses={[multipleResponses, setMultipleResponses]}
                        likertScaleQuestions={[questions, setQuestions]}
                        likertScaleAnswers={[answers, setAnswers]}
                        errors={errors}
                    />
                },
                {menuItem: 'Styles', render: () => <p>Styles</p>},
                {menuItem: 'Conditional logic', render: () => <p>Conditional logic</p>},
            ]}>
                <TabHeader title={'Likert Scale Field'} description={'Let your users choose from a scale of options'}/>
            </Tabs>

            <div className="mt-2 px-[18px]">
                <Banner/>
                <Button func={handleLikertScaleInsert} isLoading={isLoading}/>
            </div>

        </>
    )
}