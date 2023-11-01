const ICON_NAMES = {
  CALENDER: "calender",
  CHEVRON_DOWN: "chevron_down",
} as const;

type iconKeys = keyof typeof ICON_NAMES;
type iconNames = (typeof ICON_NAMES)[iconKeys];

export const webflowIcons: { [x in iconNames]: DOMElement } = {};
