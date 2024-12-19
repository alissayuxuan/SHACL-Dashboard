// main overview of the dashboard

import React, { useEffect, useState, useRef } from 'react';
import '../style/Analysis.css';
import '../style/ChooseFilter.css';
import '../style/Filter.css';
import ViolationTypeFilter from './ViolationTypeFilter';
import ViolatedNodePath from './ViolatedNodePath';




const Filter = (props) => {

    const { violationTypes, violatingNodes, violatingPaths } = props;

    const categories = ["Violation Types", "Violated FocusNodes", "Violated ResultPaths", "All"];

    const allCategories = [...violationTypes, ...violatingNodes, ...violatingPaths];

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCategoryList, setSelectedCategoryList] = useState(allCategories);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);

    // for the filtered results (dashboards)
    const [filterViews, setFilterViews] = useState([]); //list of all filters
    const refsFilterViews = useRef({}); // to jump to the filter component when added
    const [newlyAddedFilter, setNewlyAddedFilter] = useState(null); // saves the newly added filter -> for scrolling purposes
  
    /* Functions */

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);

        if (category === "Violation Types") {
            setSelectedCategoryList(violationTypes);
        } else if (category === "Violated FocusNodes") {
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

    /*const handleFilter = async (event) => {
        event.preventDefault();
        try {
            let url = 'http://localhost:5000/filter'
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({selectedCategory, searchQuery}),
            });
            const data = await response.json();
            console.log('Response: ', data);
        } catch (error) {
            console.error('Error: ', error);
        }
    }*/
   
    const handleFilter = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        // special case: selected category is "All"
        if(selectedCategory === "All") {
            if(searchQuery in violationTypes) {
                formData.append("category", "Violation Types");
            } 
            else if (searchQuery in violatingNodes) {
                formData.append("category", "Violated FocusNodes");
            } else {
                formData.append("category", "Violated ResultPaths");
            }
        } 
        // selected category is not "All"
        else {
            formData.append("category", selectedCategory);
        }

        formData.append("input", searchQuery)

        let url = 'http://localhost:5000/filter';

        try {
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

            //TODO Daten vom Backend!!!!
            const testData = {
                total_violations: 123,
                total_violating_nodes: 45,
                total_violating_resultPaths: 56,
                most_violating_node: '"[node1]"', //could be a list of strings
                most_frequent_resultPath: '"[propertyA]"',
                most_frequent_violation_type: '"[MinCountConstraint]"',
                violationTypes_occurance : [
                    {key: "datatype", value: 9},
                    {key: "nodeShape", value: 8},
                    {key: "propertyShape", value: 7}
                ],
                result_path_occurance: [
                    {key: "propertyA", value: 9},
                    {key: "propertyB", value: 8},
                    {key: "propertyC", value: 7}
                ],
                focusNode_violations: [
                    {key: "node1", value: 5}, 
                    {key: "node2", value: 3}, 
                    {key: "node3", value: 2}, 
                    {key: "node4", value: 1}
                ]
            }

            addFilter(testData);



        } catch (error) {
            console.error("Error: ", error);
        }       
        
    };

    // adds filter
    const addFilter = (filterResult) => {
        const newId = Date.now(); // unique id

        console.log("selected Category: ", selectedCategory);
        if(selectedCategory === "All") {
            if(searchQuery in violationTypes) { //TODO: wie schaut man, ob was in ner Liste vorhanden ist????
                setFilterViews([...filterViews, { 
                    name: searchQuery, 
                    id: newId, 
                    filter: <ViolationTypeFilter
                                name={searchQuery}
                                result={filterResult}/>
                }])
            } else {
                console.log("All - not in violationTypes");

                setFilterViews([...filterViews, { 
                    name: searchQuery, 
                    id: newId, 
                    filter: <ViolatedNodePath
                                result={filterResult}/>
                }])
            }
        }
        if(selectedCategoryList === violationTypes) {
            setFilterViews([...filterViews, { 
                name: searchQuery, 
                id: newId, 
                filter: <ViolationTypeFilter 
                            name={searchQuery}
                            result={filterResult}/>
            }])
        } else {
            setFilterViews([...filterViews, { 
                name: searchQuery, 
                id: newId, 
                filter: <ViolatedNodePath 
                            result={filterResult}/>
            }])
        }

        setSearchQuery("");
        setFilteredResults([]);
        refsFilterViews.current[newId] = React.createRef();
        setNewlyAddedFilter(newId);
    }

    // when a filter is added, the useEffect is called to scroll to that filter in the list
    useEffect(() => {
        if (newlyAddedFilter && refsFilterViews.current[newlyAddedFilter]?.current) {
            refsFilterViews.current[newlyAddedFilter].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
      }, [newlyAddedFilter]);
    
    const removeFilter = (id) => {
        setFilterViews(filterViews.filter((filterView) => filterView.id !== id));
        delete refsFilterViews.current[id];
    };



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
                        <button className="search-button" onClick={handleFilter}>
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
                    <div key={filterView.id} ref={refsFilterViews.current[filterView.id]} style={{ marginTop: "30px" }}>
                        <div className="filter-title">
                            <h3>{filterView.name}</h3>
                            <button className="closeFilter-btn" onClick={() => removeFilter(filterView.id)}>✕</button>
                        </div>
                        <div style={{ marginRight: '10px' }}>{filterView.filter}</div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Filter;
