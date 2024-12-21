import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/SearchEntry.css';

function SearchEntry(props) {

    const { violationTypes, violatingNodes, violatingPaths } = props;

    const [violationTypeSearch, setViolationTypeSearch] = useState("");
    const [violationTypeResults, setViolationTypeResult] = useState([]);
    
    const [focusNodeSearch, setFocusNodeSearch] = useState("");
    const [focusNodeResults, setFocusNodeResult] = useState([]);

    const [resultPathSearch, setResultPathSearch] = useState("");
    const [resultPathResults, setResultPathResult] = useState([]);

    // Violation Type Search
    const handleViolationTypeChange = (e) => {
        const input = e.target.value.toLowerCase();
        setViolationTypeSearch(input);
  
        const results = violationTypes.filter((type) =>
          type.toLowerCase().includes(input)
        );
        setViolationTypeResult(results);
        
    };
  
    const handleViolationTypeClick = (result) => {
        setViolationTypeSearch(result);
        setViolationTypeResult([result]);
    }

    // FocusNode Search
    const handleFocusNodeChange = (e) => {
        const input = e.target.value.toLowerCase();
        setFocusNodeSearch(input);
  
        const results = violatingNodes.filter((type) =>
          type.toLowerCase().includes(input)
        );
        setFocusNodeResult(results);
        
    };
  
    const handleFocusNodeClick = (result) => {
        setFocusNodeSearch(result);
        setFocusNodeResult([]);
    }

    // ResultPath Search
    const handleResultPathChange = (e) => {
        const input = e.target.value.toLowerCase();
        setResultPathSearch(input);
  
        const results = violatingPaths.filter((type) =>
          type.toLowerCase().includes(input)
        );
        setResultPathResult(results);
        
    };
  
    const handleResultPathClick = (result) => {
        setResultPathSearch(result);
        setResultPathResult([]);
    }
  

  return (
    <div className="searchEntry-container">

        <h1>Search Function</h1>
        <p>Select the ViolationType, FocusNode and ResultPath of the Violations you want to look at!</p>

        <div className="searchContainer"> 
            {/* ViolationType Search */}
            <div className="search-card">
                <div className="search-input-container">
                    <input
                        type="text"
                        className="search-input"
                        value={violationTypeSearch}
                        onChange={handleViolationTypeChange}
                        placeholder="ViolationType"
                    />
                </div>
                <ul className="search-result-list" style={{ listStyle: "none", padding: 0 }}>
                    {violationTypeSearch && violationTypeResults.length > 0 ? (
                    violationTypeResults.map((result, index) => (
                        <li 
                            key={index}
                            className='result-item'
                            onClick={() => handleViolationTypeClick(result)}>
                        {result}
                        </li>
                    ))
                    ) : violationTypeSearch ? (
                    <li style={{ color: "red" }}>no results found</li>
                    ) : null}
                </ul>
            </div>
            
            { /* FocusNode Search */ }
            <div className="search-card">
                <div className="search-input-container">
                    <input
                        type="text"
                        className="search-input"
                        value={focusNodeSearch}
                        onChange={handleFocusNodeChange}
                        placeholder="FocusNode"
                    />
                </div>
                <ul className="search-result-list" style={{ listStyle: "none", padding: 0 }}>
                    {focusNodeSearch && focusNodeResults.length > 0 ? (
                    focusNodeResults.map((result, index) => (
                        <li 
                            key={index}
                            className='result-item'
                            onClick={() => handleFocusNodeClick(result)}>
                        {result}
                        </li>
                    ))
                    ) : focusNodeSearch ? (
                    <li style={{ color: "red" }}>no results found</li>
                    ) : null}
                </ul>
            </div>

            { /* ResultPath Search */ }
            <div className="search-card">
                <div className="search-input-container">
                    <input
                        type="text"
                        className="search-input"
                        value={resultPathSearch}
                        onChange={handleResultPathChange}
                        placeholder="ResultPath"
                    />
                </div>
                

                <ul className="search-result-list" style={{ listStyle: "none", padding: 0 }}>
                    {resultPathSearch && resultPathResults.length > 0 ? (
                    resultPathResults.map((result, index) => (
                        <li 
                            key={index}
                            className='result-item'
                            onClick={() => handleResultPathClick(result)}>
                        {result}
                        </li>
                    ))
                    ) : resultPathSearch ? (
                    <li style={{ color: "red" }}>no results found</li>
                    ) : null}
                </ul>
            </div>
            
            {/* Search Button */}
            <button className="searchButton">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
            </button>
        </div>
        <div className="resultPanel">
            
        </div>
    </div>
  );
}

export default SearchEntry;