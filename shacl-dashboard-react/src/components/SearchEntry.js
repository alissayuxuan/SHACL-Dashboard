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

    const [violationTypeSelected, setViolationTypeSelected] = useState(false);
    const [focusNodeSelected, setFocusNodeSelected] = useState(false);
    const [resultPathSelected, setResultPathSelected] = useState(false);

    //violation entries
    const [violationEntries, setViolationEntries] = useState("");
    const [hasResult, setHasResult] = useState(false);

    // Violation Type Search
    const handleViolationTypeChange = (e) => {
        const input = e.target.value.toLowerCase();
        setViolationTypeSearch(input);
  
        const results = violationTypes.filter((type) =>
          type.toLowerCase().includes(input)
        );
        setViolationTypeResult(results);
        setViolationTypeSelected(false);
    };
  
    const handleViolationTypeClick = (result) => {
        setViolationTypeSearch(result);  
        setViolationTypeResult([]);
        setViolationTypeSelected(true);      
    }

    // FocusNode Search
    const handleFocusNodeChange = (e) => {
        const input = e.target.value.toLowerCase();
        setFocusNodeSearch(input);
  
        const results = violatingNodes.filter((type) =>
          type.toLowerCase().includes(input)
        );
        setFocusNodeResult(results);
        setFocusNodeSelected(false);
    };
  
    const handleFocusNodeClick = (result) => {
        setFocusNodeSearch(result);
        setFocusNodeResult([]);
        setFocusNodeSelected(true);
    }

    // ResultPath Search
    const handleResultPathChange = (e) => {
        const input = e.target.value.toLowerCase();
        setResultPathSearch(input);
  
        const results = violatingPaths.filter((type) =>
          type.toLowerCase().includes(input)
        );
        setResultPathResult(results);
        setResultPathSelected(false);
    };
  
    const handleResultPathClick = (result) => {
        setResultPathSearch(result);
        setResultPathResult([]);
        setResultPathSelected(true);
    }
  

    // search: send and receive data from backend
    const handleSearch = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("violationType", violationTypeSearch);
        formData.append("focusNode", focusNodeSearch);
        formData.append("resultPath", resultPathSearch);
        
        let url = 'http://localhost:5000/search';

        /*try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                alert("image couldnt be send to backend", response.status);
                console.error("Request failed:", response.status);
            }

            const result = await response.json();
            console.log(result);

        } catch (error) {
            console.error("Error: ", error);
        }*/

        const test = "This document has been reviewed by W3C Members, by software developers, and by other W3C groups and interested parties, and is endorsed by the Director as a W3C Recommendation. It is a stable document and may be used as reference material or cited from another document. W3C's role in making the Recommendation is to draw attention to the specification and to promote its widespread deployment. This enhances the functionality and interoperability of the Web."
        setViolationEntries(test);
        setHasResult(true);
    }

  return (
    <div className="searchEntry-container">

        <h1>Search Function</h1>
        <p>Select the ViolationType, FocusNode and ResultPath of the Violations you want to look at!</p>

        <div className="searchContainer"> 
            <div className="searchInput-div">
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
                        ) : violationTypeSelected ? (<></>) 
                        : violationTypeSearch ? (
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
                        ) : focusNodeSelected ? (<></>) 
                        : focusNodeSearch ? (
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
                        ) : resultPathSelected ? (<></>) 
                        : resultPathSearch ? (
                        <li style={{ color: "red" }}>no results found</li>
                        ) : null}
                    </ul>
                </div>
                
                {/* Search Button */}
                <button className="searchButton" onClick={handleSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </button>
            
            </div>

            <div className="invalidInput-container">
                {/* Invalid Search - no input */}
                <p id="invalidSearch-noInput">Invalid Search. At least one filter has to be filled</p>
                <p id="invalidSearch-input">Invalid search input</p>
            </div>
        </div>

        
        {/* Download */}
        { hasResult ? (
            <div>
                <div className='download-container'>
                <button className='download-btn'>Download</button>
                </div>

                <div className="resultPanel">
                    {violationEntries}
                </div>
            </div>
        ) : <div></div>}
        
    </div>
  );
}

export default SearchEntry;