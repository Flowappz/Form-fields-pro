import CloseDefaultIcon from "../../icons/CloseDefault.tsx";
import {FormEvent, useState} from "react";
import {z, ZodError} from "zod";
import {CheckMarkIcon} from "../../icons/CheckMarkIcon.tsx";


const messageSchema = z.object({
    message: z.string().min(1, 'Feedback should not be empty')
})

type UserFeedbackParams = {
    isFeedbackPopupOpen: boolean
    setIsFeedbackPopupOpen: (val: boolean) => void

}
export const UserFeedback = ({isFeedbackPopupOpen, setIsFeedbackPopupOpen}: UserFeedbackParams) => {

    const [message, setMessage] = useState<string>("")

    const [errors, setErrors] = useState<any>({})

    const [isSuccess, setIsSuccess] = useState<boolean>(false)


    const validate = () => {
        try {
            messageSchema.parse({
                message
            })

            setErrors({})

            return true
        } catch (err) {
            if (err instanceof ZodError) {

                const errorsByField: { [x: string]: string } = {};

                for (const issue of err.errors) {
                    const {path, message} = issue;
                    const field = path.length === 1 ? path[0] : path.join(".");

                    errorsByField[field] = message;
                }
                setErrors(errorsByField)
            }
        }
    }

    const handleFeedbackSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (validate()) {
            console.log(message)
            setMessage('')
            setIsSuccess(true)
        }

    }

    return (
        <div
            className={`${isFeedbackPopupOpen ? '' : 'hidden'} w-full h-full bg-[#1E1E1E] fixed z-50 flex items-center justify-center`}>
            <button
                onClick={() => setIsFeedbackPopupOpen(false)}
                className='fixed top-[13px] right-[13px]'
            >
                <CloseDefaultIcon/>
            </button>
            <div className='max-w-[300px] w-full'>
                <h3 className="font-semibold text-[0.82rem] text-center mb-[10px]">Help us improve “Form fields
                    pro” </h3>

                {isSuccess ? <div className='w-full'>
                    <div className={'w-[240px] p-2 relative flex items-start gap-2 rounded-[4px] bg-[#007A41] mx-auto'}>
                        <button className={'cursor-auto'}><CheckMarkIcon/></button>
                        <div className={'flex flex-col gap-1'}>
                            <h5 className={'text-[11.5px] font-[600] leading-[16px] tracking-small-letter-spacing'}>Success</h5>
                            <span
                                className={`text-text2 w-[178px]  text-[11.5px] leading-[16px] tracking-small-letter-spacing`}>Thank you for your valuable feedback. We will use this to improve the app for everyone.</span>

                        </div>
                    </div>
                    <button
                        onClick={() => setIsSuccess(false)}
                        className="bg-transparent w-[80px] mx-auto mt-5 flex items-center justify-center gap-1 text-center text-[0.77rem] py-1 px-5 border-[#363636] border-[1px] rounded-[4px]"
                        type='button'>Ok
                    </button>

                </div> : <form className='w-full' onSubmit={(e) => handleFeedbackSubmit(e)}>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                              placeholder='Your feedback...'
                              className='w-full h-[210px] resize-none input-inner-shadow rounded-[4px] bg-[#00000015] border-[1px] border-[#ffffff24] shadow-xl text-[#D9D9D9] placeholder:text-[#ffffff66] px-[0.3rem] text-[0.7rem] leading-[1.1rem] p-1 focus:outline-none'></textarea>
                    {errors.message &&
                        <span className="text-red-400 text-[0.74rem]">{errors.message}</span>}
                    <div className='w-full flex items-center justify-center mt-5 gap-5'>
                        <button
                            className="bg-transparent flex items-center justify-center gap-1 text-center text-[0.77rem] py-1 px-5 border-[#363636] border-[1px] rounded-[4px]"
                            type='button'>Cancel
                        </button>
                        <button
                            className="boxShadows-action-colored bg-[#0073E6] flex items-center justify-center gap-1 text-center text-[0.77rem] py-1 px-5 border-[#363636] border-[1px] rounded-[4px]"
                            type='submit'>Submit
                        </button>
                    </div>
                </form>}


            </div>
        </div>
    )
}