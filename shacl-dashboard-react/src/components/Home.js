import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Model from 'react-modal';
import '../style/Home.css';

function Home() {
  const navigate = useNavigate();

  const [overviewFeatureOpen, setOverviewFeatureOpen] = useState(false);
  const [filterFeatureOpen, setFilterFeatureOpen] = useState(false);
  const [searchFeatureOpen, setSearchFeatureOpen] = useState(false);
  const [downloadFeatureOpen, setDownloadFeatureOpen] = useState(false);

  const goToUploadFile = () => {
    navigate('/upload');
  };

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
            <p>Visualize the data of your validation report in a dashboard.</p>
            <button className="feature-btn" onClick={() => setOverviewFeatureOpen(true)}>Learn more</button>
          </div>

          <Model isOpen={overviewFeatureOpen} onRequestClose={() => setOverviewFeatureOpen(false)} className="feature-model">
            <div className="feature-container">
              <button className="feature-closeButton" onClick={() => setOverviewFeatureOpen(false)}>&times;</button>
              <h1>Visualize Data</h1>
              <p>Upload your validation report, and we'll create an overview dashboard with all the information you need at a glance.</p>
              <div className="feature-content">
                <img className="featureInstruction-img" src="/images/overviewFeature1.png" alt="Feature 1" />
                <img className="featureInstruction-img" src="/images/overviewFeature2.png" alt="Feature 2" />
                <img className="featureInstruction-img" src="/images/overviewFeature3.png" alt="Feature 3" />
                <img className="featureInstruction-img" src="/images/overviewFeature4.png" alt="Feature 4" />
              </div>
            </div>
          </Model>

          <div className="feature">
            <img className="feature-img" src="/images/dash2.png" alt="Feature 2" />
            <h3>Analyze Violations</h3>
            <p>Break down constraint violations and pinpoint problems.</p>
            <button className="feature-btn" onClick={() => setFilterFeatureOpen(true)}>Learn more</button>
          </div>

          <Model isOpen={filterFeatureOpen} onRequestClose={() => setFilterFeatureOpen(false)} className="feature-model">
            <div className="feature-container">
              <button className="feature-closeButton" onClick={() => setFilterFeatureOpen(false)}>&times;</button>
              <h1>Analyze Violations</h1>
              <p>Filter the data to focus on specific details, and we’ll generate a customized dashboard tailored to your needs.</p>
              <div className="feature-content">
                <img className="featureInstruction-img" src="/images/filterFeature1.png" alt="Feature 1" />
                <br/>
                <p>When a search is performed, a filter component is generated, displaying all relevant information for that category.
                The displayed Information is specific to the filtered category.
                </p>
                <br/>
                <img className="featureInstruction-img" src="/images/filterFeature2.png" alt="Feature 2" />
                <img className="featureInstruction-img" src="/images/filterFeature3.png" alt="Feature 3" />
                <img className="featureInstruction-img" src="/images/filterFeature4.png" alt="Feature 4" />
                <br/>
                <br/>
                <img className="featureInstruction-img" src="/images/filterFeature5.png" alt="Feature 5" />
                <br/>
                <br/>
                <img className="featureInstruction-img" src="/images/filterFeature6.png" alt="Feature 6" />

              </div>
            </div>
          </Model>

          <div className="feature">
            <img className="feature-img" src="/images/dash2.png" alt="Feature 3" />
            <h3>Search Violations</h3>
            <p>Filter out certain violations based on your individualized search.</p>
            <button className="feature-btn" onClick={() => setSearchFeatureOpen(true)}>Learn more</button>
          </div>

          <Model isOpen={searchFeatureOpen} onRequestClose={() => setSearchFeatureOpen(false)} className="feature-model">
            <div className="feature-container">
              <button className="feature-closeButton" onClick={() => setSearchFeatureOpen(false)}>&times;</button>
              <h1>Search Violations</h1>
              <p>Apply your filters, and we'll find all violation entries in the validation report that match your criteria.</p>
              <div className="feature-content">
                
              </div>
            </div>
          </Model>

          <div className="feature">
            <img className="feature-img" src="/images/dash3.png" alt="Feature 4" />
            <h3>Export Insights</h3>
            <p>Download summarized reports for easy sharing and documentation.</p>
            <button className="feature-btn" onClick={() => setDownloadFeatureOpen(true)}>Learn more</button>
          </div>
        </div>

        <Model isOpen={downloadFeatureOpen} onRequestClose={() => setDownloadFeatureOpen(false)} className="feature-model">
            <div className="feature-container">
              <button className="feature-closeButton" onClick={() => setDownloadFeatureOpen(false)}>&times;</button>
              <h1>Export Insights</h1>
              <p>You can download all dashboards as PDFs.</p>
              <div className="feature-content">
                <img className="overviewFeature-img" src="/images/overviewFeature1.png" alt="Feature 1" />
                <img className="overviewFeature-img" src="/images/overviewFeature2.png" alt="Feature 2" />
                <img className="overviewFeature-img" src="/images/overviewFeature3.png" alt="Feature 3" />
                <img className="overviewFeature-img" src="/images/overviewFeature4.png" alt="Feature 4" />
              </div>
            </div>
          </Model>

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