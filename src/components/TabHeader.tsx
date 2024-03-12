type TabHeaderParams = {
    title: string
    description: string
}
export const TabHeader = ({title, description}: TabHeaderParams) => {
    return (
        <div className="leading-[1.15rem] border-b-[1.25px] border-b-[#363636] pb-[0.35rem] mb-2">
            <h3 className="font-semibold text-[#D9D9D9] text-[0.80rem]">{title}</h3>
            <p className="text-[0.70rem]  text-[#ABABAB]">{description}</p>
        </div>
    )
}
