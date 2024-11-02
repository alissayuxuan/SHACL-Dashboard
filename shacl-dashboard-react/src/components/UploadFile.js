import React, {useState} from "react";
import { useNavigate } from "react-router-dom";


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
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>

            <button onClick={goToHome}>HOME</button>
        </div>
    );
}

export default UploadFile;
