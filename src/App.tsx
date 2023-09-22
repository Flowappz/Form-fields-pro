import { useEffect, useState } from "react";
import "./App.css";
import Home from "./views/Home";

declare global {
  interface Window {
    _myWebflow: typeof webflow;
  }
}

function App() {
  const [selectedelement, setSelectedElement] = useState<AnyElement | null>(null);

  useEffect(function listenToElementSelectonChange() {
    window._myWebflow.subscribe("selectedelement", (element) => setSelectedElement(element));
  }, []);

  return <Home selectedElement={selectedelement} />;
}

export default App;
