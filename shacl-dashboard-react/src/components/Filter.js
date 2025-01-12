// main overview of the dashboard

import React, { useEffect, useState, useRef } from 'react';
import '../style/Filter.css';
import ViolationTypeFilter from './ViolationTypeFilter';
import ViolatedNodePath from './ViolatedNodePath';

import html2pdf from 'html2pdf.js';

// Material UI
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const getInitialFilterViews = () => {
    const filterViewsData = localStorage.getItem("filter-views");
    return filterViewsData ? JSON.parse(filterViewsData) : [];
}

const Filter = (props) => {

    const { violationTypes, violatingNodes, violatingPaths } = props;

    const categories = ["Violation Types", "Violated FocusNodes", "Violated ResultPaths", "All"];

    const allCategories = [...violationTypes, ...violatingNodes, ...violatingPaths];

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCategoryList, setSelectedCategoryList] = useState(allCategories);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchQuerySelected, setSearchQuerySelected] = useState(false);

    // for the filtered results (dashboards)
    const [filterViews, setFilterViews] = useState(getInitialFilterViews()); //list of all filters
    const refsFilterViews = useRef({}); // to jump to the filter component when added
    const [newlyAddedFilter, setNewlyAddedFilter] = useState(null); // saves the newly added filter -> for scrolling purposes
  
    // loading
    const [isLoading, setIsLoading] = useState(false);

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
      setSearchQuerySelected(false);
    };

    const handleResultClick = (result) => {
        setSearchQuery(result);
        setFilteredResults([]);
        setSearchQuerySelected(true);
    }

   
    const handleFilter = async (event) => {
        const invalidFilter = document.getElementById('invalidFilter');
        if(!isValidFilter()) {
            invalidFilter.style.display = 'flex';
            return;
        } else {
            invalidFilter.style.display = 'none';

            event.preventDefault();
            const formData = new FormData();

            setIsLoading(true);

            // special case: selected category is "All"
            if(selectedCategory === "All") {
                if(violationTypes.includes(searchQuery)) {
                    formData.append("category", "Violation Types");
                } 
                else if (violatingNodes.includes(searchQuery)) {
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
                console.log("RESULT:\n", result);

                addFilter(result.data);

            } catch (error) {
                console.error("Error: ", error);
            } finally {
                setIsLoading(false);
            }       
        }
    };

    //check filter input
    const isValidFilter = () => {
        if(!selectedCategoryList.includes(searchQuery)) {
            return false;
        }
        return true;
    }

    // adds filter
    const addFilter = (filterResult) => {
        const newId = Date.now(); // unique id

        console.log("selected Category: ", selectedCategory);
        if(selectedCategory === "All") {
            if(violationTypes.includes(searchQuery)) {
                setFilterViews([...filterViews, { 
                    name: searchQuery, 
                    id: newId,
                    filter_type: "ViolationTypeFilter",
                    result: filterResult, 
                    filter: <ViolationTypeFilter
                                name={searchQuery}
                                result={filterResult}/>
                }])
            } else {
                console.log("All - not in violationTypes");

                setFilterViews([...filterViews, { 
                    name: searchQuery, 
                    id: newId, 
                    filter_type: "ViolatedNodePath",
                    result: filterResult,
                    filter: <ViolatedNodePath
                                result={filterResult}/>
                }])
            }
        }
        if(selectedCategoryList === violationTypes) {
            setFilterViews([...filterViews, { 
                name: searchQuery, 
                id: newId,
                filter_type: "ViolationTypeFilter",
                result: filterResult,
                //filter: <ViolationTypeFilter 
                //            name={searchQuery}
                //            result={filterResult}/>
            }])
        } else {
            setFilterViews([...filterViews, { 
                name: searchQuery, 
                id: newId, 
                filter_type: "ViolatedNodePath",
                result: filterResult,
                //filter: <ViolatedNodePath 
                //            result={filterResult}/>
            }])
        }

        console.log("filterViews: \n", filterViews);
        setSearchQuery("");
        setFilteredResults([]);
        setSearchQuerySelected(false);
        refsFilterViews.current[newId] = React.createRef();
        setNewlyAddedFilter(newId);
    }

    // stores filterViews in local storage
    useEffect(() => {
        localStorage.setItem("filter-views", JSON.stringify(filterViews));
    }, [filterViews]);

    // retrieves filterViews from local storage
    useEffect(() => {
        const filterViewsData = localStorage.getItem("filter-views");
        
        if (filterViewsData) {
            const parsedFilters = JSON.parse(filterViewsData);
            setFilterViews(parsedFilters)
        }
    }, []);

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

    // download filter
    const downloadFilter = (filterID, filterName) => {
        const filter = document.getElementById('filter-' + filterID);

        // add header
        const header = document.createElement('header');
        header.style.textAlign = 'center';
        header.style.marginBottom = '30px';
        header.style.color = 'black';
        header.innerHTML = '<h2>'+ filterName +'</h2>';

        const wrapper = document.createElement('div');
        wrapper.appendChild(header);
        wrapper.appendChild(filter.cloneNode(true));

        const options = {
            margin: 15,
            filename: filterName + '.pdf',
            html2canvas: { scale: 2 }, // better quality
            jsPDF: { format: 'a4', orientation: 'landscape' },
          };

        html2pdf().set(options).from(wrapper).save();
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
                        ) : searchQuerySelected ? (<></>) 
                        : searchQuery ? (
                        <li style={{ color: "red" }}>no results found</li>
                        ) : null}
                    </ul>

                    <p id='invalidFilter'>Invalid Filter. Filter is not included in selected category.</p>

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
                        <div style={{ marginRight: '10px' }} id={'filter-' + filterView.id}>
                            {filterView.filter_type === "ViolationTypeFilter" ? 
                                <ViolationTypeFilter name={filterView.name} result={filterView.result}/> :
                                <ViolatedNodePath result={filterView.result}/>
                        }</div>
                        <div className='download-container'>
                            <button className='download-btn' onClick={() => downloadFilter(filterView.id, filterView.name)}>Download</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Loading */}
            <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

        </div>
    );
};

export default Filter;
