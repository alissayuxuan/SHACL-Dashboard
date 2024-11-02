import React, {useState} from "react";

const UploadFile = () => {
    const [file, setFile] = useState(null);


    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

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
        } catch (error) {
            console.error("Error: ", error);
        }
        
        
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
        </form>
    );
}

export default UploadFile;
