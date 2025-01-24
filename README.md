# SHACL-Dashboard

# Start your project
    1. Clone the project

    git clone https://github.com/alissayuxuan/SHACL-Dashboard.git


    2. Create a Virtual Environment for Flask

    cd backend

    # for unix-based operationsystems:
    python3 -m venv venv
    source venv/bin/activate

    # for windows systems:
    python -m venv venv
    venv\Scripts\activate


# might need to edit execution policies if not able to activate
    1. run powershell as administrator
    2. Um die Ausführung von Skripten nur für diese Sitzung zu erlauben, gib den folgenden Befehl ein:
    "Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass"
    Dies ändert die Execution Policy nur für das aktuelle PowerShell-Fenster und hat keine dauerhaften Auswirkungen auf dein System    


# installed packages
backend:

pip install flask
pip install flask-cors
pip install rdflib


frontend:
bootstrap
router-dom?
npm install react-plotly.js plotly.js
npm install @mui/material @emotion/react @emotion/styled

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

