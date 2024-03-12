import TextInput from "../../components/form/TextInput.tsx";
import {Dispatch, SetStateAction} from "react";

type GeneralParams = {
    label: [string, Dispatch<SetStateAction<string>>];
    description: [string, Dispatch<SetStateAction<string>>];
    scoreFieldName: [string, Dispatch<SetStateAction<string>>];
    lowScoreLabel: [string, Dispatch<SetStateAction<string>>];
    heightScoreLabel: [string, Dispatch<SetStateAction<string>>];
    errorMessage: [string, Dispatch<SetStateAction<string>>];
    extraFeedbackCollection: [string, Dispatch<SetStateAction<string>>];
    extraFieldLabel: [string, Dispatch<SetStateAction<string>>];
    extraFieldName: [string, Dispatch<SetStateAction<string>>];
    errors: any
}
export const General = ({
                            label,
                            extraFieldLabel,
                            extraFieldName,
                            scoreFieldName,
                            lowScoreLabel,
                            heightScoreLabel,
                            errorMessage,
                            extraFeedbackCollection,
                            description,
                            errors
                        }: GeneralParams) => {

    const [inputLabel, setInputLabel] = label
    const [inputDescription, setInputDescription] = description
    const [inputScoreFieldName, setInputScoreFieldName] = scoreFieldName
    const [inputLowScoreLabel, setInputLowScoreLabel] = lowScoreLabel
    const [inputHeightScoreLabel, setInputHeightScoreLabel] = heightScoreLabel
    const [inputErrorMessage, setInputErrorMessage] = errorMessage
    const [inputExtraFeedbackCollection, setInputExtraFeedbackCollection] = extraFeedbackCollection
    const [inputExtraFieldLabel, setInputExtraFieldLabel] = extraFieldLabel
    const [inputExtraFieldName, setInputExtraFieldName] = extraFieldName


    return (


        <>
            <div className="border-b-[#363636] border-b-[1.25px]">
                <TextInput
                    label="Label"
                    value={inputLabel}
                    name="label"
                    placeholder={'Would you recommend us to your friends?'}
                    onChange={setInputLabel}
                    error={errors.label}
                />
                <TextInput
                    label="Description ( Shows under rating field )"
                    value={inputDescription}
                    name="description"
                    placeholder={'Would you recommend us to other people?'}
                    onChange={setInputDescription}
                    error={errors.description}
                />
                <TextInput
                    label="Score field name"
                    value={inputScoreFieldName}
                    name="scoreFieldName"
                    onChange={setInputScoreFieldName}
                    error={errors.scoreFieldName}
                />
                <TextInput
                    label="Lowest score label"
                    value={inputLowScoreLabel}
                    name="lowScoreLabel"
                    onChange={setInputLowScoreLabel}
                    error={errors.lowScoreLabel}
                />
                <TextInput
                    label="Highest score label"
                    value={inputHeightScoreLabel}
                    name="heightScoreLabel"
                    onChange={setInputHeightScoreLabel}
                    error={errors.heightScoreLabel}
                />
                <TextInput
                    label="Error message when no vale is selected"
                    value={inputErrorMessage}
                    name="errorMessage"
                    onChange={setInputErrorMessage}
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
                    value={inputExtraFeedbackCollection}
                    onChange={(e) => setInputExtraFeedbackCollection(e.target.value)}
                    className={`input-inner-shadow rounded-[4px] bg-[#00000015] border-[1px] shadow-xl text-[#f5f5f5] placeholder:text-[#ffffff66] w-full px-[0.3rem] text-[0.7rem] leading-[1.1rem] p-1 focus:outline-none ${errors.extraFeedbackCollection ? 'border-[#E42F3A]' : "border-[#ffffff24]"}`}
                />

                <p className="text-[0.70rem]  text-[#ABABAB] mt-1 mb-2">Allowed values: Number: `0 - 10` || `always` ||
                    `never`</p>
                <div className={inputExtraFeedbackCollection === 'never' ? 'hidden' : ''}>
                    <TextInput
                        label="Field label"
                        value={inputExtraFieldLabel}
                        name="extraFieldLabel"
                        onChange={setInputExtraFieldLabel}
                    />
                    <TextInput
                        label="Field name"
                        value={inputExtraFieldName}
                        name="extraFieldName"
                        onChange={setInputExtraFieldName}
                    />
                </div>

            </div>
        </>


    )
}