import * as Switch from '@radix-ui/react-switch';

type SwitchParams = {
    label?: string
    onChange: (val: boolean) => void
}
export const SwitchInput = ({label , onChange}: SwitchParams) => {
    return (
        <div className='flex items-center'>

            <Switch.Root
                onCheckedChange={onChange}
                className="w-8 h-5 bg-[#FFFFFF2E] rounded-[13px] ease-in-out duration-100 p-[2px] relative [&[data-state='checked']]:bg-[#006ACC] mr-2"
                id="airplane-mode">
                <Switch.Thumb
                    className="block w-4 h-4 bg-white rounded-full ease-in-out duration-100 [&[data-state='checked']]:translate-x-[12px]"/>
            </Switch.Root>
            <label className="text-[0.70rem] box-border inline-block text-[#ABABAB] m-0 p-0" htmlFor="airplane-mode">
                {label}
            </label>
        </div>
    )
}