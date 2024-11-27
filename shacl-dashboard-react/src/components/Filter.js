// main overview of the dashboard

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Plot from 'react-plotly.js'
import '../style/Analysis.css';
import '../style/ChooseFilter.css';
import '../style/Filter.css';


const Filter = (props) => {

    const { violationTypes, violatingNodes, violatingPaths } = props;
    const allCategories = [...violationTypes, ...violatingNodes, ...violatingPaths];

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCategoryList, setSelectedCategoryList] = useState(allCategories);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);

    const categories = ["Violation Types", "Violated FocusNodes", "Violated ResultPaths", "All"];
  
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);

        if (category === "Violation Types") {
            setSelectedCategoryList(violationTypes);
        } 
        else if (category === "Violated FocusNodes") {
            setSelectedCategoryList(violatingNodes);
        } else if (category === "Violated ResultPaths") {
            setSelectedCategoryList(violatingPaths);
        } else {
            setSelectedCategoryList(allCategories);
        }
        
        const results = selectedCategoryList.filter((type) =>
            type.toLowerCase().includes(searchQuery)
        );
        setFilteredResults(results);
    };
  
    const handleSearchChange = (e) => {
      const input = e.target.value.toLowerCase();
      setSearchQuery(input);

      //filter based on input
      const results = selectedCategoryList.filter((type) =>
        type.toLowerCase().includes(input)
      );
      setFilteredResults(results);
    };

    const handleResultClick = (result) => {
        setSearchQuery(result);
        setFilteredResults([result]);
    }

    const handleFilterAction = () => {

    }



    return (
        <div className="filter-container">

            <p>Choose which Information you want to look at in detail</p>

            <div className="choseFilter">
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

                {/*search*/} 
                <input
                    type="text"
                    placeholder={`Search in ${selectedCategory || "All Categories"}`}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                    style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "16px",
                        marginBottom: "10px",
                      }}
                />
                <ul className="search-result-list" style={{ listStyle: "none", padding: 0 }}>
                    {searchQuery && filteredResults.length > 0 ? (
                    filteredResults.map((result, index) => (
                        <li onClick={() => handleResultClick(result)}>
                        {result}
                        </li>
                    ))
                    ) : searchQuery ? (
                    <li style={{ color: "red" }}>no results found</li>
                    ) : null}
                </ul>



                <button type="button" className="styled-button" onClick={handleFilterAction}>
                Filter
              </button>
            </div>

            {/*filtered results */}
            {/*
            <div className="filterResult">
                <div className="card-row">
                {['Total Violations', 'Total violating Focus Node', 'Total violating Result Paths'].map((title, index) => (
                    <div className="card" key={index}>
                    <h3>{title}</h3>
                    <p>{index === 0 ? total_violations[0] : index === 1 ? result.total_violating_nodes[0] : result.total_violating_nodes[0]}</p>
                    </div>
                ))}
                </div>
            </div>
            */}

        </div>
    );
};

export default Filter;
