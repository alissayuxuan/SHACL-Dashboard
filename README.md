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



# activate virtual environment
    To use flask a virtual environment is needed. You can find the virtual environment in backend\venv. To activate the environment, please enter
    "venv\Scripts\activate"
    in your terminal (in the backend directory).
    


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
