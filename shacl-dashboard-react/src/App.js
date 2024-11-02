import React, {useState, useEffect} from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UploadFile from './components/UploadFile';
import Result from './components/Result';

function App() {

  return (
    <Router>
      <div className="App container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </Router>
    
  )
  
}

export default App
