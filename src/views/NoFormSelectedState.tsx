import {useAppContext} from "../contexts/AppContext";
import PinIcon from "../icons/Pin";

export default function NoFormSelectedState() {
    const {form} = useAppContext();

    if (form) return null;

    return (
        <div className="w-full bg-[#2e2e2e] h-full flex items-center justify-center absolute top-0 left-0 z-10">
            <div className="w-3/4 flex flex-col items-center p-[0.75rem] pb-[1.3rem] rounded">
                <PinIcon color="white"/>

                <h4 className="text-center text-[#D9D9D9] font-bold text-[0.82rem] mt-[0.2rem] leading-5">Please select
                    a form first</h4>
                <p className="text-[0.77rem] text-[#ABABAB] font-light text-center">
                    To use a form field, you must select a form in the designer console.
                </p>
            </div>
        </div>
    );
}
