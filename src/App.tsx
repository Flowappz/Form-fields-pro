import "./App.css";

declare global {
  interface Window {
    _myWebflow: typeof webflow;
  }
}

function App() {
  return <h1>Form Fields Pro</h1>;
}

export default App;
