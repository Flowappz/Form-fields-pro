import { useEffect, useState } from "react";
import "./App.css";
import Home from "./views/Home";
import CustomDropdown from "./views/CustomDropdown";

declare global {
  interface Window {
    _myWebflow: typeof webflow;
  }
}

enum Views {
  HOME,
  CUSTOM_DROPDOWN,
}

function App() {
  const [selectedelement, setSelectedElement] = useState<AnyElement | null>(null);
  const [formElement, setFormElement] = useState<FormFormElement | FormWrapperElement | null>(null);
  const [view, setView] = useState(Views.HOME);

  useEffect(function listenToElementSelectonChange() {
    window._myWebflow.subscribe("selectedelement", (element) => setSelectedElement(element));
  }, []);

  useEffect(
    function changeView() {
      if (selectedelement?.type === "FormForm" || selectedelement?.type === "FormWrapper") {
        setView(Views.CUSTOM_DROPDOWN);
        setFormElement(selectedelement);
      }
    },
    [selectedelement]
  );

  switch (view) {
    case Views.CUSTOM_DROPDOWN:
      return <CustomDropdown form={formElement} />;
    default:
      return <Home selectedElement={selectedelement} />;
  }
}

export default App;
