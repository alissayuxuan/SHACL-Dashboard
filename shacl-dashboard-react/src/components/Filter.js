// main overview of the dashboard

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Plot from 'react-plotly.js'
import '../style/Analysis.css';
import '../style/ChooseFilter.css';
import '../style/Filter.css';
import FilterView from './FilterView';




const Filter = (props) => {

    const { violationTypes, violatingNodes, violatingPaths } = props;

    const categories = ["Violation Types", "Violated FocusNodes", "Violated ResultPaths", "All"];

    const allCategories = [...violationTypes, ...violatingNodes, ...violatingPaths];

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCategoryList, setSelectedCategoryList] = useState(allCategories);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);

    // for the filtered results (dashboards)
    const [filterViews, setFilterViews] = useState([]);
  
    // functions
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

        setSearchQuery("");
        setFilteredResults([]);
        
        const newId = filterViews.length + 1; // Dashboard ID basierend auf der Länge
        setFilterViews([...filterViews, { id: newId }]); // Füge ein neues Dashboard hinzu
          
    }



    return (
        <div className="filter-container">

            <div className="choseFilter">
                <h1>Filter Function</h1>
                <p>Choose which Information you want to look at in detail</p>
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
                <div className="search-container">
                    <div className="search-input-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder={`Search in ${selectedCategory || "All Categories"}`}
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button className="search-button" onClick={handleFilterAction}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                            </svg>
                        </button>
                                        
                    </div>
            
                    <ul className="search-result-list" style={{ listStyle: "none", padding: 0 }}>
                        {searchQuery && filteredResults.length > 0 ? (
                        filteredResults.map((result, index) => (
                            <li 
                                key={index}
                                className='result-item'
                                onClick={() => handleResultClick(result)}>
                            {result}
                            </li>
                        ))
                        ) : searchQuery ? (
                        <li style={{ color: "red" }}>no results found</li>
                        ) : null}
                    </ul>

                </div>
                



                
            </div>

            {/*filtered results */}
            <div style={{ marginTop: "20px" }}>
                {filterViews.map((filterView) => (
                <FilterView name={filterView.Id}/>
                ))}
            </div>

        </div>
    );
};

export default Filter;
