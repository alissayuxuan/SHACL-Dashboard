import React, {useState, useEffect} from "react";
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
    
    /*
    const [data, setData] = useState([{}])
  
    useEffect(() => {
      fetch("http://localhost:5000/members").then(    //warum funtioniert der proxy im package.json nicht??? also wenn ich nur fetch "/members" habe -> sollte eig auch fnktionieren...
        res => res.json()
      ).then(
        data => {
          setData(data)
          console.log(data)
        }
      )
    }, [])
  
    return (
      <div>
        {(typeof data.members === 'undefined') ? (
          <p>Loading...</p>
        ) : (
          data.members.map((member, i) => (
            <p key={i}>{member}</p>
          ))
        )}
      </div>
    )
    */
    
}
  
export default Home;
