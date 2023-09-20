function removeAllChildFromElement(element: HTMLElement) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

document.getElementById("lorem").onsubmit = async (event) => {
  event.preventDefault();

  const el = await webflow.getSelectedElement();
};
