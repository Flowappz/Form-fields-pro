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

const createDropdownListItems = (inputName: string, items: string[]) => {
  const listItems: DOMElement[] = [];

  for (let item of items) {
    const el = window._myWebflow.createDOM("li");

    el.setTextContent(item);
    el.setAttribute("class", "w-dropdown-link");
    el.setAttribute("form-field-dropdown-item", "true");
    el.setAttribute("input-field", inputName);
    el.setAttribute("input-data", item);

    listItems.push(el);
  }

  return listItems;
};

const createDropdownListWrapper = async () => {
  const div = window._myWebflow.createDOM("div");
  const listStyle = await dropdownListStyle();
  div.setStyles([listStyle]);

  return div;
};

const createDropdownList = async (inputName: string, items: string[]) => {
  const list = window._myWebflow.createDOM("ul");
  list.setAttribute("class", "w-dropdown-list");
  list.setAttribute("form-field-dropdown-item-list", "true");
  list.setAttribute("dropdown-name", inputName);

  const listItems = createDropdownListItems(inputName, items);
  list.setChildren(listItems);

  const listWrapper = await createDropdownListWrapper();
  listWrapper.setChildren([list]);

  return listWrapper;
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

  const dropdownList = await createDropdownList(inputName, items);

  const div = window._myWebflow.createDOM("div");
  div.setAttribute("class", "w-dropdown");

  div.setChildren([labelElement, dropdownSelectorWrapper]);

  const dropdownWrapper = window._myWebflow.createDOM("div");
  const dropdownDivStyle = await dropdownWrapperStyle();
  dropdownWrapper.setStyles([dropdownDivStyle]);

  dropdownWrapper.setChildren([div, dropdownList]);

  return dropdownWrapper;
};

const createInputElement = (name: string, type: "text" | "hidden"): DOMElement => {
  const input = window._myWebflow.createDOM("input");
  input.setAttribute("type", type);
  input.setAttribute("name", name);

  return input;
};

const hiddenDropdownInputElement = (inputName: string): DOMElement => {
  const input = createInputElement(inputName, "hidden");
  input.setAttribute("form-field-dropdown-input", "true");

  return input;
};

export const insertDropdownToForm = async ({ label, items, inputName, form }: DropdownParams) => {
  const dropdownDiv = await createDropdown({ label, inputName, items });
  const input = hiddenDropdownInputElement(inputName);
  const lineBreak = window._myWebflow.createDOM("br");

  const existingChilds = form.getChildren();

  form.setChildren([...existingChilds, lineBreak, dropdownDiv, input]);
  await form.save();
};
