import {Dispatch, SetStateAction, useMemo} from "react";
import TextInput from "../../components/form/TextInput.tsx";
import CheckboxInput from "../../components/form/CheckboxInput.tsx";
import RemovableTextInput from "../../components/form/RemovableTextInput.tsx";
import {DndContext, DragOverEvent } from "@dnd-kit/core";
import {arrayMove, SortableContext} from "@dnd-kit/sortable";

export type QuestionAndAnswer = {
    id: string;
    value: string;
}

type GeneralParams = {
    likertScaleLabel: [string, Dispatch<SetStateAction<string>>];
    likertScaleName: [string, Dispatch<SetStateAction<string>>];
    likertScaleRequired: [boolean, Dispatch<SetStateAction<boolean>>];
    likertScaleAutofocus: [boolean, Dispatch<SetStateAction<boolean>>];
    likertScaleMultipleResponses: [boolean, Dispatch<SetStateAction<boolean>>];
    likertScaleQuestions: [QuestionAndAnswer[], Dispatch<SetStateAction<QuestionAndAnswer[]>>];
    likertScaleAnswers: [QuestionAndAnswer[], Dispatch<SetStateAction<QuestionAndAnswer[]>>];
    errors: any
}


export const General = ({
                            likertScaleLabel,
                            likertScaleName,
                            likertScaleRequired,
                            likertScaleAutofocus,
                            likertScaleMultipleResponses,
                            likertScaleQuestions,
                            likertScaleAnswers,
                            errors
                        }: GeneralParams) => {

    const [label, setLabel] = likertScaleLabel
    const [name, setName] = likertScaleName

    const [required, setRequired] = likertScaleRequired
    const [autofocus, setAutofocus] = likertScaleAutofocus
    const [multipleResponses, setMultipleResponses] = likertScaleMultipleResponses

    const [questions, setQuestions] = likertScaleQuestions
    const [answers, setAnswers] = likertScaleAnswers

    // Question
    const handleQuestionItemChange = (idx: number, val: string) => {
        const items = [...questions];
        items[idx].value = val;

        setQuestions(items);
    };
    const handleQuestionItemRemove = (idx: number) => {
        const items = questions.filter((item, i) => {
            item;
            return i !== idx;
        });
        setQuestions(items);
    };

    // Answers
    const handleAnswerItemChange = (idx: number, val: string) => {
        const items = [...answers];
        items[idx].value = val;

        setAnswers(items);
    };
    const handleAnswerItemRemove = (idx: number) => {
        const items = answers.filter((item, i) => {
            item;
            return i !== idx;
        });
        setAnswers(items);
    };

    // Question and Answer make sortable
    const questionIds = useMemo(() => questions.map((item) => item.id), [questions])
    const answerIds = useMemo(() => answers.map((item) => item.id), [answers])

    const onDragOver = (e: DragOverEvent) => {
        const {active, over} = e;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        // Question
        const isActiveQuestion = active.data.current?.type === "Question";
        const isOverQuestion = over.data.current?.type === "Question";

        if (isActiveQuestion && isOverQuestion) {
            setQuestions((questions) => {

                const activeIndex = questions.findIndex((q) => q.id === activeId);
                const overIndex = questions.findIndex((q) => q.id === overId);

                return arrayMove(questions, activeIndex, overIndex)
            })

        }

        // Answer
        const isActiveAnswer = active.data.current?.type === "Answer";
        const isOverAnswer = over.data.current?.type === "Answer";

        if (isActiveAnswer && isOverAnswer) {
            setAnswers((answers) => {

                const activeIndex = answers.findIndex((ans) => ans.id === activeId);
                const overIndex = answers.findIndex((ans) => ans.id === overId);

                return arrayMove(answers, activeIndex, overIndex)
            })

        }

    }



    return (
        <DndContext  onDragOver={onDragOver} >
            <div className="border-b-[#363636] border-b-[1.25px]">

                <TextInput
                    label="Label"
                    value={label}
                    name="label"
                    onChange={setLabel}
                    error={errors.label}
                />
                <TextInput
                    label="Name"
                    name="name"
                    value={name}
                    onChange={setName}
                    error={errors.name}
                />
            </div>

            {/*Question*/}
            <div className="border-b-[#363636] border-b-[1.25px]">

                <h3 className="font-semibold text-[#D9D9D9] text-[0.80rem] my-2">Questions</h3>

                <SortableContext items={questionIds}>
                    {questions.map((item, idx: number) => (
                        <RemovableTextInput
                            itemType={'Question'}
                            item={item}
                            key={item.id}
                            value={item.value}
                            onChange={(val) => handleQuestionItemChange(idx, val)}
                            onRemove={() => handleQuestionItemRemove(idx)}
                            error={errors[`questions.${idx}`]}
                            placeholder={`Question ${idx + 1}`}
                        />
                    ))}
                    <button
                        className="boxShadows-action-secondary action-secondary-background w-full bg-[#5E5E5E] text-center text-[0.77rem] py-1 border-[#363636] border-[1px] rounded-[4px]"
                        onClick={() => setQuestions([...questions, {
                            id: `${Date.now()}`,
                            value: ''
                        }])}
                    >
                        Add question
                    </button>
                    {errors.questions &&
                        <span className="text-red-400 text-[0.74rem]">{errors.questions}</span>}
                </SortableContext>
            </div>

            {/*Answer*/}
            <div className="border-b-[#363636] border-b-[1.25px]">

                <h3 className="font-semibold text-[#D9D9D9] text-[0.80rem] my-2">Answers</h3>

                <SortableContext items={answerIds}>
                    {answers.map((item, idx: number) => (
                        <RemovableTextInput
                            itemType={'Answer'}
                            item={item}
                            key={item.id}
                            value={item.value}
                            onChange={(val) => handleAnswerItemChange(idx, val)}
                            onRemove={() => handleAnswerItemRemove(idx)}
                            error={errors[`answers.${idx}`]}
                            placeholder={`Answer ${idx + 1}`}
                        />
                    ))}
                    <button
                        className="boxShadows-action-secondary action-secondary-background w-full bg-[#5E5E5E] text-center text-[0.77rem] py-1 border-[#363636] border-[1px] rounded-[4px]"
                        onClick={() => setAnswers([...answers, {
                            id: `${Date.now()}`,
                            value: ''
                        }])}
                    >
                        Add answer
                    </button>
                    {errors.answers &&
                        <span className="text-red-400 text-[0.74rem]">{errors.answers}</span>}
                </SortableContext>
            </div>

            <div className="border-b-[#363636] border-b-[1.25px] mt-2">

                <CheckboxInput onChange={setMultipleResponses} isChecked={multipleResponses}
                               label={'Allow multiple responses per row'} name={'multipleResponses'}/>
                <CheckboxInput onChange={setRequired} isChecked={required} label={'Required'} name={'required'}/>
                <CheckboxInput onChange={setAutofocus} isChecked={autofocus} label={'Autofocus'} name={'autofocus'}/>
            </div>
        </DndContext>
    )
}