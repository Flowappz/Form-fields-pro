type DropdownParams = {
  label: string;
  items: string[];
  form: FormFormElement | FormWrapperElement;
  inputName: string;
};

enum styleNames {
  DROPDOWN_LABEL = "dropdown-label",
  DROPDOWN_WRAPPER = "dropdown-wrapper",
  DROPDOWN_LIST = "dropdown-list",
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
    position: "absolute",
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

const createDropdown = async ({ label, inputName, items }: { label: string; inputName: string; items: string[] }): Promise<DOMElement> => {
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

  const dropdownDiv = window._myWebflow.createDOM("div");
  const dropdownDivStyle = await dropdownListStyle();
  dropdownDiv.setStyles([dropdownDivStyle]);

  const list = window._myWebflow.createDOM("ul");
  list.setAttribute("class", "w-dropdown-list");

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

  const wrapperDiv = window._myWebflow.createDOM("div");
  wrapperDiv.setAttribute("class", "w-dropdown");

  wrapperDiv.setChildren([labelElement, dropdownSelectorWrapper, list]);

  return wrapperDiv;
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
