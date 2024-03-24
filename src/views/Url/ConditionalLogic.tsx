import TextInput from "../../components/form/TextInput.tsx";
import {useEffect, useState} from "react";
import SelectInput from "../../components/form/SelectInput.tsx";
import {SwitchInput} from "../../components/form/Switch.tsx";
import CloseDefaultIcon from "../../icons/CloseDefault.tsx";


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

export type RuleItem = {
    inputType: string
    logic: string
    value: any
}

export const ConditionalLogic = () => {

    const [isConditionalLogicOn, setIsConditionalLogicOn] = useState<boolean>(false)

    const [selectedElement, setSelectedElement] = useState<AnyElement | null>(null)
    const [options, setOptions] = useState<Options[]>([])

    // const [label, setLabel] = useState<string>('')

    // Get input info
    const handleSelectedElement = async () => {
        const element = await window._myWebflow.getSelectedElement()
        setSelectedElement(element)

    }

    handleSelectedElement().then()

    let label: string = ''
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
                                        // console.log(el.getTag)
                                        if (el.type === "String" ) {

                                            label = el.getText()

                                        }

                                        if (el.type === "DOM" && el.getTag() === 'input') {
                                            if (label !== '') {
                                                setOptions((prevOptions) => [
                                                    ...prevOptions,
                                                    {
                                                        value: el.getAttribute('name') ?? '',
                                                        content: label ?? ''
                                                    }
                                                ])
                                            }

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
    }, [label, selectedElement]);


    const [rules, setRules] = useState<RuleItem[]>([
        {
            inputType: options[0]?.value,
            logic: logicValue[0]?.value,
            value: ''
        },
    ])
    const [ruleGroup, setRuleGroup] = useState<RuleItem[]>([])


    useEffect(() => {
        setRules([
            {
                inputType: options[0]?.value,
                logic: logicValue[0]?.value,
                value: ''
            },
        ])
    }, [options]);


    const handleChangeValue = (idx: number, key: keyof RuleItem, value: string, type: 'rule' | 'ruleGroup') => {

        if (type === 'rule') {
            const newRules = [...rules];
            newRules[idx] = {...newRules[idx], [key]: value};
            setRules(newRules)

        } else {
            const newRuleGroup = [...ruleGroup];
            newRuleGroup[idx] = {...newRuleGroup[idx], [key]: value};
            setRuleGroup(newRuleGroup)

        }


    }


    const handleRemove = (idx: number, type: 'rule' | 'ruleGroup') => {

        if (type === 'rule') {
            const newRoles = rules.filter((rule, i) => {
                rule;
                return i !== idx;
            })
            setRules(newRoles)
        } else {
            const newRoleGroup = ruleGroup.filter((ruleGroup, i) => {
                ruleGroup;
                return i !== idx;
            })
            setRuleGroup(newRoleGroup)
        }


    }


    console.log(options, rules)

    return (
        <div className='pb-2'>

            <SwitchInput label={'Conditional Logic'} onChange={(val) => setIsConditionalLogicOn(val)}/>


            {isConditionalLogicOn ? <div className='border-b-[#363636] border-b-[1.25px] py-2'>
                <span
                    className="text-[0.70rem] box-border inline-block text-[#ABABAB] m-0 p-0">Show this field if</span>

                {rules.map((item, i) => {
                    return (
                        <div key={i} className='flex items-center gap-2'>
                            <div className='flex-1'>

                                <SelectInput label={''} selectedValue={item.inputType}
                                             options={options}
                                             onChange={(val) => handleChangeValue(i, 'inputType', val, "rule")}/>

                            </div>
                            <div className='flex-1'>

                                <SelectInput label={''} selectedValue={item.logic}
                                             options={logicValue}
                                             onChange={(val) => handleChangeValue(i, 'logic', val, "rule")}/>

                            </div>

                            <div className='flex-1'>
                                <TextInput value={item.value}
                                           onChange={(val) => handleChangeValue(i, 'value', val, "rule")}/>
                            </div>

                            <div
                                className="action-secondary-background boxShadows-action-colored box-border mb-2 px-1 border-[#363636] border-[1px] rounded-[4px] cursor-pointer"
                                onClick={() => setRules([...rules, {
                                    inputType: options[0].value,
                                    logic: logicValue[0].value,
                                    value: ''

                                }])}
                            >
                                <span className="text-[0.70rem] text-[#ABABAB] m-0 p-0 w-full leading-none">and</span>
                            </div>
                            <button
                                disabled={i === 0}
                                className={`${i === 0 ? 'opacity-0 cursor-auto' : ''} action-secondary-background boxShadows-action-colored box-border mb-2 p-1 border-[#363636] border-[1px] rounded-[4px] cursor-pointer`}
                                onClick={() => handleRemove(i, 'rule')}
                            >
                                <CloseDefaultIcon/>
                            </button>
                        </div>
                    )
                })}


                {/*Rule Group*/}
                <span className="text-[0.70rem] box-border inline-block text-[#ABABAB] m-0 p-0 w-full">OR</span>
                {ruleGroup.map((item, i) => {
                    return (
                        <div key={i} className='flex items-center gap-2'>
                            <div className='flex-1'>

                                <SelectInput label={''} selectedValue={item.value}
                                             options={options}
                                             onChange={(val) => handleChangeValue(i, 'inputType', val, "ruleGroup")}/>

                            </div>
                            <div className='flex-1'>

                                <SelectInput label={''} selectedValue={item.logic}
                                             options={logicValue}
                                             onChange={(val) => handleChangeValue(i, 'logic', val, "ruleGroup")}/>

                            </div>

                            <div className='flex-1'>
                                <TextInput onChange={(val) => handleChangeValue(i, 'value', val, "ruleGroup")}/>
                            </div>
                            <div
                                className="action-secondary-background boxShadows-action-colored box-border mb-2 p-1 border-[#363636] border-[1px] rounded-[4px] cursor-pointer"
                                onClick={() => handleRemove(i, 'ruleGroup')}
                            >
                                <CloseDefaultIcon/>
                            </div>
                        </div>
                    )
                })}
                <button
                    className="action-secondary-background boxShadows-action-secondary w-1/3 bg-[#5E5E5E] text-center text-[0.77rem] py-1 border-[#363636] border-[1px] rounded-[4px]"
                    onClick={() => setRuleGroup([...ruleGroup, {
                        inputType: options[0].value,
                        logic: logicValue[0].value,
                        value: ''

                    }])}

                >
                    Add rule group
                </button>
            </div> : null}


        </div>
    );
}