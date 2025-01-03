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
    const [isViolationTypeOpen, setIsViolationTypeOpen] = useState(false);
    const [isViolatingFocusNodeOpen, setIsViolatingFocusNodeOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // general Information Card: indicates which most frequent violation/ focusNode should be displayed
    const [frequentViolationIndex, setFrequentViolationIndex] = useState(0);
    const [maxFrequentViolationIndex, setMaxFrequentViolationIndex] = useState(0);
    const [frequentNodeIndex, setFrequentNodeIndex] = useState(0);
    const [maxFrequentNodeIndex, setMaxFrequentNodeIndex] = useState(0);


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsViolationTypeOpen(false);
        setIsViolatingFocusNodeOpen(false);
    };

    const toggleViolationType = () => {
        setIsViolationTypeOpen(!isViolationTypeOpen);
    };

    const toggleViolatingFocusNode = () => {
        setIsViolatingFocusNodeOpen(!isViolatingFocusNodeOpen);
    };

    // click through most frequent violation type and focusnode with most violations
    // TODO
    const prevFrequentViolation = () => {
        if (frequentViolationIndex > 0) {
            setFrequentViolationIndex(frequentViolationIndex - 1);
        }
    }

    const nextFrequentViolation = () => {
        if (frequentViolationIndex < maxFrequentViolationIndex) {
            setFrequentNodeIndex(frequentViolationIndex + 1);
        }
    }

    const prevFrequentNode = () => {
        if (frequentNodeIndex > 0) {
            setFrequentNodeIndex(frequentNodeIndex - 1);
        }
    }

    const nextFrequentNode = () => {
        if (frequentNodeIndex < maxFrequentNodeIndex) {
            setFrequentNodeIndex(frequentNodeIndex + 1);
        }
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
                setResult(data.analysis);
                setMaxFrequentViolationIndex(data.analysis.most_frequent_violation_type.length - 1);
                setMaxFrequentNodeIndex(data.analysis.most_violating_node.length - 1);
                console.log('result\n', result);
                console.log(result.most_frequent_violation_type);
                console.log(result.most_violating_node);
            } catch (error) {
                console.error("Error fetching result:", error);
            }
        };

        fetchResult();
    }, []);
    
        
    // testData as JSON
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

    //const jsonString = JSON.stringify(testData); 
    //console.log("JSON: \n",jsonString);

    /*useEffect(() => {
        setResult(JSON.parse(jsonString));
    }, []);*/
        
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

            console.log("RESULT\n", result);
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

    const goToChooseFilter = () => {
        navigate('/choosefilter');
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
                    
                    <li >
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search..."
                        value={searchTerm}
                    />
                    </li>


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
                     

                    <li className="menu-item">
                    <button className="menu-link" onClick={goToUploadFile}>Upload File</button>
                    </li>

                    <li className="menu-item">
                    <button className="menu-link" onClick={goToHome}>Home</button>
                    </li>

                    <li className="menu-item">
                    <button className="menu-link" onClick={goToChooseFilter}>Filter</button>
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
                        <p>{index === 0 ? result.total_violations[0] : index === 1 ? result.total_violating_nodes[0] : index === 2 ? result.most_frequent_violation_type : result.most_violating_node}</p>
                        </div>
                    ))}
                    </div>


                    <div className="card-row">
                        <div className="card">
                        <h3>Total Violations</h3>
                        <p>{result.total_violations[0]}</p>
                        </div>

                        <div className="card">
                        <h3>Total Violating Focus Nodes</h3>
                        <p>{result.total_violating_nodes[0]}</p>
                        </div>

                        <div className="card">
                        <h3>Most Frequent Violation</h3>
                        <p>{result.most_frequent_violation_type[frequentViolationIndex]}</p>
                        <div>
                            <button onClick={prevFrequentViolation}>-</button>
                            <label>{frequentViolationIndex+1}/{result.most_frequent_violation_type.length}</label>
                            <button onClick={nextFrequentViolation}>+</button>
                        </div>
                        </div>

                        <div className="card">
                        <h3>Focus Node with Most Violations</h3>
                        <p>{result.most_violating_node[frequentNodeIndex]}</p>
                        <div>
                            <button onClick={prevFrequentNode}>-</button>
                            <label>{frequentNodeIndex+1}/{result.most_violating_node.length}</label>
                            <button onClick={nextFrequentNode}>+</button>
                        </div>
                        </div>
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
