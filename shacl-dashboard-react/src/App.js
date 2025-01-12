import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UploadFile from './components/UploadFile';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard';
import OverviewFeature from './components/OverviewFeature';

function App() {

  return (
    <Router>
      <div className="App container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/analysis" element={<Dashboard/>} />
          <Route path="/overviewFeature" element={<OverviewFeature/>} />

        </Routes>
      </div>
    </Router>
    
  )
  
}

export default App
