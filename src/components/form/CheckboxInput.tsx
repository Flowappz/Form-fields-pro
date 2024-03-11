type CheckBoxParams = {

    isChecked?: boolean
    label: string
    name: string
    onChange?: (val: boolean) => void;
}
const CheckboxInput = ({
                           label, onChange = () => {
    }, isChecked = false
                       }: CheckBoxParams) => {


    const handleCheckboxChange = () => {
        onChange(!isChecked)
    }

    return (
        <label className='flex items-center cursor-pointer select-none mb-2'>
            <div className='relative'>
                <input
                    type='checkbox'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    name={label}
                    className='sr-only'
                />
                <div
                    className='box mr-1 flex h-3 w-3 items-center justify-center bg-[#2B2B2B] border-[0.75px] border-[#212121]'>
                    {isChecked ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <rect width="12" height="12" rx="1.5" fill="#0073E6"/>
                            <path d="M2.5 6.5L4.5 8.5L9.5 3.5" stroke="#D9D9D9" strokeWidth="1.25"/>
                        </svg>
                        : null}
                </div>
            </div>
            {label ?
                <span className="text-[0.70rem] box-border inline-block text-[#ABABAB] m-0 p-0">{label}</span> : null}
        </label>
    )
}

export default CheckboxInput
