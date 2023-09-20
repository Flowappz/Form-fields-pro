function removeAllChildFromElement(element: HTMLElement) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function displayFormSelectionError(element: AnyElement) {
  const elementInfoBox = document.getElementById("selectedElementInfo");
  removeAllChildFromElement(elementInfoBox);

  elementInfoBox.appendChild(document.createTextNode(`Please select a form elment to continue! Your selected element type is ${element.type}`));
}

function displayCorrectSelection(element: AnyElement) {
  const elementInfoBox = document.getElementById("selectedElementInfo");
  removeAllChildFromElement(elementInfoBox);

  elementInfoBox.appendChild(document.createTextNode(`OK! Your selected element type is ${element.type}`));
}

document.getElementById("lorem").onsubmit = async (event) => {
  event.preventDefault();

  const el = await webflow.getSelectedElement();

  if (!(el.type === "FormWrapper" || el.type === "FormForm")) {
    displayFormSelectionError(el);
  } else displayCorrectSelection(el);
};
