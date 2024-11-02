import React, {useState, useEffect} from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UploadFile from './components/UploadFile'

function App() {

  return (
    <Router>
      <div className="App container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadFile />} />
        </Routes>
      </div>
    </Router>
    
  )
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
      HALLO
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

export default App
