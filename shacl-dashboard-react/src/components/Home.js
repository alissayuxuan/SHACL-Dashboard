import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../style/Home.css';

function Home() {
  const navigate = useNavigate();

  const goToUploadFile = () => {
    navigate('/upload');
  };
  /*
  return (
    <div className="main-container">
      <img></img>
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
  */

 return (
    <div className="main-container">
      {/* Navigation Bar */}
      <nav className="navbar-home">
          <h1>SHACL Dashboard</h1>
          <div className="navbar-menu">
            <ul className="nav-links">
              <li><a href="#FeatureSection">Features</a></li>
              <li><a href="#InstructionSection">Instructions</a></li>
              <li><button className="navbar-btn" onClick={goToUploadFile}>Upload</button></li>
            </ul>
          </div>
          
      </nav>

      {/* Main Section */}
      <main>
        <div className="header">
          <div className="header-description">
            <h1 className="title">Upload your SHACL Validation Report</h1>
            <p className="title-description">
              Our tool helps you analyze and visualize your SHACL validation reports with ease. 
              Generate detailed dashboards to understand your data and resolve issues quickly.
            </p>
            <button className="upload-button" onClick={goToUploadFile}>Upload Now</button>
          </div>
          <img className="title-img" src="/images/dashboard_illustration.jpg" />
        </div>

        {/* Feature Section */}
        <h1 className="title" id="FeatureSection">Our Features.</h1>
        <div className="features">
          <div className="feature">
            <img className="feature-img" src="/images/dash1.png" alt="Feature 1" />
            <h3>Visualize Data</h3>
            <p>Get an interactive dashboard for your validation reports.</p>
            <button className="feature-btn">Learn more</button>
          </div>
          <div className="feature">
            <img className="feature-img" src="/images/dash2.png" alt="Feature 2" />
            <h3>Analyze Violations</h3>
            <p>Break down constraint violations and pinpoint problems.</p>
            <button className="feature-btn">Learn more</button>
          </div>
          <div className="feature">
            <img className="feature-img" src="/images/dash2.png" alt="Feature 3" />
            <h3>Search Violations</h3>
            <p>Filter out certain violations based on your individualized search.</p>
            <button className="feature-btn">Learn more</button>
          </div>
          <div className="feature">
            <img className="feature-img" src="/images/dash3.png" alt="Feature 4" />
            <h3>Export Insights</h3>
            <p>Download summarized reports for easy sharing and documentation.</p>
            <button className="feature-btn">Learn more</button>
          </div>
        </div>


        {/* Instruction Section */}
        {/* <h1>How to use our tool.</h1>
        <div className="instructions">
          <div className="instruction">
            <img className="instruction-img" src="/images/dashboard_img.png" alt="Feature 1" />
            <div className="instruction-description">
              <h2>1. Upload Data</h2>
              <p>Upload your SHACL Validation Report in .ttl/.xml/.rdf format.</p>
            </div>
          </div>

          <div className="instruction">
            <div className="instruction-description">
              <h2>2. Overview Dashboard</h2>
              <p>The main statistics of your SHACL Validation Report will be displayed in an Overview Dashboard.</p>
            </div>
            <img className="instruction-img" src="/images/dash1.png" alt="Feature 2" />
          </div>

          <div className="instruction">
            <img className="instruction-img" src="/images/dash2.png" alt="Feature 3" />
            <div className="instruction-description">            
              <h2>3. Filter Dashboard</h2>
              <p>Filter out which ViolationTypes/ FocusNodes/ ResultPaths you want to have a closer look at. The analyzed statistics will be displayed in a Filter Dashboard.</p>
            </div>
          </div>

          <div className="instruction">
            <img className="instruction-img" src="/images/dash2.png" alt="Feature 3" />
            <div className="instruction-description">            
              <h2>4. Search Violation</h2>
              <p>Enter information of ViolationType, FocusNode, ResultPath and display all Violation Entries in your SHACL Validation Report that meet your request. </p>
            </div>
          </div>

        </div>*/}
        <h1 className="title" id="InstructionSection">How to use our tool.</h1>
        <div className="instructions">
          <div className="instruction">
            <img className="instruction-img" src="/images/instructions.png" alt="Feature 3" />
            <div className="instruction-description"> 
              <div className="instruction-step">          
                <h2>1. Upload Data</h2>
                <p>Upload your SHACL Validation Report in .ttl/.xml/.rdf format.</p>  
              </div> 
              <div className="instruction-step">          
                <h2>2. Overview Dashboard</h2>
                <p>The main statistics of your SHACL Validation Report will be displayed 
                  in an Overview Dashboard.</p>
              </div>
              <div className="instruction-step">          
                <h2>3. Filter Dashboard</h2>
                <p>Filter out which ViolationTypes/ FocusNodes/ ResultPaths you want to have a 
                  closer look at. The analyzed statistics will be displayed in a Filter Dashboard.</p>
              </div>
              <div className="instruction-step">          
                <h2>4. Search Violation</h2>
                <p>Enter information of ViolationType, FocusNode, ResultPath and display all Violation 
                  Entries in your SHACL Validation Report that meet your request. </p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-container">
          <h2>Get Started</h2>
          <p>Start analysing your SHACL Validation Report now and figure out where the main issues 
            of your Knowledge Graphs are originated from.</p>
          <button className="upload-button" onClick={goToUploadFile}>Upload File</button>
        </div>


      </main>
    </div>
 );
}

export default Home;