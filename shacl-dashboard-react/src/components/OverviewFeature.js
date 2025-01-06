import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../style/OverviewFeature.css';


const OverviewFeature = () => {
    
    

    // navigation
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    const goToUploadFile = () => {
        navigate('/upload');
    }

    return (
        <div className="overviewFeature-container">
            <nav className="navbar-home">
                <h1>SHACL Dashboard</h1>
                <div className="navbar-menu">
                    <ul className="nav-links">
                    <li><a href="#FeatureSection">Features</a></li>
                    <li><a href="#InstructionSection">Instructions</a></li>
                    <li><button className="navbar-btn" onClick={goToUploadFile}>Upload</button></li>
                    </ul>
                </div>
                
            </nav>
            <img className="overviewFeature-img" src="/images/overviewFeature1.png" alt="Feature 1" />
            <img className="overviewFeature-img" src="/images/overviewFeature2.png" alt="Feature 2" />
            <img className="overviewFeature-img" src="/images/overviewFeature3.png" alt="Feature 3" />
            <img className="overviewFeature-img" src="/images/overviewFeature4.png" alt="Feature 4" />

        </div>
    );
};

export default OverviewFeature;
