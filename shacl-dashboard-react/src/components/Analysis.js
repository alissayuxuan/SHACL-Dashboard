import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Plot from 'react-plotly.js'
import '../style/Analysis.css';


const Analysis = () => {
    // saves data from backend
    const [result, setResult] = useState(null);

    // retrieves data from backend -> violationTypes (list of keys and values)
    const [violationTypes, setViolationTypes] = useState([]);
    const [violationTypes_values, setViolationTypes_values] = useState([]);

    // retrieves data from backend -> violating nodes (list of keys and values)
    const [violatingNodes, setViolatingNodes] = useState([]);
    const [violatingNodes_values, setViolatingNodes_values] = useState([]);

    // side menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
      };

    
    // fetches data from backend
    /*useEffect(() => {
        const fetchResult = async () => {
            try {
                const response = await fetch("http://localhost:5000/result");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setResult(data);
            } catch (error) {
                console.error("Error fetching result:", error);
            }
        };

        fetchResult();
    }, []);*/
    
        
    // testData as JSON
    const testData = {
        total_violations: 123,
        total_violating_nodes: 45,
        most_frequent_violationType: "dataType",
        most_violating_node: "node1",
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

    const jsonString = JSON.stringify(testData); 
    console.log("JSON: \n",jsonString);

    useEffect(() => {
        setResult(JSON.parse(jsonString));
    }, []);
        
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

            {/* Sidebar */}
            {isMenuOpen && (
            <div className="sidebar">
                <ul className="sidebar-menu">
                    <li >
                    <button onClick={toggleMenu} className="menu-button-close">✕</button>
                    </li>
                    
                    <li >
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search..."
                        value={searchTerm}
                    />
                    </li>


                    <li className="menu-item">
                    <button className="menu-link" onClick={toggleFilter}>
                        Violation Type {isFilterOpen ? '▲' : '▼'}
                    </button>
                    {isFilterOpen && (
                        <ul className="submenu">
                        {result.violationTypes_occurance.map((item, index) => (
                            <li className="submenu-item">
                                <button className="submenu-link">{item.key}</button>
                            </li>
                        ))}
                        </ul>
                    )}  
                    </li>  

                    <li className="menu-item">
                    <button className="menu-link" onClick={toggleFilter}>
                        Violating FocusNodes {isFilterOpen ? '▲' : '▼'}
                    </button>
                    {isFilterOpen && (
                        <ul className="submenu">
                        {result.focusNode_violations.map((item, index) => (
                            <li className="submenu-item">
                                <button className="submenu-link">{item.key}</button>
                            </li>
                        ))}
                        </ul>
                    )}  
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
            {result ? (
                <>
                    <div className="card-row">
                    {['Total Violations', 'Total violating Focus Node', 'Most Frequent Violation', 'Focus Node with Most Violations'].map((title, index) => (
                        <div className="card" key={index}>
                        <h3>{title}</h3>
                        <p>{index === 0 ? result.total_violations : index === 1 ? result.total_violating_nodes : index === 2 ? result.most_frequent_violationType : result.most_violating_node}</p>
                        </div>
                    ))}
                    </div>

                    <div className="chart-row">
                    <div className="card">
                        <h3>Violation Types</h3>
                        <Plot
                        data={[{
                            type: 'pie',
                            labels: violationTypes,
                            values: violationTypes_values,
                            marker: { colors: ['#FFA07A', '#20B2AA', '#778899'] },
                        }]}
                        layout={{ autosize: true, showlegend: true, margin: { t: 0, b: 0 } }}
                        useResizeHandler={true}
                        style={{ width: '100%', height: '250px' }}
                        />
                    </div>
                    <div className="card">
                        <h3>Violating FocusNodes</h3>
                        <Plot
                        data={[{
                            type: 'pie',
                            labels: violatingNodes,
                            values: violatingNodes_values,
                            marker: { colors: ['#FFD700', '#32CD32', '#1E90FF'] },
                        }]}
                        layout={{ autosize: true, showlegend: true, margin: { t: 0, b: 0 } }}
                        useResizeHandler={true}
                        style={{ width: '100%', height: '250px' }}
                        />
                    </div>
                    </div>

                    <div className="chart-row">
                    <div className="card">
                        <h3>Violation Type</h3>
                        <Plot
                        data={[{
                            type: 'bar',
                            x: violationTypes,
                            y: violationTypes_values,
                            marker: { color: '#4169E1' },
                        }]}
                        layout={{ autosize:true, margin: { t: 0, b: 30 } }}
                        useResizeHandler={true}
                        style={{ width: '100%', height: '250px' }}
                        />
                    </div>
                    <div className="card">
                        <h3>Violation Entities</h3>
                        <Plot
                        data={[{
                            type: 'bar',
                            x: violatingNodes,
                            y: violatingNodes_values,
                            marker: { color: '#8A2BE2' },
                        }]}
                        layout={{ autosize: true, margin: { t: 0, b: 30 } }}
                        useResizeHandler={true}
                        style={{ width: '100%', height: '250px' }}
                        />
                    </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
            </div>
        </div>
    );
};

export default Analysis;
