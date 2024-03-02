import {PropsWithChildren, useEffect, useState} from "react";
import * as webflowService from "../services/webflowService";

export default function CustomDropdown({ form }: PropsWithChildren<{ form: FormFormElement | FormWrapperElement | null }>) {
  const [dropdownLabel, setDropdownLabel] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [item, setItem] = useState("");
  const [items, setItems] = useState<string[]>([]);

  const handleAddItem = () => {
    setItems([item, ...items]);
    setItem("");
  };

    // auto generate field name
    useEffect(() => {
        setFieldName(dropdownLabel.replace(/[\s,.]+/g, "-").toLowerCase());
    }, [dropdownLabel])

  const handleInsert = async () => {
    if (form) {
      await webflowService.insertDropdownToForm({
        label: dropdownLabel,
        items,
        inputName: fieldName,
        form,
      });
    }
  };

  return (
    <div>
      <label htmlFor="dropdownLabel" style={{ display: "block" }}>
        Enter the dropdown title
      </label>
      <input type="text" value={dropdownLabel} onChange={(e) => setDropdownLabel(e.target.value)} />

      <label htmlFor="dropdownFieldName" style={{ display: "block" }}>
        Enter the dropdown field name
      </label>
      <input type="text" value={fieldName} onChange={(e) => setFieldName(e.target.value)} />

      <br />
      <label style={{ display: "block" }}>Enter items</label>
      <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
      <button onClick={handleAddItem}>Add item</button>

      <br />
      <h4>Dropdown Items:</h4>
      <ul>
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>

      <button onClick={handleInsert} style={{ marginTop: "15px" }}>
        Insert dropdown
      </button>
    </div>
  );
}
