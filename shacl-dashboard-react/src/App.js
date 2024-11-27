import React, {useState, useEffect} from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UploadFile from './components/UploadFile';
import Result from './components/Result';
import Analysis from './components/Analysis';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChooseFilter from './components/ChooseFilter';

function App() {

  return (
    <Router>
      <div className="App container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/result" element={<Result />} />
          <Route path="/analysis" element={<Analysis/>} />
          <Route path="/choosefilter" element={<ChooseFilter/>} />

        </Routes>
      </div>
    </Router>
    
  )
  
}

export default App
