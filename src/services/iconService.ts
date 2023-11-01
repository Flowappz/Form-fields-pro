const calendar = (): DOMElement => {
  const svg = window._myWebflow.createDOM("svg");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  const path1 = window._myWebflow.createDOM("path");
  path1.setAttribute(
    "d",
    "M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
  );
  path1.setAttribute("stroke", "black");
  path1.setAttribute("stroke-width", "2");
  path1.setAttribute("stroke-linecap", "round");
  path1.setAttribute("stroke-linejoin", "round");

  const path2 = window._myWebflow.createDOM("path");
  path2.setAttribute("d", "M16 2V6");
  path2.setAttribute("stroke", "black");
  path2.setAttribute("stroke-width", "2");
  path2.setAttribute("stroke-linecap", "round");
  path2.setAttribute("stroke-linejoin", "round");

  const path3 = window._myWebflow.createDOM("path");
  path3.setAttribute("d", "M8 2V6");
  path3.setAttribute("stroke", "black");
  path3.setAttribute("stroke-width", "2");
  path3.setAttribute("stroke-linecap", "round");
  path3.setAttribute("stroke-linejoin", "round");

  const path4 = window._myWebflow.createDOM("path");
  path4.setAttribute("d", "M3 10H21");
  path4.setAttribute("stroke", "black");
  path4.setAttribute("stroke-width", "2");
  path4.setAttribute("stroke-linecap", "round");
  path4.setAttribute("stroke-linejoin", "round");

  svg.setChildren([path1, path2, path3, path4]);

  return svg;
};

const chevronDown = (): DOMElement => {
  const svg = window._myWebflow.createDOM("svg");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  const path = window._myWebflow.createDOM("path");
  path.setAttribute("d", "M6 9L12 15L18 9");
  path.setAttribute("stroke", "black");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");

  svg.setChildren([path]);

  return svg;
};


const ICON_NAMES = {
  CALENDER: "calender",
  CHEVRON_DOWN: "chevron_down",
} as const;

type iconKeys = keyof typeof ICON_NAMES;
type iconNames = (typeof ICON_NAMES)[iconKeys];

export const webflowIcons: { [x in iconNames]: DOMElement } = {};
