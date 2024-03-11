import {type ReactNode, useState,} from "react";

type Tab = {
    menuItem: string;
    render: () => JSX.Element;
}

type TabsProps = {
    tabs: Tab[];
    children?: ReactNode
}
export const Tabs = ({tabs, children}: TabsProps) => {

    const [activeTab, setActiveTab] = useState<number>(0);

    return (
        <>
            <div className='flex items-center gap-6 border-b-[1.25px] border-b-[#363636] px-[18px]'>
                {tabs.map((menu: Tab, index: number) => {
                    return (
                        <span onClick={() => setActiveTab(index)}
                              className={`${activeTab === index ? 'text-[#D9D9D9]' : 'text-[#ABABAB]'} text-[11px] font-semibold py-3 cursor-pointer`}>{menu.menuItem}</span>
                    )
                })}

            </div>
            <div className='px-[18px] pt-[18px]'> {children}</div>
            <div className='px-[18px]'>
            {tabs[activeTab].render()}
            </div>

        </>

    )

}