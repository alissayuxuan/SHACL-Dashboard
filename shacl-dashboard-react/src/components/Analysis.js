import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Plot from 'react-plotly.js'
import '../style/Analysis.css';


const Analysis = () => {
    //const [result, setResult] = useState(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
      };
    
    // Sample data to search from
    const data = [
        { name: 'Total Violations', value: 123 },
        { name: 'Violation Entities', value: 45 },
        { name: 'Most Frequent Violation', value: 'Datatype Constraint' },
        { name: 'Entity with Most Violations', value: 'Customer' }
    ];

    // Filtered data based on search term
    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    /*
    useEffect(() => {
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
    }, []);
    */



    // nagivate home
    const navigate = useNavigate();

   /* const focusNode_Distribution_Data = result.last_analysis.focusNode_Distribution;
    const labels_FocusNodeDistribution = focusNode_Distribution_Data.map(item => item.focusNode)
    const value = focusNode_Distribution_Data.map(item => parseInt(item.count, 10))*/

    const goToHome = () => {
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            {/* Top Navigator */}
            <nav className="navbar">
                <button onClick={toggleMenu} className="menu-button">☰</button>
                <h1>Dashboard</h1>
            </nav>

            {/* Sidebar */}
            {isMenuOpen && (
            <div className="sidebar">
                <ul className="sidebar-menu">
                    
                    <li className="menu-item">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    </li>
                    <li className="menu-item">
                    <button className="menu-link" onClick={toggleFilter}>
                        Filter {isFilterOpen ? '▲' : '▼'}
                    </button>
                    {isFilterOpen && (
                        <ul className="submenu">
                        <li className="submenu-item">
                            <button className="submenu-link">Entity</button>
                        </li>
                        <li className="submenu-item">
                            <button className="submenu-link">Violations</button>
                        </li>
                        </ul>
                    )}
                    </li>

                    <li className="menu-item">
                    <button className="menu-link">Home</button>
                    </li>
                </ul>
                </div>
            )}

            {/* Main Content */}
            <div className={`main-content ${isMenuOpen ? 'menu-open' : ''}`}>
                <div className="card-row">
                {['Total Violations', 'Total Violation Entities', 'Most Frequent Violation', 'Entity with Most Violations'].map((title, index) => (
                    <div className="card" key={index}>
                    <h3>{title}</h3>
                    <p>{index === 0 ? "123" : index === 1 ? "45" : index === 2 ? "Datatype Constraint" : "Customer"}</p>
                    </div>
                ))}
                </div>

                <div className="chart-row">
                <div className="card">
                    <h3>Violations Types</h3>
                    <Plot
                    data={[{
                        type: 'pie',
                        labels: ['Type A', 'Type B', 'Type C'],
                        values: [50, 30, 20],
                        marker: { colors: ['#FFA07A', '#20B2AA', '#778899'] },
                    }]}
                    layout={{ autosize: true, showlegend: true, margin: { t: 0, b: 0 } }}
                    useResizeHandler={true}
                    style={{ width: '100%', height: '250px' }}
                    />
                </div>
                <div className="card">
                    <h3>Violation Entities</h3>
                    <Plot
                    data={[{
                        type: 'pie',
                        labels: ['Entity A', 'Entity B', 'Entity C'],
                        values: [70, 15, 15],
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
                        x: ['Type A', 'Type B', 'Type C'],
                        y: [10, 20, 30],
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
                        x: ['Entity A', 'Entity B', 'Entity C'],
                        y: [15, 25, 35],
                        marker: { color: '#8A2BE2' },
                    }]}
                    layout={{ autosize: true, margin: { t: 0, b: 30 } }}
                    useResizeHandler={true}
                    style={{ width: '100%', height: '250px' }}
                    />
                </div>
                </div>
            </div>
        </div>
    );
};

export default Analysis;
