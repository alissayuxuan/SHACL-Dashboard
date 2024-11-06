import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../style/UploadFile.css';


const UploadFile = () => {

    // shacl validation report upload
    const [file, setFile] = useState(null);

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
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        console.log("Uploading file:", file);
        console.log("File name:", file.name);
        console.log("File type:", file.type);

        let url = 'http://localhost:5000/upload';

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                alert("image couldnt be send to backend", response.status);
                console.error("Request failed:", response.status);
            }

            const result = await response.json();
            console.log(result);
            navigate("/result")
        } catch (error) {
            console.error("Error: ", error);
        }       
        
    };

    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/');
    };
    
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
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
              <button type="submit" className="upload-btn shadow-lg">
                Upload File
              </button>
            </form>
            <div className="back-to-home">
              <button onClick={goToHome} className="back-btn">Back to Home</button>
            </div>
          </div>
          <footer className="footer">
            <p>&copy; 2024 SHACL Dashboard | Developed by Alissa Wang and Lukas Manz</p>
          </footer>
        </div>
      );
   
}

export default UploadFile;
