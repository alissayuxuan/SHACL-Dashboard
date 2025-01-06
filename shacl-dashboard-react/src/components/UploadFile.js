import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../style/UploadFile.css';

// Material UI
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';


const UploadFile = () => {

    // shacl validation report upload
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // sets the useState file to the file selected
    const handleFileChange = (event) => {
        if (event.target.files.length > 1) {
            alert("You can only upload one file.");
            event.target.value = '';
        } else {
            setFile(event.target.files[0]);
        }
    };

    // when the submit button is pressed, the uploaded file is send to the backend
    const handleSubmit = async (event) => {
        const filetype = document.getElementById('filetype');
        if (!isValidFile(file)) {
          filetype.style.display = 'block';
        } else {
          event.preventDefault();
          setIsLoading(true);
          const formData = new FormData();
          formData.append('file', file);

          console.log("Uploading file:", file);
          console.log("File name:", file.name);
          console.log(" File type:", file.type);

          let url = 'http://localhost:5000/upload';

          try {
              const response = await fetch(url, {
                  method: 'POST',
                  body: formData,
              });

              if (!response.ok) {
                  alert("file couldnt be send to backend", response.status);
                  console.error("Request failed:", response.status);
              }

              //navigate("/analysis");
              const result = await response.json();
              console.log(result);
              navigate("/analysis");
          } catch (error) {
              console.error("Error: ", error);
          } finally {
            setIsLoading(false);
          } 
        } 
    };

    const isValidFile = (type) => {
      const validExtensions = ['.ttl', '.rdf', '.xml'];
      const filename = file.name.toLowerCase();
      for (let i = 0; i < validExtensions.length; i++) {
        if (filename.endsWith(validExtensions[i])) {
          return true;
        }
      }
      return false;
    }

    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/');
    };
    
    return (
        <div className="upload-container">
          <div className="text-center">
            <h2 className="display-4 mb-4" id="upload-header">Upload Your SHACL Validation Report</h2>
            <p className="lead text-muted" id="upload-subtext">Easily upload your SHACL file for analysis.</p>
          </div>
          <div className="upload-form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="form-control-file"
                  id="fileInput"
                  required
                />
              </div>
              <p id="filetype">Invalid file type. Accepted file types: .ttl, .rdf, .xml</p>
              <button type="submit" className="upload-btn shadow-lg">
                Upload File
              </button>
            </form>
            <div className="back-to-home">
              <button onClick={goToHome} className="back-btn">Back to Home</button>
            </div>
          </div>

          {/* Loading */}
          <Backdrop
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          

          <footer className="footer">
            <p>&copy; 2025 SHACL Dashboard | Developed by Alissa Wang and Lukas Manz</p>
          </footer>
        </div>
      );
   
}

export default UploadFile;
