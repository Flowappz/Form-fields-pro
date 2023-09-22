import "./App.css";
import Home from "./views/Home";

declare global {
  interface Window {
    _myWebflow: typeof webflow;
  }
}

function App() {
  return <Home />;
}

export default App;
