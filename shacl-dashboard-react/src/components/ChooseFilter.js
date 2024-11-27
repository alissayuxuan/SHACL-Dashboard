import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js'
import '../style/ChooseFilter.css';


const ChooseFilter = () => {

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
  
    const categories = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5", "Category 6"];
  
    const handleCategoryClick = (category) => {
      setSelectedCategory(category);
    };
  
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
      };

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

    const [result, setResult] = useState(null);


    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
  


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

                    <li className="menu-item">
                    <button className="menu-link" onClick={goToChooseFilter}>ChooseFilter</button>
                    </li>
                </ul>
                </div>

            )}

            <div className="filter-container">
                <h1>Filter Function</h1>
                <div className="tiles">
                    {categories.map((category, index) => (
                    <div
                        key={index}
                        className={`tile ${selectedCategory === category ? "active" : ""}`}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </div>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder={`Search in ${selectedCategory || "All Categories"}`}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                    disabled={!selectedCategory}
                />
                <button type="button" className="syled-button">
                Filter
              </button>
                </div>

        </div>
    );
};
export default ChooseFilter;
