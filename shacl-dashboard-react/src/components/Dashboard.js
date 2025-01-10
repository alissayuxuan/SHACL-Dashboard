import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Overview from "./Overview";
import Filter from "./Filter";
import SearchEntry from './SearchEntry';
import '../style/Dashboard.css';


// getInitial useStates
const getInitialIsOverview = () => {
    const isOverviewData = localStorage.getItem("is-overview");
    return isOverviewData ? JSON.parse(isOverviewData) : true;
}

const getInitialIsFilterview = () => {
    const isFilterviewData = localStorage.getItem("is-filterview");
    return isFilterviewData ? JSON.parse(isFilterviewData) : false;
}

const Dashboard = () => {
    // saves data from backend
    const [result, setResult] = useState(null);

    // retrieve data from backend
    const [violationTypes, setViolationTypes] = useState([]);
    const [violatingNodes, setViolatingNodes] = useState([]);
    const [violatingPaths, setViolatingPaths] = useState([]);

    // side menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOverview, setIsOverview] = useState(getInitialIsOverview());
    const [isFilterView, setIsFilterView] = useState(getInitialIsFilterview());

    // Functions
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const goToOverview = () => {
        setIsOverview(true);
        setIsFilterView(false);
    }

    const goToFilterView = () => {
        setIsOverview(false);
        setIsFilterView(true);
    }

    const goToSearchView = () => {
        setIsOverview(false);
        setIsFilterView(false);
    }

    // stores in local storage
    useEffect(() => {
        localStorage.setItem("is-overview", JSON.stringify(isOverview));
        localStorage.setItem("is-filterview", JSON.stringify(isFilterView));
    }, [isOverview, isFilterView]);
    
    // retrieves from local storage
    React.useEffect(() => {
        const isOverviewData = localStorage.getItem("is-overview");
        if (isOverviewData) {
          setIsOverview(JSON.parse(isOverviewData));
        }

        const isFilterViewData = localStorage.getItem("is-filterview");
        if(isFilterViewData) {
            setIsFilterView(JSON.parse(isFilterViewData));
        }
      }, []);

    // fetches data from backend
    useEffect(() => {
        const fetchResult = async () => {
            try {
                const response = await fetch("http://localhost:5000/result");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log('Response overview: ', data);

                setResult(data.analysis);
            } catch (error) {
                console.error("Error fetching result:", error);
            }
        };

        fetchResult();
    }, []);
        

    // sets useState for violationTypes, violatingNodes, violatingPaths
    useEffect(() => {
        if(result) {
            const violationTypes_list = result.violationTypes_occurance.map(item => item.key); 
            setViolationTypes(violationTypes_list);

            const violatingNodes_list = result.focusNode_violations.map(item => item.key); 
            setViolatingNodes(violatingNodes_list);

            const violatingPaths_list = result.result_path_occurance.map(item => item.key); 
            setViolatingPaths(violatingPaths_list);
        }
    }, [result]);
    


    // navigation
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    const goToUploadFile = () => {
        navigate('/upload');
    };


    return (
        <div className="dashboard-container">
            {/* Top Navigator */}
            <nav className="navbar">
                <button onClick={toggleMenu} className="menu-button-open">☰</button>
                <h1>Dashboard</h1>
            </nav>

            {/* Side Menu */}
            {isMenuOpen && (
            <div className="sidebar">
                <ul className="sidebar-menu">
                    <li >
                    <button onClick={toggleMenu} className="menu-button-close">✕</button>
                    </li>

                    <li className="menu-item">
                    <button className="menu-link" onClick={goToOverview}>Overview</button>
                    </li>

                    <li className="menu-item">
                    <button className="menu-link" onClick={goToFilterView}>Filter</button>
                    </li>

                    <li className="menu-item">
                    <button className="menu-link" onClick={goToSearchView}>Search</button>
                    </li>

                    <li className="menu-item">
                    <button className="menu-link" onClick={goToUploadFile}>Upload File</button>
                    </li>

                    <li className="menu-item">
                    <button className="menu-link" onClick={goToHome}>Home</button>
                    </li>
                </ul>
                </div>
            )}

            {/* Main Content */}
            <div className='download-container'>
                
            </div>
            <div className={`main-content ${isMenuOpen ? 'menu-open' : ''}`}>
            {isOverview ? (
                <div>
                {result ? (
                    <Overview 
                        result={result} 
                    /> 
                    
                ) : (
                    <p>Loading...</p>
                )}
                </div>
            ):
            isFilterView ? (
                <Filter
                    violationTypes={violationTypes}
                    violatingNodes={violatingNodes}
                    violatingPaths={violatingPaths}
                />
            ): 
            <SearchEntry
                violationTypes={violationTypes}
                violatingNodes={violatingNodes}
                violatingPaths={violatingPaths}
            />
            }
            
            </div>
        </div>
    );
};

export default Dashboard;
