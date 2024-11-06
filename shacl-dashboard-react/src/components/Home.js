import React from "react";
import { useNavigate } from "react-router-dom";
import '../style/Home.css';

function Home() {
  const navigate = useNavigate();

  const goToUploadFile = () => {
    navigate('/upload');
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100" id="main-container">
      <div className="text-center">
        <h1 className="display-4 mb-4" id="main-header">SHACL Dashboard</h1>
        <p className="lead text-muted mb-5">A professional tool for analyzing your SHACL validation reports.</p>
        <button
          onClick={goToUploadFile}
          className="custom-btn btn-lg px-5 py-3 shadow-lg"
        >
          Upload File
        </button>
      </div>
      <footer className="mt-auto text-center text-muted py-4">
        <p>&copy; 2024 SHACL Dashboard | Developed by Alissa Wang and Lukas Manz</p>
      </footer>
    </div>
  );
}

export default Home;