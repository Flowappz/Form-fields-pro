import TextInput from "../../components/form/TextInput.tsx";
import {useEffect, useState} from "react";
import SelectInput from "../../components/form/SelectInput.tsx";
import {SwitchInput} from "../../components/form/Switch.tsx";


type Options = {
    content: string
    value: string
}

const logicValue: Options[] = [
    {
        content: 'Has any value',
        value: '!=empty'
    },
    {
        content: 'Has no value',
        value: '==empty'
    }, {
        content: 'Value is equal to',
        value: '==='
    }, {
        content: 'Value is not equal to',
        value: '!='
    }, {
        content: 'Value contains',
        value: '==contains'
    }, {
        content: 'Value is greater than',
        value: '>'
    }, {
        content: 'Value is less than',
        value: '<'
    },
]

export const ConditionalLogic = () => {

    const [isConditionalLogicOn, setIsConditionalLogicOn] = useState<boolean>(false)


    const [selectedElement, setSelectedElement] = useState<AnyElement | null>(null)
    const [options, setOptions] = useState<Options[]>([])
    const [selectValue, setSelectValue] = useState(options[0]?.value)
    const [selectLogic, setSelectLogic] = useState(logicValue[0]?.value)


    const handleSelectedElement = async () => {
        const element = await window._myWebflow.getSelectedElement()
        setSelectedElement(element)

    }

    handleSelectedElement().then()


    useEffect(() => {
        if (selectedElement?.type === 'FormForm' || selectedElement?.type === 'FormWrapper') {

            if (selectedElement?.children) {

                const children = selectedElement.getChildren()

                const getAllInputWrappers = (children: AnyElement[]) => {
                    children.forEach(async (child) => {

                        if (child.type === "DOM") {

                            const styles = await child.getStyles()

                            if (styles.find((s) => s.getName() === 'form-fields-wrapper')) {

                                const children = child.getChildren()
                                const getInputAndLabel = (children: AnyElement[]) => {
                                    children.forEach(async (el) => {
                                        if (el.type === "DOM" && el.getTag() === 'input') {

                                            setOptions((prevOptions) => [
                                                ...prevOptions,
                                                {
                                                    value: el.getAttribute('name') ?? '',
                                                    content: el.getAttribute('data-label') ?? ''
                                                }
                                            ])
                                        }
                                        if (el.children && el.getChildren().length > 0) {
                                            getInputAndLabel(el.getChildren())
                                        }

                                    })
                                }
                                getInputAndLabel(children)
                            }
                        }

                        if (child.children && child.getChildren().length > 0) {
                            getAllInputWrappers(child.getChildren());
                        }
                    });
                };

                getAllInputWrappers(children);
            }
        }
    }, [selectedElement]);

    return (
        <div className='pb-2'>

            <SwitchInput label={'Conditional Logic'} onChange={(val) => setIsConditionalLogicOn(val)}/>


            {isConditionalLogicOn ? <div className='border-b-[#363636] border-b-[1.25px] py-2'>
                <span
                    className="text-[0.70rem] box-border inline-block text-[#ABABAB] m-0 p-0">Show this field if</span>
                <div className='flex items-center gap-2'>
                    <div className='flex-1'>

                        <SelectInput label={''} selectedValue={selectValue}
                                     options={options}
                                     onChange={(e) => setSelectValue(e)}/>

                    </div>
                    <div className='flex-1'>

                        <SelectInput label={''} selectedValue={selectLogic}
                                     options={logicValue}
                                     onChange={(e) => setSelectLogic(e)}/>

                    </div>

                    <div className='flex-1'>
                        <TextInput/>
                    </div>

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
            </div> : null}


        </div>
    );
}