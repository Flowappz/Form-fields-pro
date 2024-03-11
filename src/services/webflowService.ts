import {webflowIcons} from "./iconService";

type DropdownParams = {
    label: string;
    items: string[];
    form: FormFormElement | FormWrapperElement;
    inputName: string;
    noItemFoundMessage?: string;
};

export type DateParams = {
    label: string;
    form: FormFormElement | FormWrapperElement;
    inputName: string;
    zIndex: string;
    dateFormat: string;
    language: string;
    firstDayOfWeek: string;
    numberOfMonthsToShow: string;
    columns: string;
};

export type NumberInputParams = {
    label: string;
    form: FormFormElement | FormWrapperElement;
    inputName: string;
    placeholderText: string

}

export type ColorPickerParams = {
    label: string;
    form: FormFormElement | FormWrapperElement;
    inputName: string;
    defaultColor: string;

}
export type FileUploaderParams = {
    label: string;
    form: FormFormElement | FormWrapperElement;
    inputName: string;
    borderColor: string;
    borderStyle: string;
}

const fileUploaderConfigKeys = {
    acceptedFiles: 'data-accepted-files',
    maxFileSize: 'data-max-file-size',
    maxFiles: 'data-max-files',

}

type FileUploaderConfigKeys = { [x in keyof typeof fileUploaderConfigKeys]?: string }

export type EmailParams = {
    form: FormFormElement | FormWrapperElement;
    emailLabel: string;
    emailFieldName: string;
    placeholder: string;
    emptyErrorMessage: string;
    invalidErrorMessage: string
}

export type NetPromoterScoreParams = {
    form: FormFormElement | FormWrapperElement;
    label: string
    description: string
    scoreFieldName: string,
    lowScoreLabel: string
    heightScoreLabel: string

    extraFieldLabel: string
    extraFieldName: string

}

const sliderColorConfigKeys = {
    lightThemeMaxMinValueTextColor: "data-light-theme-max-min-text-color",
    darkThemeMaxMinValueTextColor: "data-dark-theme-max-min-text-color",

    lightThemeTooltipTextColor: "data-light-theme-tooltip-text-color",
    darkThemeTooltipTextColor: "data-dark-theme-tooltip-text-color",

    lightThemeSliderColor: "data-light-theme-slider-color",
    darkThemeSliderColor: "data-dark-theme-slider-color",
};

type SliderColorConfig = { [x in keyof typeof sliderColorConfigKeys]?: string };

const DropdownColorConfigKeys = {
    lightThemeHoverTextColor: "data-light-theme-hover-text-color",
    darkThemeHoverTextColor: "data-dark-theme-hover-text-color",

    lightThemeHoverBackgroundColor: "data-light-theme-hover-background-color",
    darkThemeHoverBackgroundColor: "data-dark-theme-hover-background-color",
};

type DropdownColorConfig = { [x in keyof typeof DropdownColorConfigKeys]?: string };

const DateColorConfigKeys = {
    lightThemeSelectedDateTextColor: "data-light-theme-selected-date-text-color",
    darkThemeSelectedDateTextColor: "data-dark-theme-selected-date-text-color",

    lightThemeSelectedDateBackgroundColor: "data-light-theme-selected-date-background-color",
    darkThemeSelectedDateBackgroundColor: "data-dark-theme-selected-date-background-color",

    lightThemeTodayColor: "data-light-theme-today-color",
    darkThemeTodayColor: "data-dark-theme-today-color",
};

export type DateColorConfig = { [x in keyof typeof DateColorConfigKeys]?: string };

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

const NetPromoterConfigKeys = {
    lightThemeHoverTextColor: "data-light-theme-score-text-color",
    darkThemeHoverTextColor: "data-dark-theme-score-text-color",

    lightThemeHoverBackgroundColor: "data-light-theme-score-background-color",
    darkThemeHoverBackgroundColor: "data-dark-theme-score-background-color",

    errorMessage: "data-error-message",

    extraFeedbackCollection: "data-extra-feedback-collection"

}

export type NetPromoterConfig = { [x in keyof typeof NetPromoterConfigKeys]?: string }

// Url field params
type UrlFieldParams = {
    form: FormFormElement | FormWrapperElement;
    label: string;
    inputFieldName: string;
    placeholder: string;
    required: boolean;
    autofocus: boolean


}


enum styleNames {
    DROPDOWN_LABEL = "dropdown-label",
    DROPDOWN_WRAPPER = "dropdown-wrapper",
    DROPDOWN_LIST = "form-fields-dropdown-list",
    DROPDOWN_LIST_UL = "form-fields-dropdown-list-ul",
    DROPDOWN_TOGGLER = "form-fields-dropdown-toggler",
    DROPDOWN_ITEM = "form-fields-dropdown-item",
    SEARCHABLE_INPUT = "form-fields-searchable-dropdown-input",
    FORM_FIELDS_DROPDOWN_WRAPPER = "form-fields-dropdown-wrapper",
    USER_IP_INPUT_ALERT = "form-fields-user-ip-input-alert",
    ICON = "form-fields-icon",
    FULL_WIDTH_RELATIVE_POSITION = "full-width-relative-position",
    POSITION_ABSOLUTE = "position-absolute",
    DATE_INPUT_ICON = "date-input-icon",
    FORM_FIELDS_WRAPPER = "form-fields-wrapper",
    FORM_FIELDS_MARGIN_BOTTOM = "form-fields-margin-bottom",
    BACKGROUND_WHITE = "bg-white",
    NUMBER_INPUT_WRAPPER = "number-input-wrapper",
    NUMBER_INPUT_ICON_WRAPPER = "number-input-icon-wrapper",
    NUMBER_INPUT = "number-input-field",
    NUMBER_INPUT_DROPDOWN = "number-input-dropdown",
    NUMBER_INPUT_SEARCH_FIELD = "number-input-search-field",
    NUMBER_INPUT_DROPDOWN_LIST = 'number-input-dropdown-list',
    COLOR_PICKER_CONTAINER = 'color-picker-container',
    COLOR_PICKER_BUTTON = 'color-picker-button',
    DROPZONE = 'dropzone',
    EMAIL_ERROR_MESSAGE = "email-error-message",
    NET_PROMOTER_SMALL_LABEL = "net-promoter-small-label",
    NET_PROMOTER_LABEL_WRAPPER = "net-promoter-label-wrapper",
    NET_PROMOTER_EXTRA_FIELD = "net-promoter-extra-field",
    NET_PROMOTER_SCORE_WRAPPER = "net-promoter-score-wrapper",
    NET_PROMOTER_SCORE = "net-promoter-score"

}

