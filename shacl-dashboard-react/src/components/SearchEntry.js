import React, { useState, useEffect } from "react";
import '../style/SearchEntry.css';

import html2pdf from 'html2pdf.js';

// getInitial useStates -> so local storage doesn't get resetted
const getInitialViolationEntries = () => {
    const violationEntriesData = localStorage.getItem("violation-entries");
    return violationEntriesData ? JSON.parse(violationEntriesData) : "";
}

const getInitialHasSearchResult = () => {
    const hasSearchResultData = localStorage.getItem("has-searchResult");
    return hasSearchResultData ? JSON.parse(hasSearchResultData) : "";
}

const getInitialViolationTypeSearch = () => {
    const violationTypeSearchData = localStorage.getItem("violationType-search");
    return violationTypeSearchData ? JSON.parse(violationTypeSearchData) : "";
}

const getInitialFocusNodeSearch = () => {
    const focusNodeSearchData = localStorage.getItem("focusNode-search");
    return focusNodeSearchData ? JSON.parse(focusNodeSearchData) : "";
}

const getInitialResultPathSearch = () => {
    const resultPathSearchData = localStorage.getItem("resultPath-search");
    return resultPathSearchData ? JSON.parse(resultPathSearchData) : "";
}

const getInitialTotalEntries = () => {
    const totalEntriesData = localStorage.getItem("total-searcf-entries");
    return totalEntriesData ? JSON.parse(totalEntriesData) : 0;
}

function SearchEntry(props) {

    const { violationTypes, violatingNodes, violatingPaths } = props;

    const [violationTypeSearch, setViolationTypeSearch] = useState(getInitialViolationTypeSearch());
    const [violationTypeResults, setViolationTypeResult] = useState([]);
    
    const [focusNodeSearch, setFocusNodeSearch] = useState(getInitialFocusNodeSearch());
    const [focusNodeResults, setFocusNodeResult] = useState([]);

    const [resultPathSearch, setResultPathSearch] = useState(getInitialResultPathSearch());
    const [resultPathResults, setResultPathResult] = useState([]);

    const [violationTypeSelected, setViolationTypeSelected] = useState(false);
    const [focusNodeSelected, setFocusNodeSelected] = useState(false);
    const [resultPathSelected, setResultPathSelected] = useState(false);

    //violation entries
    const [violationEntries, setViolationEntries] = useState(getInitialViolationEntries());
    const [hasResult, setHasResult] = useState(getInitialHasSearchResult());
    const [totalEntries, setTotalEntries] = useState(getInitialTotalEntries());


    // Violation Type Input Search
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

    // FocusNode Input Search
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

    // ResultPath Input Search
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


            if (result.violation_entries) {
                setViolationEntries(result.violation_entries);
                setTotalEntries(result.total_entries);
            } else {
                setViolationEntries(result.message);
            }

            setHasResult(true);


        } catch (error) {
            console.error("Error: ", error);
        }
    }

    // stores violationEntries into the local storage
    useEffect(() => {
        localStorage.setItem("violation-entries", JSON.stringify(violationEntries));
        localStorage.setItem("has-searchResult", JSON.stringify(hasResult));
        localStorage.setItem("total-search-entries", JSON.stringify(totalEntries));

        localStorage.setItem("violationType-search", JSON.stringify(violationTypeSearch));
        localStorage.setItem("focusNode-search", JSON.stringify(focusNodeSearch));
        localStorage.setItem("resultPath-search", JSON.stringify(resultPathSearch));
    }, [violationEntries, hasResult, totalEntries, violationTypeSearch, focusNodeSearch, resultPathSearch]);

    // retrieves violationEntries from local storage
    useEffect(() => {
        const violationEntriesData = localStorage.getItem("violation-entries");
        if (violationEntriesData) {
          setViolationEntries(JSON.parse(violationEntriesData));
        }

        const hasSearchResultData = localStorage.getItem("has-searchResult");
        if (hasSearchResultData) {
          setHasResult(JSON.parse(hasSearchResultData));
        }

        const totalEntriesData = localStorage.getItem("total-search-entries");
        if (totalEntriesData) {
          setTotalEntries(JSON.parse(totalEntriesData));
        }

        const violationTypeSearchData = localStorage.getItem("violationType-search");
        if (violationTypeSearchData) {
            setViolationTypeSearch(JSON.parse(violationTypeSearchData));
            setViolationTypeSelected(true);
        }

        const focusNodeSearchData = localStorage.getItem("focusNode-search");
        if (focusNodeSearchData) {
            setFocusNodeSearch(JSON.parse(focusNodeSearchData));
            setFocusNodeSelected(true);

        }

        const resultPathSearchData = localStorage.getItem("resultPath-search");
        if (resultPathSearchData) {
            setResultPathSearch(JSON.parse(resultPathSearchData));
            setResultPathSelected(true);
        }
    }, []);

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
                    <p className="totalEntries">Total Entries Found: {totalEntries}</p>
                    {violationEntries}
                </div>
            </div>
        ) : <div></div>}
        
    </div>
  );
}

export default SearchEntry;