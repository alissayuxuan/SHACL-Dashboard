import React, { useState } from "react";
import '../style/SearchEntry.css';

import html2pdf from 'html2pdf.js';

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

        // invalid input
        const noInput = document.getElementById('invalidSearch-noInput');
        noInput.style.display = 'none';
        const invalidInput = document.getElementById('invalidSearch-input');
        invalidInput.style.display = 'none';
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

        // invalid input
        const noInput = document.getElementById('invalidSearch-noInput');
        noInput.style.display = 'none';
        const invalidInput = document.getElementById('invalidSearch-input');
        invalidInput.style.display = 'none';
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

        // invalid input
        const noInput = document.getElementById('invalidSearch-noInput');
        noInput.style.display = 'none';
        const invalidInput = document.getElementById('invalidSearch-input');
        invalidInput.style.display = 'none';
    };
  
    const handleResultPathClick = (result) => {
        setResultPathSearch(result);
        setResultPathResult([]);
        setResultPathSelected(true);
    }
  

    // search: send and receive data from backend
    const handleSearch = async (event) => {
        if (!isValidSearch()) {
            setHasResult(false);
            setViolationEntries("");
            return;
        }
        // valid Search
        const noInput = document.getElementById('invalidSearch-noInput');
        noInput.style.display = 'none';
        const invalidInput = document.getElementById('invalidSearch-input');
        invalidInput.style.display = 'none';

        event.preventDefault();
        const formData = new FormData();
        formData.append("violationType", violationTypeSearch);
        formData.append("focusNode", focusNodeSearch);
        formData.append("resultPath", resultPathSearch);
        
        let url = 'http://localhost:5000/search';

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                alert("data couldnt be send to backend", response.status);
                console.error("Request failed:", response.status);
            }

            const result = await response.json();
            console.log(result);
            //setViolationEntries(response);


            if (result.violationEntries) {
                setViolationEntries(result.violationEntries);
            } else {
                setViolationEntries(result.message);
            }

            setHasResult(true);


        } catch (error) {
            console.error("Error: ", error);
        }
    }

    // Check invalid inputs
    const isValidSearch = () => {
        if (violationTypeSearch == "" && focusNodeSearch == "" && resultPathSearch == "") {
            const noInput = document.getElementById('invalidSearch-noInput');
            noInput.style.display = 'flex';
            return false;
        }
        else if ((violationTypeSearch != "" && !violationTypes.includes(violationTypeSearch)) || 
                (focusNodeSearch != "" && !violatingNodes.includes(focusNodeSearch)) || 
                (resultPathSearch != "" && !violatingPaths.includes(resultPathSearch))) {
            const invalidInput = document.getElementById('invalidSearch-input');
            invalidInput.style.display = 'flex';
            return false;
        }
        return true;
    }


    // Download Search
    const downloadSearch = () => {
        const resultPanel = document.getElementById('resultPanel');
        resultPanel.style.border = "none";
        resultPanel.style.margin = "0px";

        const options = {
            margin: 15,
            filename: 'search.pdf',
            
            html2canvas: { scale: 2 }, // better quality
            jsPDF: { format: 'a4', orientation: 'portrait' },
          };

        html2pdf().set(options).from(resultPanel).save();
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
                <button className='download-btn' onClick={downloadSearch}>Download</button>
                </div>

                <div id="resultPanel">
                    {violationEntries}
                </div>
            </div>
        ) : <div></div>}
        
    </div>
  );
}

export default SearchEntry;