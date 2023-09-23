type DropdownParams = {
  label: string;
  items: string[];
  form: FormFormElement | FormWrapperElement;
};

enum styleNames {
  DROPDOWN_LABEL = "dropdown-label",
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

const createLabelElement = async (label: string): Promise<DOMElement> => {
  const element = window._myWebflow.createDOM("span");
  element.setTextContent(label);

  const style = await dropdownLabelStyle();
  element.setStyles([style]);

  return element;
};

export const insertDropdownToForm = async ({ label, items, form }: DropdownParams) => {
  const labelElement = await createLabelElement(label);

  const wrapperDiv = window._myWebflow.createDOM("div");
  wrapperDiv.setChildren([labelElement]);

  const existingChilds = form.getChildren();

  form.setChildren([...existingChilds, wrapperDiv]);
  await form.save();
};
