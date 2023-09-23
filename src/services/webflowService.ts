type DropdownParams = {
  label: string;
  items: string[];
  form: FormFormElement | FormWrapperElement;
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
    display: "inline-block",
    "margin-bottom": "5px",
  });

  return style;
};

const dropdownWrapperStyle = async (): Promise<Style> => {
  let style = await window._myWebflow.getStyleByName(styleNames.DROPDOWN_WRAPPER);
  if (style) return style;

  style = window._myWebflow.createStyle(styleNames.DROPDOWN_WRAPPER);
  style.setProperties({
    position: "relative",
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

export const insertDropdownToForm = async ({ label, items, form }: DropdownParams) => {
  const labelElement = await createLabelElement(label);

  const dropdownSelector = window._myWebflow.createDOM("p");
  dropdownSelector.setTextContent("Select an item");

  const dropdownDiv = window._myWebflow.createDOM("div");
  const dropdownDivStyle = await dropdownListStyle();
  dropdownDiv.setStyles([dropdownDivStyle]);

  const list = window._myWebflow.createDOM("ul");
  const listItems = items.map((item) => {
    const listItem = window._myWebflow.createDOM("li");
    listItem.setTextContent(item);
    return listItem;
  });

  list.setChildren(listItems);
  dropdownDiv.setChildren([list]);

  const wrapperDiv = window._myWebflow.createDOM("div");
  const wrapperStyle = await dropdownWrapperStyle();
  wrapperDiv.setStyles([wrapperStyle]);

  wrapperDiv.setChildren([labelElement, dropdownSelector, dropdownDiv]);

  const existingChilds = form.getChildren();

  form.setChildren([...existingChilds, wrapperDiv]);
  await form.save();
};
