import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Overview from "./Overview";
import Filter from "./Filter";
import '../style/Analysis.css';


const Dashboard = () => {
    // saves data from backend
    const [result, setResult] = useState(null);

    // retrieves data from backend -> violationTypes (list of keys and values)
    const [violationTypes, setViolationTypes] = useState([]);
    const [violationTypes_values, setViolationTypes_values] = useState([]);

    // retrieves data from backend -> violating nodes (list of keys and values)
    const [violatingNodes, setViolatingNodes] = useState([]);
    const [violatingNodes_values, setViolatingNodes_values] = useState([]);

    // retrieves data from backend -> violating nodes (list of keys and values)
    const [violatingPaths, setViolatingPaths] = useState([]);
    const [violatingPaths_values, setViolatingPaths_values] = useState([]);

    // side menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    //const [isViolationTypeOpen, setIsViolationTypeOpen] = useState(false);
    //const [isViolatingFocusNodeOpen, setIsViolatingFocusNodeOpen] = useState(false);
    const [isOverview, setIsOverview] = useState(true);

    // Functions
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        //setIsViolationTypeOpen(false);
        //setIsViolatingFocusNodeOpen(false);
    };

    /*
    const toggleViolationType = () => {
        setIsViolationTypeOpen(!isViolationTypeOpen);
    };

    const toggleViolatingFocusNode = () => {
        setIsViolatingFocusNodeOpen(!isViolatingFocusNodeOpen);
    };
    */

    const goToFilterView = () => {
        setIsOverview(false);
    }

    const goToOverview = () => {
        setIsOverview(true);
    }


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
    
        
    // testData as JSON
    /*
    const testData = {
        total_violations: 123,
        total_violating_nodes: 45,
        most_frequent_violation_type: "dataType", //could be a list of strings
        most_violating_node: "node1", //could be a list of strings
        violationTypes_occurance: [
            {key: "datatype", value: 9},
            {key: "nodeShape", value: 8},
            {key: "propertyShape", value: 7}
        ],
        focusNode_violations: [
            {key: "node1", value: 5}, 
            {key: "node2", value: 3}, 
            {key: "node3", value: 2}, 
            {key: "node4", value: 1}
        ]
    }
    */

    //const jsonString = JSON.stringify(testData); 
    //console.log("JSON: \n",jsonString);

    /*useEffect(() => {
        setResult(JSON.parse(jsonString));
    }, []);*/
        

    // sets useState for violationTypes and violatingNodes --> needed for filter option in side menu
    useEffect(() => {
        if(result) {
            // retrieves information from backend's data
            const violationTypes_list = result.violationTypes_occurance.map(item => item.key); 
            const violationTypes_list_values = result.violationTypes_occurance.map(item => item.value);
            setViolationTypes(violationTypes_list);
            setViolationTypes_values(violationTypes_list_values);    

            const violatingNodes_list = result.focusNode_violations.map(item => item.key); 
            const violatingNodes_list_values = result.focusNode_violations.map(item => item.value);
            setViolatingNodes(violatingNodes_list);
            setViolatingNodes_values(violatingNodes_list_values);

            const violatingPaths_list = result.result_path_occurance.map(item => item.key); 
            const violatingPaths_list_values = result.result_path_occurance.map(item => item.value);
            setViolatingPaths(violatingPaths_list);
            setViolatingPaths_values(violatingPaths_list_values);
        }

    }, [result]);
    


    // nagivate home
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
                    
                    {/*<li >
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search..."
                        value={searchTerm}
                    />
                    </li>*/}

                    {/*
                    <li className="menu-item">
                    <button className="menu-link" onClick={toggleViolationType}>
                        Violation Type {isViolationTypeOpen ? '▲' : '▼'}
                    </button>
                    </li>
                    {isViolationTypeOpen && (
                        <ul className="submenu">
                        {result.violationTypes_occurance.map((item, index) => (
                            <li className="submenu-item">
                                <button className="submenu-link">{item.key}</button>
                            </li>
                        ))}
                        </ul>
                    )}  
                      

                    <li className="menu-item">
                    <button className="menu-link" onClick={toggleViolatingFocusNode}>
                        Violating FocusNodes {isViolatingFocusNodeOpen ? '▲' : '▼'}
                    </button>
                    </li>
                    {isViolatingFocusNodeOpen && (
                        <ul className="submenu">
                        {result.focusNode_violations.map((item, index) => (
                            <li className="submenu-item">
                                <button className="submenu-link">{item.key}</button>
                            </li>
                        ))}
                        </ul>
                    )} 
                    */} 

                    <li className="menu-item">
                    <button className="menu-link" onClick={goToOverview}>Overview</button>
                    </li>

                    <li className="menu-item">
                    <button className="menu-link" onClick={goToFilterView}>Filter</button>
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
            <Filter
                result={result}
                violationTypes={violationTypes}
                violationTypes_values={violationTypes_values}
                violatingNodes={violatingNodes}
                violatingNodes_values={violatingNodes_values}
                violatingPaths={violatingPaths}
                violatingPaths_values={violatingPaths_values}
            />}
            </div>
        </div>
    );
};

export default Dashboard;
