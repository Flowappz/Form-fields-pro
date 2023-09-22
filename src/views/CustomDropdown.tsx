import { useState } from "react";

export default function CustomDropdown() {
  const [dropdownLabel, setDropdownLabel] = useState("");
  const [item, setItem] = useState("");
  const [items, setItems] = useState<string[]>([]);

  const handleAddItem = () => {
    setItems([item, ...items]);
    setItem("");
  };

  return (
    <div>
      <label htmlFor="dropdownLabel" style={{ display: "block" }}>
        Enter the dropdown title
      </label>
      <input type="text" value={dropdownLabel} onChange={(e) => setDropdownLabel(e.target.value)} />

      <br />
      <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
      <button onClick={handleAddItem}>Add item</button>

      <br />
      <h4>Dropdown Items:</h4>
      <ul>
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
