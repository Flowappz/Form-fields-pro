type DropdownParams = {
  label: string;
  items: string[];
  form: FormFormElement | FormWrapperElement;
  inputName: string;
};

enum styleNames {
  DROPDOWN_LABEL = "dropdown-label",
  DROPDOWN_WRAPPER = "dropdown-wrapper",
  DROPDOWN_LIST = "form-fields-dropdown-list",
  FORM_FIELDS_DROPDOWN_WRAPPER = "form-fields-dropdown-wrapper",
}

const dropdownLabelStyle = async (): Promise<Style> => {
  let style = await window._myWebflow.getStyleByName(styleNames.DROPDOWN_LABEL);
  if (style) return style;

  style = window._myWebflow.createStyle(styleNames.DROPDOWN_LABEL);
  style.setProperties({
    "font-weight": "bold",
    display: "block",
    "margin-bottom": "5px",
  });

  return style;
};

const dropdownListStyle = async (): Promise<Style> => {
  let style = await window._myWebflow.getStyleByName(styleNames.DROPDOWN_LIST);
  if (style) return style;

  style = window._myWebflow.createStyle(styleNames.DROPDOWN_LIST);
  style.setProperties({
    "z-index": "999",
    position: "absolute",
  });

  return style;
};

const dropdownWrapperStyle = async (): Promise<Style> => {
  let style = await window._myWebflow.getStyleByName(styleNames.FORM_FIELDS_DROPDOWN_WRAPPER);
  if (style) return style;

  style = window._myWebflow.createStyle(styleNames.FORM_FIELDS_DROPDOWN_WRAPPER);
  style.setProperties({
    position: "relative",
    width: "fit-content",
  });

  return style;
};

const createLabelElement = async (label: string): Promise<DOMElement> => {
  const element = window._myWebflow.createDOM("span");
  element.setTextContent(label);

  const style = await dropdownLabelStyle();
  element.setStyles([style]);

  return element;
};

const createDropdown = async ({
  label,
  inputName,
  items,
}: {
  label: string;
  inputName: string;
  items: string[];
}): Promise<DOMElement> => {
  const labelElement = await createLabelElement(label);

  const dropdownSelectorWrapper = window._myWebflow.createDOM("div");
  dropdownSelectorWrapper.setAttribute("class", "w-dropdown-toggle");

  const dropdownSelector = window._myWebflow.createDOM("div");
  dropdownSelector.setTextContent("Select an item");
  dropdownSelector.setAttribute("form-field-dropdown-toggler", "true");
  dropdownSelector.setAttribute("dropdown-name", inputName);

  const dropdownSelectorIcon = window._myWebflow.createDOM("div");
  dropdownSelectorIcon.setAttribute("class", "w-icon-dropdown-toggle");

  dropdownSelectorWrapper.setChildren([dropdownSelectorIcon, dropdownSelector]);

  const listWrapper = window._myWebflow.createDOM("div");
  const listStyle = await dropdownListStyle();
  listWrapper.setStyles([listStyle]);

  const list = window._myWebflow.createDOM("ul");
  list.setAttribute("class", "w-dropdown-list");
  list.setAttribute("form-field-dropdown-item-list", "true");
  list.setAttribute("dropdown-name", inputName);

  const listItems = items.map((item) => {
    const listItem = window._myWebflow.createDOM("li");

    listItem.setTextContent(item);
    listItem.setAttribute("class", "w-dropdown-link");
    listItem.setAttribute("form-field-dropdown-item", "true");
    listItem.setAttribute("input-field", inputName);
    listItem.setAttribute("input-data", item);

    return listItem;
  });

  list.setChildren(listItems);
  listWrapper.setChildren([list]);

  const div = window._myWebflow.createDOM("div");
  div.setAttribute("class", "w-dropdown");

  div.setChildren([labelElement, dropdownSelectorWrapper]);

  const dropdownWrapper = window._myWebflow.createDOM("div");
  const dropdownDivStyle = await dropdownWrapperStyle();
  dropdownWrapper.setStyles([dropdownDivStyle]);

  dropdownWrapper.setChildren([div, listWrapper]);

  return dropdownWrapper;
};

const createInputElement = (name: string, type: "text" | "hidden"): DOMElement => {
  const input = window._myWebflow.createDOM("input");
  input.setAttribute("type", type);
  input.setAttribute("name", name);

  return input;
};

const createHiddenInput = (inputName: string): DOMElement => {
  const input = window._myWebflow.createDOM("input");
  input.setAttribute("type", "hidden");
  input.setAttribute("name", inputName);
  input.setAttribute("form-field-dropdown-input", "true");

  return input;
};

export const insertDropdownToForm = async ({ label, items, inputName, form }: DropdownParams) => {
  const dropdownDiv = await createDropdown({ label, inputName, items });
  const input = createHiddenInput(inputName);
  const lineBreak = window._myWebflow.createDOM("br");

  const existingChilds = form.getChildren();

  form.setChildren([...existingChilds, lineBreak, dropdownDiv, input]);
  await form.save();
};