const positionAbsoluteStyle = async (): Promise<Style> => {
    let style = await window._myWebflow.getStyleByName(styleNames.POSITION_ABSOLUTE);
    if (style) return style;

    style = window._myWebflow.createStyle(styleNames.POSITION_ABSOLUTE);
    style.setProperties({
        position: "absolute",
    });

    return style;
};

const dateInputIconStyle = async (): Promise<Style> => {
    let style = await window._myWebflow.getStyleByName(styleNames.DATE_INPUT_ICON);
    if (style) return style;

    style = window._myWebflow.createStyle(styleNames.DATE_INPUT_ICON);
    style.setProperties({
        top: "0",
        right: "0",
        "padding-top": "8px",
        "padding-bottom": "8px",
        "padding-left": "12px",
        "padding-right": "12px",
    });

    return style;
};

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

const backgroundWhiteStyle = async (): Promise<Style> => {
    let style = await window._myWebflow.getStyleByName(styleNames.BACKGROUND_WHITE);
    if (style) return style;

    style = window._myWebflow.createStyle(styleNames.BACKGROUND_WHITE);
    style.setProperties({
        "background-color": "#fff",
    });

    return style;
};

const dropdownListUlStyle = async (): Promise<Style> => {
    let style = await window._myWebflow.getStyleByName(styleNames.DROPDOWN_LIST_UL);
    if (style) return style;

    style = window._myWebflow.createStyle(styleNames.DROPDOWN_LIST_UL);
    style.setProperties({
        "min-width": "100%",
        "background-color": "inherit",
        "padding-left": "0px",
        display: "none",

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
    });

    return style;
};

