import { PropsWithChildren } from "react";
import "../styles/Home.css";

type props = {
  selectedElement: AnyElement | null;
};

export default function Home({ selectedElement }: PropsWithChildren<props>) {
  return (
    <div className="home-container p-50">
      <div className="d-flex flex-align-center p-20" style={{ minWidth: "50%" }}>
        <h1 className="text-3xl font-bold underline">Form Fields Pro</h1>
      </div>
      <div className="d-flex flex-align-center p-20">
        <div className="card" style={{ background: "darkslategrey" }}>
          <p>
            Your current selected element type is <strong>{selectedElement?.type}</strong>. Please select a form element in the designer to continue.
          </p>
        </div>
      </div>
    </div>
  );
}
