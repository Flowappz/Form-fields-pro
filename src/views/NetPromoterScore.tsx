import TextInput from "../components/form/TextInput.tsx";
import {useEffect, useState} from "react";
import {z, ZodError} from "zod";
import {useAppContext} from "../contexts/AppContext.tsx";
import useElementInsertedBanner from "../hooks/useElementInsertedBanner.tsx";
import ColorInput from "../components/form/ColorInput.tsx";
import * as webflowService from './../services/webflowService.ts'


const inputSchema = z.object({
    label: z.string().min(1, "Please enter a label"),
    description: z.string().min(1, "Please enter a description"),
    scoreFieldName: z.string().min(1, 'Please enter a Field name'),
    lowScoreLabel: z.string().min(1, "Please enter Lowest score label"),
    heightScoreLabel: z.string().min(1, "Please enter Highest score label"),
    errorMessage: z.string().min(1, "Please enter a error message"),
    extraFeedbackCollection: z.union([
        z.literal('always'),
        z.literal('never'),
        z.string().regex(/^(10|[0-9])$/),
    ])


})

export default function NetPromoterScore() {

    const {form} = useAppContext()

    const [label, setLabel] = useState('')
    const [description, setDescription] = useState('')
    const [scoreFieldName, setScoreFieldName] = useState('')
    const [lowScoreLabel, setLowScoreLabel] = useState('Not likely at all')
    const [heightScoreLabel, setHeightScoreLabel] = useState('Extremely likely')
    const [errorMessage, setErrorMessage] = useState('This field is required')

    const [extraFeedbackCollection, setExtraFeedbackCollection] = useState('6')
    const [extraFieldLabel, setExtraFieldLabel] = useState('What can we do to improve?')
    const [extraFieldName, setExtraFieldName] = useState('')

    const [lightThemeHoverBackgroundColor, setLightThemeHoverBackgroundColor] =
        useState("rgb(0, 0, 0)");
    const [darkThemeHoverBackgroundColor, setDarkThemeHoverBackgroundColor] =
        useState("rgb(0, 0, 0)");
    const [lightThemeHoverTextColor, setLightThemeHoverTextColor] =
        useState("rgb(255, 255, 255)");
    const [darkThemeHoverTextColor, setDarkThemeHoverTextColor] =
        useState("rgb(255, 255, 255)");


    const [errors, setErrors] = useState<any>({});
    const {Banner, showBanner} = useElementInsertedBanner();


    useEffect(() => {
        setScoreFieldName(label.replace(/[\s,.]+/g, "-").toLowerCase());
        setExtraFieldName(extraFieldLabel.replace(/[\s,.]+/g, "-").toLowerCase());
    }, [label, extraFieldLabel])

    console.log(errors)

    const validateDate = () => {
        try {
            inputSchema.parse({
                label,
                description,
                lowScoreLabel,
                heightScoreLabel,
                errorMessage,
                extraFeedbackCollection,
                scoreFieldName
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


    const handleNetPromoterInsert = async () => {

        if (validateDate() && form) {
            await webflowService.insertNetPromoterScoreToForm({
                form,
                label,
                description,
                scoreFieldName,
                lowScoreLabel,
                heightScoreLabel,
                errorMessage,
                extraFeedbackCollection,
                extraFieldLabel,
                extraFieldName,
                lightThemeHoverBackgroundColor,
                darkThemeHoverBackgroundColor,
                lightThemeHoverTextColor,
                darkThemeHoverTextColor
            })

            showBanner()

        }
    }


    return (
        <div className="h-full px-20 pt-10">
            <div className="leading-[1.15rem] border-b-[1.25px] border-b-[#363636] pb-[0.35rem] mb-2">
                <h3 className="font-semibold text-[#D9D9D9] text-[0.80rem]">Net Promoter Score</h3>
                <p className="text-[0.70rem]  text-[#ABABAB]">Collect feedback from visitors on a scale of 0 - 10</p>
            </div>

            <div className="border-b-[#363636] border-b-[1.25px]">
                <TextInput
                    label="Label"
                    value={label}
                    name="label"
                    placeholder={'Would you recommend us to your friends?'}
                    onChange={setLabel}
                    error={errors.label}
                />
                <TextInput
                    label="Description ( Shows under rating field )"
                    value={description}
                    name="description"
                    placeholder={'Would you recommend us to other people?'}
                    onChange={setDescription}
                    error={errors.description}
                />
                <TextInput
                    label="Score field name"
                    value={scoreFieldName}
                    name="scoreFieldName"
                    onChange={setScoreFieldName}
                    error={errors.scoreFieldName}
                />
                <TextInput
                    label="Lowest score label"
                    value={lowScoreLabel}
                    name="lowScoreLabel"
                    onChange={setLowScoreLabel}
                    error={errors.lowScoreLabel}
                />
                <TextInput
                    label="Highest score label"
                    value={heightScoreLabel}
                    name="heightScoreLabel"
                    onChange={setHeightScoreLabel}
                    error={errors.heightScoreLabel}
                />
                <TextInput
                    label="Error message when no vale is selected"
                    value={errorMessage}
                    name="errorMessage"
                    onChange={setErrorMessage}
                    error={errors.errorMessage}
                />
            </div>

            <div className="border-b-[#363636] border-b-[1.25px]">
                <h3 className="font-semibold text-[#D9D9D9] text-[0.80rem] my-2">Extra feedback collection</h3>

                <span className="text-[0.70rem] box-border inline-block text-[#ABABAB] m-0 p-0">Show text input field to collect feedback if score is less than:</span>
                <input
                    type={'text'}
                    placeholder={'type here...'}
                    name={'extraFeedbackCollection'}
                    value={extraFeedbackCollection}
                    onChange={(e) => setExtraFeedbackCollection(e.target.value)}
                    className={`input-inner-shadow rounded-[4px] bg-[#00000015] border-[1px] shadow-xl text-[#f5f5f5] placeholder:text-[#ffffff66] w-full px-[0.3rem] text-[0.7rem] leading-[1.1rem] p-1 focus:outline-none ${errors.extraFeedbackCollection ? 'border-[#E42F3A]' : "border-[#ffffff24]"}`}
                />

                <p className="text-[0.70rem]  text-[#ABABAB] mt-1 mb-2">Allowed values: Number: `0 - 10` || `always` ||
                    `never`</p>
                <div className={extraFeedbackCollection === 'never' ? 'hidden' : ''}>
                    <TextInput
                        label="Field label"
                        value={extraFieldLabel}
                        name="extraFieldLabel"
                        onChange={setExtraFieldLabel}
                    /><TextInput
                    label="Field name"
                    value={extraFieldName}
                    name="extraFieldName"
                    onChange={setExtraFieldName}
                />
                </div>


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
                    onClick={handleNetPromoterInsert}
                >
                    Insert field
                </button>
            </div>
        </div>
    )
}