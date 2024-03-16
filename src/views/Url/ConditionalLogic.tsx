import TextInput from "../../components/form/TextInput.tsx";

export const ConditionalLogic = () => {





    return (
        <div className='border-b-[#363636] border-b-[1.25px] pb-2'>
            <span className="text-[0.70rem] box-border inline-block text-[#ABABAB] m-0 p-0">label</span>
            <div className='flex items-center gap-2'>
                <TextInput/>
                <TextInput/>
                <TextInput/>
                <div
                    className="action-secondary-background boxShadows-action-colored box-border mb-2 px-1 border-[#363636] border-[1px] rounded-[4px] cursor-pointer"
                >
                    <span className="text-[0.70rem] text-[#ABABAB] m-0 p-0 w-full leading-none">and</span>
                </div>
            </div>
            <span className="text-[0.70rem] box-border inline-block text-[#ABABAB] m-0 p-0 w-full">OR</span>
            <button
                className="action-secondary-background boxShadows-action-secondary w-1/3 bg-[#5E5E5E] text-center text-[0.77rem] py-1 border-[#363636] border-[1px] rounded-[4px]"
            >
                Add rule group
            </button>
        </div>
    );
}