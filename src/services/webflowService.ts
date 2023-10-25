type DropdownParams = {
  label: string;
  items: string[];
  form: FormFormElement | FormWrapperElement;
  inputName: string;
  noItemFoundMessage?: string;
};

type NumberSliderParams = {
  label: string;
  inputName: string;
  maxRange: number;
  minRange: number;
  defaultValue?: number;
  defaultMax?: number;
  defaultMin?: number;
  form: FormFormElement | FormWrapperElement;
};

enum styleNames {
  DROPDOWN_LABEL = "dropdown-label",
  DROPDOWN_WRAPPER = "dropdown-wrapper",
  DROPDOWN_LIST = "form-fields-dropdown-list",
  DROPDOWN_TOGGLER = "form-fields-dropdown-toggler",
  FORM_FIELDS_DROPDOWN_WRAPPER = "form-fields-dropdown-wrapper",
  USER_IP_INPUT_ALERT = "form-fields-user-ip-input-alert",
  ICON = "form-fields-icon",
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

const iconStyle = async (): Promise<Style> => {
  let style = await window._myWebflow.getStyleByName(styleNames.ICON);
  if (style) return style;

  style = window._myWebflow.createStyle(styleNames.ICON);
  style.setProperties({
    top: "auto",
    bottom: "auto",
  });

  return style;
};

const dropdownTogglerStyle = async (): Promise<Style> => {
  let style = await window._myWebflow.getStyleByName(styleNames.DROPDOWN_TOGGLER);
  if (style) return style;

  style = window._myWebflow.createStyle(styleNames.DROPDOWN_TOGGLER);
  style.setProperties({
    cursor: "pointer",
    display: "flex",
    "justify-content": "space-between",
    "align-items": "center",
    color: "#333",
    "vertical-align": "middle",
    "background-color": "#fff",

    "border-top-color": "#ccc",
    "border-bottom-color": "#ccc",
    "border-left-color": "#ccc",
    "border-right-color": "#ccc",

    "border-top-style": "solid",
    "border-bottom-style": "solid",
    "border-left-style": "solid",
    "border-right-style": "solid",

    "border-top-width": "1px",
    "border-bottom-width": "1px",
    "border-left-width": "1px",
    "border-right-width": "1px",

    "margin-bottom": "10px",

    "padding-top": "8px",
    "padding-bottom": "8px",
    "padding-left": "12px",
    "padding-right": "12px",

    "font-size": "14px",
    "line-height": "1.42857",
  });

  return style;
};

const userIpInputAlertStyle = async (): Promise<Style> => {
  let style = await window._myWebflow.getStyleByName(styleNames.USER_IP_INPUT_ALERT);
  if (style) return style;

  style = window._myWebflow.createStyle(styleNames.USER_IP_INPUT_ALERT);
  style.setProperties({
    "font-weight": "bold",
    display: "flex",
    "max-width": "fit-content",
    "background-color": "#cecece",
    "padding-left": "15px",
    "padding-right": "15px",
    "padding-top": "7.5px",
    "padding-bottom": "7.5px",
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
    width: "100%",
  });

  return style;
};

const dropdownWrapperStyle = async (): Promise<Style> => {
  let style = await window._myWebflow.getStyleByName(styleNames.FORM_FIELDS_DROPDOWN_WRAPPER);
  if (style) return style;

  style = window._myWebflow.createStyle(styleNames.FORM_FIELDS_DROPDOWN_WRAPPER);
  style.setProperties({
    position: "relative",
    width: "100%",
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

const createSearchableDropdownNoItemFound = async (inputName: string, message: string) => {
  const div = window._myWebflow.createDOM("div");
  div.setAttribute("class", "w-dropdown-list");
  div.setAttribute("form-field-searchable-dropdown-no-item-found", "true");
  div.setAttribute("dropdown-name", inputName);
  div.setTextContent(message);

  const wrapper = await createDropdownListWrapper();
  wrapper.setChildren([div]);

  return wrapper;
};

const createDropdownWrapper = async () => {
  const div = window._myWebflow.createDOM("div");
  const dropdownDivStyle = await dropdownWrapperStyle();
  div.setStyles([dropdownDivStyle]);

  return div;
};

const createDropdownSelector = (inputName: string) => {
  const selectorDiv = window._myWebflow.createDOM("div");
  selectorDiv.setTextContent("Select an item");
  selectorDiv.setAttribute("form-field-dropdown-toggler-selected-value", "true");
  // selectorDiv.setAttribute("form-field-dropdown-toggler", "true");
  selectorDiv.setAttribute("dropdown-name", inputName);

  return selectorDiv;
};

const createSearchableDropdownSelector = (inputName: string) => {
  const input = searchableDropdownInputElement(inputName);

  const selectorDiv = window._myWebflow.createDOM("div");
  selectorDiv.setAttribute("form-field-dropdown-toggler-selected-value", "true");
  // selectorDiv.setAttribute("form-field-searchable-dropdown-toggler", "true");
  selectorDiv.setAttribute("dropdown-name", inputName);
  selectorDiv.setChildren([input]);

  return selectorDiv;
};

const createDropdownSelectorIcon = async () => {
  const iconDiv = window._myWebflow.createDOM("div");
  const stringEl = window._myWebflow.createString("↓");
  iconDiv.setChildren([stringEl]);
  // iconDiv.setAttribute("class", "w-icon-dropdown-toggle");
  // const webflowIconStyle = await window._myWebflow.getStyleByName("w-icon-dropdown-toggle");
  // if (webflowIconStyle) {
  //   const style = await iconStyle();
  //   iconDiv.setStyles([webflowIconStyle, style]);
  // }

  return iconDiv;
};

const createDropdownTogglerContent = async (inputName: string, searchable = false) => {
  const icon = await createDropdownSelectorIcon();
  const selector = searchable ? createSearchableDropdownSelector(inputName) : createDropdownSelector(inputName);

  const dropdownTogglerWrapper = window._myWebflow.createDOM("div");
  const wrapperStyle = await dropdownTogglerStyle();
  dropdownTogglerWrapper.setStyles([wrapperStyle]);

  // dropdownTogglerWrapper.setAttribute("class", "w-dropdown-toggle");
  dropdownTogglerWrapper.setAttribute("form-field-dropdown-toggler", "true");
  dropdownTogglerWrapper.setAttribute("dropdown-name", inputName);
  if (searchable) dropdownTogglerWrapper.setAttribute("form-field-searchable-dropdown-toggler", "true");

  dropdownTogglerWrapper.setChildren([selector, icon]);

  return dropdownTogglerWrapper;
};

const createDropdownToggler = async (label: string, inputName: string, searchable = false) => {
  const labelElement = await createLabelElement(label);
  const togglerContent = await createDropdownTogglerContent(inputName, searchable);

  const div = window._myWebflow.createDOM("div");
  // div.setAttribute("class", "w-dropdown");
  div.setChildren([labelElement, togglerContent]);

  return div;
};

const createDropdown = async ({
  label,
  inputName,
  items,
  searchable = false,
  noItemFoundMessage,
}: {
  label: string;
  inputName: string;
  items: string[];
  searchable?: boolean;
  noItemFoundMessage?: string;
}): Promise<DOMElement> => {
  const dropdownToggler = await createDropdownToggler(label, inputName, searchable);
  const dropdownList = await createDropdownList(inputName, items);

  const dropdownWrapper = await createDropdownWrapper();

  if (!searchable) dropdownWrapper.setChildren([dropdownToggler, dropdownList]);
  else {
    const noItemFound = await createSearchableDropdownNoItemFound(inputName, noItemFoundMessage as string);
    dropdownWrapper.setChildren([dropdownToggler, dropdownList, noItemFound]);
  }

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

const searchableDropdownInputElement = (inputName: string): DOMElement => {
  const input = createInputElement(inputName, "text");
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

export const insertSearchableDropdownToForm = async ({
  label,
  items,
  inputName,
  form,
  noItemFoundMessage,
}: DropdownParams) => {
  const dropdownDiv = await createDropdown({ label, inputName, items, searchable: true, noItemFoundMessage });
  const lineBreak = window._myWebflow.createDOM("br");

  const existingChilds = form.getChildren();

  form.setChildren([...existingChilds, lineBreak, dropdownDiv]);
  await form.save();
};

export const insertNumberSliderToForm = async ({
  label,
  inputName,
  maxRange,
  minRange,
  defaultValue,
  form,
}: NumberSliderParams) => {
  const labelElement = await createLabelElement(label);
  const lineBreak = window._myWebflow.createDOM("br");

  const inputElement = createInputElement(inputName, "hidden");
  inputElement.setAttribute("form-fields-pro-number-slider", "true");
  inputElement.setAttribute("data-max", String(maxRange));
  inputElement.setAttribute("data-min", String(minRange));
  inputElement.setAttribute("data-default", String(defaultValue));

  const wrapperDiv = window._myWebflow.createDOM("div");
  wrapperDiv.setChildren([labelElement, inputElement]);

  const existingChilds = form.getChildren();
  form.setChildren([...existingChilds, lineBreak, wrapperDiv]);
  await form.save();
};

export const insertNumberRangeSliderToForm = async ({
  label,
  inputName,
  maxRange,
  minRange,
  defaultMax,
  defaultMin,
  form,
}: NumberSliderParams) => {
  const labelElement = await createLabelElement(label);
  const lineBreak = window._myWebflow.createDOM("br");

  const inputElement = createInputElement(inputName, "hidden");
  inputElement.setAttribute("form-fields-pro-number-slider", "true");
  inputElement.setAttribute("data-max", String(maxRange));
  inputElement.setAttribute("data-min", String(minRange));
  inputElement.setAttribute("data-max-default", String(defaultMax));
  inputElement.setAttribute("data-min-default", String(defaultMin));
  inputElement.setAttribute("allow-range", "true");

  const wrapperDiv = window._myWebflow.createDOM("div");
  wrapperDiv.setChildren([labelElement, inputElement]);

  const existingChilds = form.getChildren();
  form.setChildren([...existingChilds, lineBreak, wrapperDiv]);
  await form.save();
};

export const insertDatePickerToForm = async ({
  label,
  inputName,
  form,
}: Pick<DropdownParams, "label" | "inputName" | "form">) => {
  const inputElement = createInputElement(inputName, "text");
  inputElement.setAttribute("form-fields-pro-date-picker", "true");

  const labelElement = await createLabelElement(label);

  const wrapperDiv = window._myWebflow.createDOM("div");
  wrapperDiv.setChildren([labelElement, inputElement]);

  const lineBreak = window._myWebflow.createDOM("br");

  const existingChilds = form.getChildren();
  form.setChildren([...existingChilds, lineBreak, wrapperDiv]);
  await form.save();
};

export const insertDateRangePickerToForm = async ({
  label,
  inputName,
  form,
}: Pick<DropdownParams, "label" | "inputName" | "form">) => {
  const inputElement = createInputElement(inputName, "text");
  inputElement.setAttribute("form-fields-pro-date-range-picker", "true");

  const labelElement = await createLabelElement(label);

  const wrapperDiv = window._myWebflow.createDOM("div");
  wrapperDiv.setChildren([labelElement, inputElement]);

  const lineBreak = window._myWebflow.createDOM("br");

  const existingChilds = form.getChildren();
  form.setChildren([...existingChilds, lineBreak, wrapperDiv]);
  await form.save();
};

export const insertUserIpInputToForm = async ({ inputName, form }: Pick<DropdownParams, "form" | "inputName">) => {
  const inputElement = createInputElement(inputName, "hidden");
  inputElement.setAttribute("form-fields-pro-user-ip-input", "true");

  const adminFeedback = window._myWebflow.createDOM("div");
  adminFeedback.setAttribute("form-fields-pro-user-ip-admin-alert", "true");
  adminFeedback.setTextContent("Collecting User IP");

  const style = await userIpInputAlertStyle();
  adminFeedback.setStyles([style]);

  const lineBreak = window._myWebflow.createDOM("br");

  const existingChilds = form.getChildren();
  form.setChildren([...existingChilds, lineBreak, adminFeedback, inputElement]);
  await form.save();
};