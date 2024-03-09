import CloseDefaultIcon from "../../icons/CloseDefault";
import TextInput, {TextInputProps} from "./TextInput";
import DragIndicatorIcon from "../../icons/DragIndicator.tsx";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities"
import {DropdownItem} from "../../views/Select.tsx";

interface RemovableTextInputProps extends TextInputProps {
    item:DropdownItem
    onRemove: () => void;
}

export default function RemovableTextInput({
                                               item,
                                               label,
                                               name = "",
                                               value,
                                               placeholder = "Option",
                                               onChange = () => {
                                               },
                                               onRemove,
                                               error,
                                           }: RemovableTextInputProps) {

    const {attributes, setNodeRef, listeners, transform, transition} = useSortable({
        id: item.id,
        data: {
            item
        }
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    return (
        <div ref={setNodeRef} className="flex gap-1 justify-between items-start" style={style}>
            <div
                {...attributes}
                {...listeners}
                className="action-secondary-background boxShadows-action-colored box-border mb-2 p-1 border-[#363636] border-[1px] rounded-[4px] cursor-grab"
            >
                <DragIndicatorIcon/>
            </div>
            <div className="flex-1">
                <TextInput
                    placeholder={placeholder}
                    label={label}
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error}
                />
            </div>
            <div
                className="action-secondary-background boxShadows-action-colored box-border mb-2 p-1 border-[#363636] border-[1px] rounded-[4px] cursor-pointer"
                onClick={onRemove}
            >
                <CloseDefaultIcon/>
            </div>
        </div>
    );
}
