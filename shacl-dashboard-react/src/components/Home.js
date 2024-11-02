import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();
  const goToUploadFile = () => {
    navigate('/upload');
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={goToUploadFile}>Upload File</button>
    </div>
  );
   
}
  
export default Home;
