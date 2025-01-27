# SHACL-Dashboard

# Start your project
    1. Clone the project

    git clone https://github.com/alissayuxuan/SHACL-Dashboard.git


    2. Create and Activate Virtual Environment for Flask (optional but best practice to isolate dependencies)

    cd backend

    # for unix-based operationsystems:
    python3 -m venv venv
    source venv/bin/activate

    # for windows systems:
    python -m venv venv
    venv\Scripts\activate

    # might need to edit execution policies if activation is not possible
        i. run powershell as administrator
        ii. To allow the execution of scripts only for this session, enter the following command:
        "Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass"
        This changes the execution policy only for the current PowerShell window and has no permanent effect on your system.   

    2. Install Dependencies for Backend (/backend)

    pip install -r requirements.txt

    3. Run Backend (/backend)

    python server.py

    4. Install Dependencies for Frontend (/shacl-dashboard-react)

    npm install

    5. Run Frontend (/shacl-dashboard-react)

    npm start

    6. You can find 2 SHACL validation reports in /backend/datasets

# backend

Server: the server class is the routing class. Additionally the graph is stored here to facilitate easier handling between the other classes. 

uploadFile: is used to call the analyze_graph function and to store the returned results.

graph_parser: from outside, the analyze_graph(graph) function is called. The function then executes the SPARQL queries and calls other methods to collect all the data and KPIs that are needed. Extract_sparql_result is a helper function to better process data from sparql queries. The prefixEntfernen functions are used to extract the essential parts of the results by shortening them. Finally analyze_graph returns a dictionary with the collected data. 

filter_parser: there is a method for each filter, these are called from outside. Afterwards this class works similar as Graph parser.

filterFile: is used to call the chosen filter function and to store the returned filterResults.

search_parser: retrieves all entries of the rdf graph that meets the given search query and send them to the frontend.

# frontend
You can find all the components in the component-directory and the css-files for each component in the style directory.

Home.js:
This is the homepage. Showcasing all the features and an instruction on how to use the tool.

UploadFile.js:
This component handles file uploads. It sends the uploaded SHACL validation report to the backend for analysis.

Dashboard.js:
The main dashboard component includes a nav bar, a side menu and a content component that dynamically displays one of these components: Overview.js, Filter.js or Search.js. 

Overview.js:
The overview component retrieves analysis results from the backend and presents them through KPIs, charts and tables that visualize the processed data.

Filter.js:
This component implements the filtering functionality. The user's filter input is sent to the backend, and the results are displayed in either ViolationTypeFilter.js or ViolatedNodePath.js, depending on the selected filter category. These components serve as filter dashboards and are stored in a list.

ViolationTypeFilter.js & ViolatedNodePath.js:
Both components act as filter dashboards, displaying different content based on the selected filter category.
•	ViolationTypeFilter.js presents analysis results for Violation Type filters.
•	ViolatedNodePath.js provides data for FocusNode and ResultPath filters.

SearchEntry.js:
This component provides the search functionality. The user's search input is sent to the backend for processing, and the returned data is displayed on the screen.