const dropdownItemStyle = async (): Promise<Style> => {
    let style = await window._myWebflow.getStyleByName(styleNames.DROPDOWN_ITEM);
    if (style) return style;

    style = window._myWebflow.createStyle(styleNames.DROPDOWN_ITEM);
    style.setProperties({
        display: "block",
        "padding-top": "10px",
        "padding-bottom": "10px",
        "padding-left": "20px",
        "padding-right": "20px",
        cursor: "pointer",
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

const formFieldsWrapperStyle = async (): Promise<Style> => {
    let style = await window._myWebflow.getStyleByName(styleNames.FORM_FIELDS_WRAPPER);
    if (style) return style;

    style = window._myWebflow.createStyle(styleNames.FORM_FIELDS_WRAPPER);
    style.setProperties({
        "background-color": "inherit",
    });

    return style;
};

const formFieldsMarginBottomStyle = async (): Promise<Style> => {
    let style = await window._myWebflow.getStyleByName(styleNames.FORM_FIELDS_MARGIN_BOTTOM);
    if (style) return style;

    style = window._myWebflow.createStyle(styleNames.FORM_FIELDS_MARGIN_BOTTOM);
    style.setProperties({
        "margin-bottom": "10px",
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
        "background-color": "inherit",
    });

    return style;
};

const fullWidthRelativePositionStyle = async (): Promise<Style> => {
    let style = await window._myWebflow.getStyleByName(styleNames.FULL_WIDTH_RELATIVE_POSITION);
    if (style) return style;

    style = window._myWebflow.createStyle(styleNames.FULL_WIDTH_RELATIVE_POSITION);
    style.setProperties({
        position: "relative",
        width: "100%",
        "background-color": "inherit",
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
        "background-color": "inherit",
    });

    return style;
};

const dropdownSearchableInputStyle = async (): Promise<Style> => {
    let style = await window._myWebflow.getStyleByName(styleNames.SEARCHABLE_INPUT);
    if (style) return style;

    style = window._myWebflow.createStyle(styleNames.SEARCHABLE_INPUT);
    style.setProperties({
        position: "relative",
        width: "100%",
        "outline-style": "none",
        "border-top-style": "none",
        "border-bottom-style": "none",
        "border-left-style": "none",
        "border-right-style": "none",
    });

    return style;
};


// Number Input Field Style Start
const numberInputWrapperStyle = async (): Promise<Style> => {
    let style = await window._myWebflow.getStyleByName(styleNames.NUMBER_INPUT_WRAPPER);
    if (style) return style;

    style = window._myWebflow.createStyle(styleNames.NUMBER_INPUT_WRAPPER);
    style.setProperties({
        display: "flex",
        "align-items": "center",

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
    })

    return style
}


const numberInputIconWrapperStyle = async (): Promise<Style> => {
    let style = await window._myWebflow.getStyleByName(styleNames.NUMBER_INPUT_ICON_WRAPPER);
    if (style) return style;

    style = window._myWebflow.createStyle(styleNames.NUMBER_INPUT_ICON_WRAPPER);
    style.setProperties({
        display: "flex",
        "align-items": "center",
        "column-gap": "5px",

        "cursor": "pointer",

        "padding-right": "8px",
        "padding-bottom": "8px",
        "padding-left": "8px",
        "padding-top": "8px",
    })
    return style
}


const numberInputFieldStyle = async (): Promise<Style> => {
    let style = await window._myWebflow.getStyleByName(styleNames.NUMBER_INPUT);
    if (style) return style;

    style = window._myWebflow.createStyle(styleNames.NUMBER_INPUT);
    style.setProperties({
        "border-bottom-color": "transparent",

        "border-bottom-style": "solid",
        "border-bottom-width": "1px",
        "border-left-color": "transparent",
        "border-left-style": "solid",

        "border-left-width": "1px",
        "border-right-color": "transparent",
        "border-right-style": "solid",
        "border-right-width": "1px",

        "border-top-color": "transparent",
        "border-top-style": "solid",
        "border-top-width": "1px",
        'font-size': '14px',

        'outline-style': 'none',

        "padding-bottom": "8px",
        "padding-left": "12px",
        "padding-right": "12px",
        "padding-top": "8px",

        width: '100%',

    });

    style.setProperties({appearance: "none"}, {pseudo: "hover"})

    return style
}

const numberInputDropdownStyle = async (): Promise<Style> => {
    let style = await window._myWebflow.getStyleByName(styleNames.NUMBER_INPUT_DROPDOWN);
    if (style) return style;

    style = window._myWebflow.createStyle(styleNames.NUMBER_INPUT_DROPDOWN);
    style.setProperties({
        position: "absolute",
        top: "38px",
        width: "100%",

        "z-index": "999",

        "background-color": "#fff",

        "border-top-color": "#ccc",
        "border-top-style": "solid",
        "border-top-width": "1px",

        "border-right-color": "#ccc",
        "border-right-style": "solid",
        "border-right-width": "1px",

        "border-bottom-color": "#ccc",
        "border-bottom-style": "solid",
        "border-bottom-width": "1px",

        "border-left-color": "#ccc",
        "border-left-style": "solid",
        "border-left-width": "1px",

        display: "none"
    })

    return style
}

const numberInputSearchFieldStyle = async (): Promise<Style> => {
    let style = await window._myWebflow.getStyleByName(styleNames.NUMBER_INPUT_SEARCH_FIELD);
    if (style) return style;

    style = window._myWebflow.createStyle(styleNames.NUMBER_INPUT_SEARCH_FIELD);
    style.setProperties({
        "border-bottom-color": "#ccc",
        "border-bottom-style": "solid",
        "border-bottom-width": "1px",

        "padding-bottom": "8px",
        "padding-left": "12px",
        "padding-right": "12px",
        "padding-top": "8px",

    })

    return style

}

const numberInputDropdownListStyle = async (): Promise<Style> => {
    let style = await window._myWebflow.getStyleByName(styleNames.NUMBER_INPUT_DROPDOWN_LIST)
    if (style) return style

    style = window._myWebflow.createStyle(styleNames.NUMBER_INPUT_DROPDOWN_LIST)
    style.setProperties({
        "list-style-type": "none",
        "max-height": "23rem",
        "overflow-y": 'overlay',

        "padding-left": "0"
    })

    return style
}


// Number Input Field Style End

// Color Picker Field Style Start

const colorPickerContainerStyle = async (): Promise<Style> => {
    let style = await window._myWebflow.getStyleByName(styleNames.COLOR_PICKER_CONTAINER);
    if (style) return style;

    style = window._myWebflow.createStyle(styleNames.COLOR_PICKER_CONTAINER);
    style.setProperties({
        width: "fit-content",
        position: "relative"
    });

    return style;
};

// Color Picker Field Style end

// File Uploader Field Style start

const dropzoneStyle = async (borderColor: string, borderStyle: string): Promise<Style> => {
    let style = await window._myWebflow.getStyleByName(styleNames.DROPZONE);
    if (style) return style;

    style = window._myWebflow.createStyle(styleNames.DROPZONE);
    style.setProperties({
        "min-height": "auto !important",

        "border-top-color": `${borderColor} !important`,
        "border-top-style": `${borderStyle} !important`,
        "border-top-width": "1px",

        "border-right-color": `${borderColor} !important`,
        "border-right-style": `${borderStyle} !important`,
        "border-right-width": "1px",

        "border-bottom-color": `${borderColor} !important`,
        "border-bottom-style": `${borderStyle} !important`,
        "border-bottom-width": "1px",

        "border-left-color": `${borderColor} !important`,
        "border-left-style": `${borderStyle} !important`,
        "border-left-width": "1px",

        "padding-top": "20px",
        "padding-left": "20px",
        "padding-right": "20px",
        "padding-bottom": "20px"

    });

    return style;
}

// File Uploader Field Style end

// Email style Start

const emailErrorMessageStyle = async (): Promise<Style> => {
    let style = await window._myWebflow.getStyleByName(styleNames.EMAIL_ERROR_MESSAGE);
    if (style) return style;

    style = window._myWebflow.createStyle(styleNames.EMAIL_ERROR_MESSAGE);

    style.setProperties({
        "font-size": "11px",
        color: "#FF2626"
    })
    return style
}


// Email style End


//Net Promoter Score style start

const netPromoterSmallStyle = async (): Promise<Style> => {
    let style = await window._myWebflow.getStyleByName(styleNames.NET_PROMOTER_SMALL_LABEL);
    if (style) return style;

    style = window._myWebflow.createStyle(styleNames.NET_PROMOTER_SMALL_LABEL);

    style.setProperties({
        "font-size": "11px",
        color: "#676767"
    })
    return style
}
const netPromoterLabelWrapperStyle = async (): Promise<Style> => {
    let style = await window._myWebflow.getStyleByName(styleNames.NET_PROMOTER_LABEL_WRAPPER);
    if (style) return style;

    style = window._myWebflow.createStyle(styleNames.NET_PROMOTER_LABEL_WRAPPER);

    style.setProperties({
        display: "flex",
        "align-items": "center",
        "justify-content": "space-between"

    })
    return style
}

const netPromoterExtraInputStyle = async (): Promise<Style> => {
    let style = await window._myWebflow.getStyleByName(styleNames.NET_PROMOTER_EXTRA_FIELD);
    if (style) return style;

    style = window._myWebflow.createStyle(styleNames.NET_PROMOTER_EXTRA_FIELD);

    style.setProperties({
        width: "100%",
        height: "64px",

        resize: "none",

        "background-color": "transparent",

        "border-top-color": "#ccc",
        "border-top-style": "solid",
        "border-top-width": "1px",

        "border-right-color": "#ccc",
        "border-right-style": "solid",
        "border-right-width": "1px",

        "border-bottom-color": "#ccc",
        "border-bottom-style": "solid",
        "border-bottom-width": "1px",

        "border-left-color": "#ccc",
        "border-left-style": "solid",
        "border-left-width": "1px",

    })
    return style
}

const netPromoterScoreWrapperStyle = async (): Promise<Style> => {
    let style = await window._myWebflow.getStyleByName(styleNames.NET_PROMOTER_SCORE_WRAPPER);
    if (style) return style;

    style = window._myWebflow.createStyle(styleNames.NET_PROMOTER_SCORE_WRAPPER);
    style.setProperties({
        display: "flex",
        "align-items": "center",
        "flex-wrap": "nowrap",

        width: "100%",

        "border-top-color": "#ccc",
        "border-top-style": "solid",
        "border-top-width": "1px",

        "border-right-color": "#ccc",
        "border-right-style": "solid",
        "border-right-width": "0px",

        "border-bottom-color": "#ccc",
        "border-bottom-style": "solid",
        "border-bottom-width": "1px",

        "border-left-color": "#ccc",
        "border-left-style": "solid",
        "border-left-width": "1px",
    })

    return style
}

const netPromoterScoreStyle = async (): Promise<Style> => {
    let style = await window._myWebflow.getStyleByName(styleNames.NET_PROMOTER_SCORE);
    if (style) return style;

    style = window._myWebflow.createStyle(styleNames.NET_PROMOTER_SCORE);
    style.setProperties({
        width: "45px",
        height: "36px",

        display: "flex",
        "flex-grow": "1",
        "align-items": "center",
        "justify-content": "center",

        "font-size": "16px",
        "font-weight": "600",

        "border-right-color": "#ccc",
        "border-right-style": "solid",
        "border-right-width": "1px",

        cursor: "pointer"
    })

    style.setProperties({
        "background-color": "#000000",
        color: "#ffffff"
    }, {pseudo: "hover"})

    return style
}

//Net Promoter Score style End


const formFieldsWrapperDiv = async (withMargin = true): Promise<DOMElement> => {
    const div = window._myWebflow.createDOM("div");

    const styles = [];
    styles.push(await formFieldsWrapperStyle());

    if (withMargin) styles.push(await formFieldsMarginBottomStyle());

    div.setStyles(styles);

    return div;
};

const createLabelElement = async (label: string): Promise<DOMElement> => {
    const element = window._myWebflow.createDOM("span");
    element.setTextContent(label);

    const style = await dropdownLabelStyle();
    element.setStyles([style]);

    return element;
};

const createDropdownListItems = async (inputName: string, items: string[]) => {
    const listItems: DOMElement[] = [];
    const listItemStyle = await dropdownItemStyle();

    for (let item of items) {
        const el = window._myWebflow.createDOM("li");
        el.setStyles([listItemStyle]);

        el.setTextContent(item);
        // el.setAttribute("class", "w-dropdown-link");
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

const createDropdownList = async (inputName: string, items: string[], colorConfig: DropdownColorConfig) => {
    const list = window._myWebflow.createDOM("ul");
    const style = await dropdownListUlStyle();
    list.setStyles([style]);

    // list.setAttribute("class", "w-dropdown-list");
    list.setAttribute("form-field-dropdown-item-list", "true");
    list.setAttribute("dropdown-name", inputName);
    attachColorConfigAttributesToDropdownList(list, colorConfig);

    const listItems = await createDropdownListItems(inputName, items);
    list.setChildren(listItems);

    const listWrapper = await createDropdownListWrapper();
    listWrapper.setChildren([list]);

    return listWrapper;
};

const createSearchableDropdownNoItemFound = async (inputName: string, message: string) => {
    const div = window._myWebflow.createDOM("div");
    const listItemStyle = await dropdownItemStyle();
    div.setStyles([listItemStyle]);
    // div.setAttribute("class", "w-dropdown-list");
    div.setTextContent(message);

    const list = window._myWebflow.createDOM("div");
    const listStyle = await dropdownListUlStyle();
    list.setStyles([listStyle]);
    list.setAttribute("form-field-searchable-dropdown-no-item-found", "true");
    list.setAttribute("dropdown-name", inputName);
    list.setChildren([div]);

    const outerWrapper = await createDropdownListWrapper();
    outerWrapper.setChildren([list]);

    return outerWrapper;
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

const createSearchableDropdownSelector = async (inputName: string) => {
    const input = searchableDropdownInputElement(inputName);
    const inputStyle = await dropdownSearchableInputStyle();
    input.setStyles([inputStyle]);

    const selectorDiv = window._myWebflow.createDOM("div");
    const style = await dropdownWrapperStyle();
    selectorDiv.setStyles([style]);

    selectorDiv.setAttribute("form-field-dropdown-toggler-selected-value", "true");
    // selectorDiv.setAttribute("form-field-searchable-dropdown-toggler", "true");
    selectorDiv.setAttribute("dropdown-name", inputName);
    selectorDiv.setChildren([input]);

    return selectorDiv;
};

const createDropdownSelectorIcon = async () => {
    const icon = webflowIcons.CHEVRON_DOWN();
    return icon;
};

const createDropdownTogglerContent = async (inputName: string, searchable = false) => {
    const icon = await createDropdownSelectorIcon();
    const selector = searchable ? await createSearchableDropdownSelector(inputName) : createDropdownSelector(inputName);

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
                                  ...colorConfig
                              }: {
    label: string;
    inputName: string;
    items: string[];
    searchable?: boolean;
    noItemFoundMessage?: string;
} & DropdownColorConfig): Promise<DOMElement> => {
    const dropdownToggler = await createDropdownToggler(label, inputName, searchable);
    const dropdownList = await createDropdownList(inputName, items, colorConfig);

    const dropdownWrapper = await createDropdownWrapper();

    if (!searchable) dropdownWrapper.setChildren([dropdownToggler, dropdownList]);
    else {
        const noItemFound = await createSearchableDropdownNoItemFound(inputName, noItemFoundMessage as string);
        dropdownWrapper.setChildren([dropdownToggler, dropdownList, noItemFound]);
    }

    return dropdownWrapper;
};

const createInputElement = (name: string, type: "text" | "hidden" | "number" | "email" | "url"): DOMElement => {
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

const createDateInputElement = ({
                                    inputName,
                                    columns,
                                    dateFormat,
                                    firstDayOfWeek,
                                    language,
                                    numberOfMonthsToShow,
                                    zIndex,
                                }: Pick<
    DateParams,
    "inputName" | "columns" | "dateFormat" | "firstDayOfWeek" | "language" | "numberOfMonthsToShow" | "zIndex"
>) => {
    const inputElement = createInputElement(inputName, "text");

    inputElement.setAttribute("data-columns", columns);
    inputElement.setAttribute("data-format", dateFormat);
    inputElement.setAttribute("data-firstDay", firstDayOfWeek);
    inputElement.setAttribute("data-language", language);
    inputElement.setAttribute("data-months", numberOfMonthsToShow);
    inputElement.setAttribute("data-zIndex", zIndex);

    return inputElement;
};

const createDateInputIcon = async () => {
    const iconDiv = window._myWebflow.createDOM("div");

    const absolutePositionStyle = await positionAbsoluteStyle();
    const iconStyle = await dateInputIconStyle();
    iconDiv.setStyles([absolutePositionStyle, iconStyle]);

    const icon = webflowIcons.CALENDER();
    iconDiv.setChildren([icon]);

    return iconDiv;
};

const attachColorConfigAttributesToDateInput = (inputElement: DOMElement, config: DateColorConfig) => {
    inputElement.setAttribute(
        DateColorConfigKeys.lightThemeSelectedDateTextColor,
        config.lightThemeSelectedDateTextColor || ""
    );
    inputElement.setAttribute(
        DateColorConfigKeys.darkThemeSelectedDateTextColor,
        config.darkThemeSelectedDateTextColor || ""
    );

    inputElement.setAttribute(
        DateColorConfigKeys.lightThemeSelectedDateBackgroundColor,
        config.lightThemeSelectedDateBackgroundColor || ""
    );
    inputElement.setAttribute(
        DateColorConfigKeys.darkThemeSelectedDateBackgroundColor,
        config.darkThemeSelectedDateBackgroundColor || ""
    );

    inputElement.setAttribute(DateColorConfigKeys.lightThemeTodayColor, config.lightThemeTodayColor || "");
    inputElement.setAttribute(DateColorConfigKeys.darkThemeTodayColor, config.darkThemeTodayColor || "");

    return inputElement;
};

const attachColorConfigAttributesToSliderInput = (inputElement: DOMElement, config: SliderColorConfig) => {
    inputElement.setAttribute(sliderColorConfigKeys.lightThemeSliderColor, config.lightThemeSliderColor || "");
    inputElement.setAttribute(sliderColorConfigKeys.darkThemeSliderColor, config.darkThemeSliderColor || "");

    inputElement.setAttribute(
        sliderColorConfigKeys.lightThemeMaxMinValueTextColor,
        config.lightThemeMaxMinValueTextColor || ""
    );
    inputElement.setAttribute(
        sliderColorConfigKeys.darkThemeMaxMinValueTextColor,
        config.darkThemeMaxMinValueTextColor || ""
    );

    inputElement.setAttribute(sliderColorConfigKeys.lightThemeTooltipTextColor, config.lightThemeTooltipTextColor || "");
    inputElement.setAttribute(sliderColorConfigKeys.darkThemeTooltipTextColor, config.darkThemeTooltipTextColor || "");

    return inputElement;
};

const attachColorConfigAttributesToDropdownList = (listElement: DOMElement, config: DropdownColorConfig) => {
    listElement.setAttribute(DropdownColorConfigKeys.lightThemeHoverTextColor, config.lightThemeHoverTextColor || "");
    listElement.setAttribute(DropdownColorConfigKeys.darkThemeHoverTextColor, config.darkThemeHoverTextColor || "");

    listElement.setAttribute(
        DropdownColorConfigKeys.lightThemeHoverBackgroundColor,
        config.lightThemeHoverBackgroundColor || ""
    );
    listElement.setAttribute(
        DropdownColorConfigKeys.darkThemeHoverBackgroundColor,
        config.darkThemeHoverBackgroundColor || ""
    );

    return listElement;
};

export const insertDropdownToForm = async ({
                                               label,
                                               items,
                                               inputName,
                                               form,
                                               ...colorConfig
                                           }: DropdownParams & DropdownColorConfig) => {
    const dropdownDiv = await createDropdown({label, inputName, items, ...colorConfig});
    const input = hiddenDropdownInputElement(inputName);

    const wrapperDiv = await formFieldsWrapperDiv();
    wrapperDiv.setChildren([dropdownDiv, input]);
    wrapperDiv.setAttribute("form-fields-type", "select");

    const existingChilds = form.getChildren();

    form.setChildren([...existingChilds, wrapperDiv]);
    await form.save();
};

export const insertSearchableDropdownToForm = async ({
                                                         label,
                                                         items,
                                                         inputName,
                                                         form,
                                                         noItemFoundMessage,
                                                         ...colorConfig
                                                     }: DropdownParams & DropdownColorConfig) => {
    const dropdownDiv = await createDropdown({
        label,
        inputName,
        items,
        searchable: true,
        noItemFoundMessage,
        ...colorConfig,
    });

    const wrapperDiv = await formFieldsWrapperDiv();
    wrapperDiv.setChildren([dropdownDiv]);
    wrapperDiv.setAttribute("form-fields-type", "select");
    wrapperDiv.setAttribute("data-searchable", "true");

    const existingChilds = form.getChildren();

    form.setChildren([...existingChilds, wrapperDiv]);
    await form.save();
};

export const insertNumberSliderToForm = async ({
                                                   label,
                                                   inputName,
                                                   maxRange,
                                                   minRange,
                                                   defaultValue,
                                                   form,
                                                   ...colorConfig
                                               }: NumberSliderParams & SliderColorConfig) => {
    const labelElement = await createLabelElement(label);

    const inputElement = createInputElement(inputName, "hidden");
    attachColorConfigAttributesToSliderInput(inputElement, colorConfig);
    inputElement.setAttribute("form-fields-pro-number-slider", "true");
    inputElement.setAttribute("data-max", String(maxRange));
    inputElement.setAttribute("data-min", String(minRange));
    inputElement.setAttribute("data-default", String(defaultValue));

    const wrapperDiv = await formFieldsWrapperDiv();
    wrapperDiv.setChildren([labelElement, inputElement]);

    const existingChilds = form.getChildren();
    form.setChildren([...existingChilds, wrapperDiv]);
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
                                                        ...colorConfig
                                                    }: NumberSliderParams & SliderColorConfig) => {
    const labelElement = await createLabelElement(label);

    const inputElement = createInputElement(inputName, "hidden");
    attachColorConfigAttributesToSliderInput(inputElement, colorConfig);
    inputElement.setAttribute("form-fields-pro-number-slider", "true");
    inputElement.setAttribute("data-max", String(maxRange));
    inputElement.setAttribute("data-min", String(minRange));
    inputElement.setAttribute("data-max-default", String(defaultMax));
    inputElement.setAttribute("data-min-default", String(defaultMin));
    inputElement.setAttribute("allow-range", "true");

    const wrapperDiv = await formFieldsWrapperDiv();
    wrapperDiv.setChildren([labelElement, inputElement]);

    const existingChilds = form.getChildren();
    form.setChildren([...existingChilds, wrapperDiv]);
    await form.save();
};

export const insertDatePickerToForm = async (options: DateParams & DateColorConfig) => {
    const inputElement = createDateInputElement(options);
    inputElement.setAttribute("form-fields-pro-date-picker", "true");
    attachColorConfigAttributesToDateInput(inputElement, options);

    inputElement.setStyles([await dropdownTogglerStyle(), await dropdownWrapperStyle(), await backgroundWhiteStyle()]);

    const icon = await createDateInputIcon();

    const inputWithIconWrapper = window._myWebflow.createDOM("div");
    inputWithIconWrapper.setStyles([await fullWidthRelativePositionStyle()]);
    inputWithIconWrapper.setChildren([inputElement, icon]);

    const {label, form} = options;
    const labelElement = await createLabelElement(label);

    const wrapperDiv = await formFieldsWrapperDiv();
    wrapperDiv.setChildren([labelElement, inputWithIconWrapper]);

    const existingChilds = form.getChildren();
    form.setChildren([...existingChilds, wrapperDiv]);
    await form.save();
};

export const insertDateRangePickerToForm = async (options: DateParams & DateColorConfig) => {
    const inputElement = createDateInputElement(options);
    inputElement.setAttribute("form-fields-pro-date-range-picker", "true");
    attachColorConfigAttributesToDateInput(inputElement, options);
    inputElement.setStyles([await dropdownTogglerStyle(), await dropdownWrapperStyle(), await backgroundWhiteStyle()]);

    const icon = await createDateInputIcon();

    const inputWithIconWrapper = window._myWebflow.createDOM("div");
    inputWithIconWrapper.setStyles([await fullWidthRelativePositionStyle()]);
    inputWithIconWrapper.setChildren([inputElement, icon]);

    const {label, form} = options;
    const labelElement = await createLabelElement(label);

    const wrapperDiv = await formFieldsWrapperDiv();
    wrapperDiv.setChildren([labelElement, inputWithIconWrapper]);

    const existingChilds = form.getChildren();
    form.setChildren([...existingChilds, wrapperDiv]);
    await form.save();
};

export const insertUserIpInputToForm = async ({inputName, form}: Pick<DropdownParams, "form" | "inputName">) => {
    const inputElement = createInputElement(inputName, "hidden");
    inputElement.setAttribute("form-fields-pro-user-ip-input", "true");

    const adminFeedback = window._myWebflow.createDOM("div");
    adminFeedback.setAttribute("form-fields-pro-user-ip-admin-alert", "true");
    adminFeedback.setTextContent("Collecting User IP");

    const style = await userIpInputAlertStyle();
    adminFeedback.setStyles([style]);

    const wrapperDiv = await formFieldsWrapperDiv(false);
    wrapperDiv.setChildren([adminFeedback, inputElement]);

    const existingChilds = form.getChildren();
    form.setChildren([...existingChilds, wrapperDiv]);
    await form.save();
};


// Number input field

export const insertNumberInputToForm = async ({form, label, inputName, placeholderText}: NumberInputParams) => {

    const icon = await createDropdownSelectorIcon();

    const iconWrapper = window._myWebflow.createDOM("div");
    iconWrapper.setStyles([await numberInputIconWrapperStyle()])
    iconWrapper.setChildren([icon])

    const inputElement = createInputElement(inputName, "number");
    inputElement.setAttribute('placeholder', placeholderText)
    const inputStyle = await numberInputFieldStyle()
    inputElement.setStyles([inputStyle])

    const orderList = window._myWebflow.createDOM("ol")
    orderList.setStyles([await numberInputDropdownListStyle()])

    const searchInput = window._myWebflow.createDOM("input")
    searchInput.setAttribute('placeholder', 'search country code')
    searchInput.setStyles([await dropdownSearchableInputStyle(), await numberInputSearchFieldStyle()])

    const dropdown = window._myWebflow.createDOM("div")
    dropdown.setStyles([await numberInputDropdownStyle()])
    dropdown.setChildren([searchInput, orderList])

    const inputWithIconWrapper = window._myWebflow.createDOM("div");
    inputWithIconWrapper.setStyles([await fullWidthRelativePositionStyle(), await numberInputWrapperStyle()]);
    inputWithIconWrapper.setChildren([iconWrapper, inputElement, dropdown]);

    const labelElement = await createLabelElement(label)

    const wrapperDiv = await formFieldsWrapperDiv();
    wrapperDiv.setChildren([labelElement, inputWithIconWrapper]);

    const existingChilds = form.getChildren();
    form.setChildren([...existingChilds, wrapperDiv]);
    await form.save();
}


// Color Picker Input
export const insertColorPickerToForm = async ({label, inputName, form, defaultColor}: ColorPickerParams) => {

    const inputElement = createInputElement(inputName, "text");
    inputElement.setAttribute('data-field', 'color-input-field')
    inputElement.setAttribute('class', 'color-input')
    inputElement.setAttribute('value', defaultColor)

    const colorPickerContainer = window._myWebflow.createDOM('div')
    colorPickerContainer.setStyles([await colorPickerContainerStyle()])
    colorPickerContainer.setChildren([inputElement])

    const labelElement = await createLabelElement(label);

    const wrapperDiv = await formFieldsWrapperDiv();
    wrapperDiv.setChildren([labelElement, colorPickerContainer]);

    const existingChilds = form.getChildren();
    form.setChildren([...existingChilds, wrapperDiv]);
    await form.save();

}

// File Uploader Field
export const insertFileUploaderToForm = async ({
                                                   form,
                                                   label,
                                                   inputName,
                                                   borderColor,
                                                   borderStyle,
                                                   ...config
                                               }: FileUploaderParams & FileUploaderConfigKeys) => {

    const inputElement = createInputElement(inputName, "hidden");

    const labelElement = await createLabelElement(label);

    const dropzone = window._myWebflow.createDOM('div')
    dropzone.setStyles([await dropzoneStyle(borderColor, borderStyle)])
    dropzone.setAttribute(fileUploaderConfigKeys.acceptedFiles, config.acceptedFiles || '')
    dropzone.setAttribute(fileUploaderConfigKeys.maxFiles, config.maxFiles || '')
    dropzone.setAttribute(fileUploaderConfigKeys.maxFileSize, config.maxFileSize || '')
    dropzone.setAttribute('data-color', borderColor || '')
    dropzone.setAttribute('id', inputName + Date.now())
    dropzone.setChildren([inputElement])

    const wrapperDiv = await formFieldsWrapperDiv();
    wrapperDiv.setChildren([labelElement, dropzone]);

    console.log(borderStyle)

    const existingChilds = form.getChildren();
    form.setChildren([...existingChilds, wrapperDiv]);
    await form.save();
}


// Email Field
export const insertEmailToForm = async ({
                                            emailLabel,
                                            emailFieldName,
                                            placeholder,
                                            invalidErrorMessage,
                                            emptyErrorMessage,
                                            form
                                        }: EmailParams) => {

    const labelElement = await createLabelElement(emailLabel);

    const inputElement = createInputElement(emailFieldName, "email")
    inputElement.setAttribute('id', 'form-field-pro-email')
    inputElement.setAttribute('placeholder', placeholder)
    // inputElement.setAttribute('required', 'true')
    inputElement.setAttribute('data-email', 'form-field-pro-email')
    inputElement.setAttribute('data-empty-error-msg', emptyErrorMessage)
    inputElement.setAttribute('data-invalid-error-msg', invalidErrorMessage)
    inputElement.setStyles([await dropdownTogglerStyle(), await dropdownWrapperStyle(), await backgroundWhiteStyle()])

    const errorMessage = window._myWebflow.createDOM('span')
    errorMessage.setAttribute('id', 'email-error-message')
    errorMessage.setStyles([await emailErrorMessageStyle()])

    const wrapperDiv = await formFieldsWrapperDiv();
    wrapperDiv.setChildren([labelElement, inputElement, errorMessage]);

    const existingChilds = form.getChildren();
    form.setChildren([...existingChilds, wrapperDiv]);
    await form.save();

}

// net promoter score field

const createNetPromoterSmallLabel = async (label: string): Promise<DOMElement> => {
    const element = window._myWebflow.createDOM("span");
    element.setTextContent(label);

    const style = await netPromoterSmallStyle()

    element.setStyles([style]);

    return element;
}

const createNetPromoterListItems = async (): Promise<DOMElement[]> => {

    const listItems: DOMElement[] = []

    const items = Array.from({length: 11}, (_, index) => index.toString());

    const style = await netPromoterScoreStyle()

    for (const item of items) {
        const el = window._myWebflow.createDOM("span");
        el.setAttribute('data-name', 'net-promoter-score-value')
        el.setStyles([style]);
        el.setTextContent(item);

        listItems.push(el)
    }

    return listItems

}

const attachConfigAttributesToNetPromoterInput = (element: DOMElement, config: NetPromoterConfig) => {

    element.setAttribute(NetPromoterConfigKeys.lightThemeHoverTextColor, config.lightThemeHoverTextColor || '')
    element.setAttribute(NetPromoterConfigKeys.lightThemeHoverBackgroundColor, config.lightThemeHoverBackgroundColor || '')

    element.setAttribute(NetPromoterConfigKeys.darkThemeHoverTextColor, config.darkThemeHoverTextColor || '')
    element.setAttribute(NetPromoterConfigKeys.darkThemeHoverBackgroundColor, config.darkThemeHoverBackgroundColor || '')

    element.setAttribute(NetPromoterConfigKeys.extraFeedbackCollection, config.extraFeedbackCollection || '')

    element.setAttribute(NetPromoterConfigKeys.errorMessage, config.errorMessage || '')

    element.setAttribute('data-field-name', 'net-promoter-score')

}


export const insertNetPromoterScoreToForm = async ({
                                                       lowScoreLabel,
                                                       label,
                                                       heightScoreLabel,
                                                       form,
                                                       extraFieldLabel,
                                                       extraFieldName,
                                                       scoreFieldName,
                                                       ...config
                                                   }: NetPromoterScoreParams & NetPromoterConfig) => {

    const labelElement = await createLabelElement(label);

    const inputElement = createInputElement(scoreFieldName, 'hidden')
    inputElement.setAttribute('data-input', 'net-promoter-score')

    const lowScoreLabelElement = await createNetPromoterSmallLabel(lowScoreLabel)
    const heighScoreLabelElement = await createNetPromoterSmallLabel(heightScoreLabel)

    const labelWrapper = window._myWebflow.createDOM('div')
    labelWrapper.setStyles([await netPromoterLabelWrapperStyle()])
    labelWrapper.setChildren([lowScoreLabelElement, heighScoreLabelElement])

    const errorMessage = window._myWebflow.createDOM('span')
    errorMessage.setStyles([await emailErrorMessageStyle()])

    const listItems = await createNetPromoterListItems()

    const listItemWrapper = window._myWebflow.createDOM('div')
    listItemWrapper.setStyles([await netPromoterScoreWrapperStyle()])
    listItemWrapper.setChildren(listItems)

    const inputWrapper = window._myWebflow.createDOM('div')
    inputWrapper.setStyles([await formFieldsMarginBottomStyle()])
    inputWrapper.setChildren([labelWrapper, inputElement, errorMessage, listItemWrapper])

    const extraFieldLabelElement = await createLabelElement(extraFieldLabel);

    const extraField = window._myWebflow.createDOM('textarea')
    extraField.setAttribute('name', extraFieldName)
    extraField.setStyles([await netPromoterExtraInputStyle()])

    const extraFieldWrapper = window._myWebflow.createDOM('div')
    extraFieldWrapper.setAttribute('data-field', 'extra-feedback-collection')
    extraFieldWrapper.setChildren([extraFieldLabelElement, extraField])

    const wrapperDivRoot = await formFieldsWrapperDiv();
    attachConfigAttributesToNetPromoterInput(wrapperDivRoot, config)

    if (config.extraFeedbackCollection === 'never') {
        wrapperDivRoot.setChildren([labelElement, inputWrapper]);
    } else {
        wrapperDivRoot.setChildren([labelElement, inputWrapper, extraFieldWrapper]);
    }

    const existingChilds = form.getChildren();
    form.setChildren([...existingChilds, wrapperDivRoot]);
    await form.save();


}


// URL Field

export const insertUrlFieldToForm = async ({
                                               form,
                                               label,
                                               inputFieldName,
                                               autofocus,
                                               required,
                                               placeholder
                                           }: UrlFieldParams) => {

    const labelElement = await createLabelElement(label)

    const inputElement = createInputElement(inputFieldName, "url")

    if (required) {
        inputElement.setAttribute('required', `${required}`)
    }

    if (autofocus) {
        inputElement.setAttribute('autofocus', `${autofocus}`)
    }

    inputElement.setAttribute('placeholder', placeholder)
    inputElement.setStyles([await dropdownTogglerStyle(), await dropdownWrapperStyle(), await backgroundWhiteStyle()])

    const errorMessage = window._myWebflow.createDOM('span')
    errorMessage.setStyles([await emailErrorMessageStyle()])

    const wrapperDiv = await formFieldsWrapperDiv();
    wrapperDiv.setChildren([labelElement, inputElement, errorMessage])

    const existingChilds = form.getChildren();
    form.setChildren([...existingChilds, wrapperDiv]);
    await form.save();
}