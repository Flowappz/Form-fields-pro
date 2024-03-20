import TextInput from "../../components/form/TextInput.tsx";
import {useEffect, useState} from "react";
import SelectInput from "../../components/form/SelectInput.tsx";


type Options = {
    content: string
    value: string
}
export const ConditionalLogic = () => {

    const [selectedElement, setSelectedElement] = useState<AnyElement | null>(null)
    const [options, setOptions] = useState<Options[]>([])
    const [selectValue, setSelectValue] = useState(options[0]?.value)


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
        <div className='border-b-[#363636] border-b-[1.25px] pb-2'>
            <span className="text-[0.70rem] box-border inline-block text-[#ABABAB] m-0 p-0">label</span>
            <div className='flex items-center gap-2'>
                <SelectInput label={''} selectedValue={selectValue}
                             options={options}
                             onChange={(e) => setSelectValue(e)}/>

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