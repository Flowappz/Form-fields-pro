import {useEffect, useMemo, useState} from "react";
import TextInput from "../components/form/TextInput";
import RemovableTextInput from "../components/form/RemovableTextInput";
import {ZodError, z} from "zod";
import {useAppContext} from "../contexts/AppContext";
import * as webflowService from "../services/webflowService";
import ColorInput from "../components/form/ColorInput";
import useElementInsertedBanner from "../hooks/useElementInsertedBanner";
import {arrayMove, SortableContext} from "@dnd-kit/sortable";
import {DndContext, DragOverEvent, DragStartEvent} from "@dnd-kit/core";
import {Tabs} from "../components/Tabs.tsx";
import {TabHeader} from "../components/TabHeader.tsx";
import {Button} from "../components/Button.tsx";

const inputSchema = z.object({
    dropdownLabel: z.string().min(1, "Please enter a label"),
    inputFieldName: z.string().min(1, "Please enter the input name"),
    dropdownItems: z
        .string()
        .min(1, "Please enter option value")
        .array()
        .min(1, "Please add at least one option to select from!"),
});

export type DropdownItem = {
    id: string;
    value: string;
}

export default function Select() {
    const {form} = useAppContext();
    const [isLoading, setIsLoading] = useState(false)

    const [dropdownLabel, setDropdownLabel] = useState("");
    const [inputFieldName, setInputFieldName] = useState(dropdownLabel.replace(/\s+/g, '-').toLowerCase());
    const [dropdownItems, setDropdownItems] = useState<DropdownItem[]>(
        new Array(3).fill("").map((value) => ({id: `${Date.now()}-form-field-pro-` + Math.random(), value}))
    );
    const [lightThemeHoverBackgroundColor, setLightThemeHoverBackgroundColor] =
        useState("rgb(0, 0, 0)");
    const [darkThemeHoverBackgroundColor, setDarkThemeHoverBackgroundColor] =
        useState("rgb(0, 0, 0)");
    const [lightThemeHoverTextColor, setLightThemeHoverTextColor] =
        useState("rgb(255, 255, 255)");
    const [darkThemeHoverTextColor, setDarkThemeHoverTextColor] =
        useState("rgb(255, 255, 255)");

    const [errors, setErrors] = useState<any>({});
    const {Banner, showBanner} = useElementInsertedBanner();

    const handleDropdownItemChange = (idx: number, val: string) => {
        const items = [...dropdownItems];
        items[idx].value = val;

        setDropdownItems(items);
    };

    const handleDropdownItemRemove = (idx: number) => {
        const items = dropdownItems.filter((item, i) => {
            item;
            return i !== idx;
        });
        setDropdownItems(items);
    };

    const validateDate = () => {
        try {
            inputSchema.parse({
                dropdownLabel,
                inputFieldName,
                dropdownItems: dropdownItems.map((i) => i.value),
            });

            setErrors({});

            return true;
        } catch (err) {
            if (err instanceof ZodError) {
                const errorsByField: { [x: string]: string } = {};

                for (const issue of err.errors) {
                    const {path, message} = issue;
                    const field = path.length === 1 ? path[0] : path.join(".");

                    errorsByField[field] = message;
                }

                setErrors(errorsByField);
            }
        }
    };

    // auto generate field name
    useEffect(() => {
        setInputFieldName(dropdownLabel.replace(/[\s,.]+/g, "-").toLowerCase());
    }, [dropdownLabel])

    const handleDropdownInsert = async () => {
        if (validateDate() && form) {
            setIsLoading(true)
            await webflowService.insertDropdownToForm({
                form,
                label: dropdownLabel,
                inputName: inputFieldName,
                items: dropdownItems.map((i) => i.value),
                lightThemeHoverTextColor,
                darkThemeHoverTextColor,
                lightThemeHoverBackgroundColor,
                darkThemeHoverBackgroundColor,
            });
            setIsLoading(false)
            showBanner();
        }
    };

    // Sub items make sortable
    const itemId = useMemo(() => dropdownItems.map((item) => item.id), [dropdownItems])
    const [activeItem, setActiveItem] = useState<DropdownItem | null>(null)

    function onDragStart(event: DragStartEvent) {
        setActiveItem(event.active.data.current?.item)
    }

    function onDragEnd() {
        setActiveItem(null)
        console.log(activeItem)
    }

    function onDragOver(event: DragOverEvent) {

        const {active, over} = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;
        if (activeId === overId) return;

        setDropdownItems((items) => {
            const activeIndex = items.findIndex((t) => t.id === activeId);
            const overIndex = items.findIndex((t) => t.id === overId);

            return arrayMove(items, activeIndex, overIndex);
        })
    }

    return (
        <div>
            <Tabs tabs={[
                {
                    menuItem: "General", render: () => <div>
                        <div className="border-b-[#363636] border-b-[1.25px]">
                            <TextInput
                                label="Label"
                                value={dropdownLabel}
                                name="label"
                                onChange={setDropdownLabel}
                                error={errors.dropdownLabel}
                            />
                            <TextInput
                                label="Field name"
                                name="input"
                                value={inputFieldName}
                                onChange={setInputFieldName}
                                error={errors.inputFieldName}
                            />
                        </div>

                        <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
                            <div className="mt-[0.3rem]">
                                <p className="text-[0.77rem] box-border inline-block  text-[#ABABAB]">Select Options</p>
                                <SortableContext items={itemId}>
                                    {dropdownItems.map((item, idx: number) => (
                                        <RemovableTextInput
                                            item={item}
                                            key={item.id}
                                            value={item.value}
                                            onChange={(val) => handleDropdownItemChange(idx, val)}
                                            onRemove={() => handleDropdownItemRemove(idx)}
                                            error={errors[`dropdownItems.${idx}`]}
                                            placeholder={`Option ${idx + 1}`}
                                        />
                                    ))}
                                </SortableContext>
                                <div className="border-b-[1.25px] border-b-[#363636] pb-[0.5rem]">
                                    <button
                                        className="boxShadows-action-secondary action-secondary-background w-full bg-[#5E5E5E] text-center text-[0.77rem] py-1 border-[#363636] border-[1px] rounded-[4px]"
                                        onClick={() => setDropdownItems([...dropdownItems, {
                                            id: `${Date.now()}`,
                                            value: ''
                                        }])}
                                    >
                                        Add item
                                    </button>
                                    {errors.dropdownItems &&
                                        <span className="text-red-400 text-[0.74rem]">{errors.dropdownItems}</span>}
                                </div>


                            </div>
                        </DndContext>
                    </div>
                },
                {
                    menuItem: "Styles", render: () => <div className="border-b-[#363636] border-b-[1.25px]">

                        <ColorInput
                            label="Hover text color (Light theme)"
                            value={lightThemeHoverTextColor}
                            onChange={setLightThemeHoverTextColor}
                        />
                        <ColorInput
                            label="Hover text color (Dark theme)"
                            value={darkThemeHoverTextColor}
                            onChange={setDarkThemeHoverTextColor}
                        />

                        <ColorInput
                            label="Hover background color (Light theme)"
                            value={lightThemeHoverBackgroundColor}
                            onChange={setLightThemeHoverBackgroundColor}
                        />
                        <ColorInput
                            label="Hover background color (Dark theme)"
                            value={darkThemeHoverBackgroundColor}
                            onChange={setDarkThemeHoverBackgroundColor}
                        />
                    </div>
                },
                {menuItem: "Conditional logic", render: () => <p>Conditional logic</p>},
            ]}>
                <TabHeader title={'Select Input'} description={'Custom select input with customization options'}/>
            </Tabs>

            <div className="mt-2 px-[18px]">
                <Banner/>
                <Button func={handleDropdownInsert} isLoading={isLoading}/>
            </div>
        </div>

    );
}
