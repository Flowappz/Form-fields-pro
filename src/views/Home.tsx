import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home-container p-50">
      <div className="d-flex flex-align-center p-20">
        <h1 className="text-decoration-underline">Form Fields Pro</h1>
      </div>
      <div className="d-flex flex-align-center p-20">
        <div className="card" style={{ background: "darkslategrey" }}>
          <p>Please select a form element in the designer to continue...</p>
        </div>
      </div>
    </div>
  );
}
