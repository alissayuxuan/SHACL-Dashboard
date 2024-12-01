// main overview of the dashboard

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Plot from 'react-plotly.js'
import '../style/Analysis.css';


const ViolatedNodePath = (props) => {

    const { violatedFocusNodes, violatedFocusNodes_values } = props;

    const violationTypes = ["MinCountConstraintComponent", "DatatypeConstraintComponent", "MaxCountConstraintComponent"];
    const violationTypes_values = [5, 3, 1];


    return (
        <div className="overview-container">

            {/* Main Content */}            
            <div className="card-row">
            {['Total Violations', 'Most frequent ViolationType'].map((title, index) => (
                <div className="card" key={index}>
                <h3>{title}</h3>
                <p>{index === 0 ? 7 : "mincount"} </p>
                </div>
            ))}
            </div>
            

            <div className="chart-row">
            <div className="card">
                <h3>Violation Types</h3>
                <Plot
                data={[{
                    type: 'pie',
                    labels: violatedFocusNodes,
                    values: violatedFocusNodes_values,
                    marker: { colors: ['#FFA07A', '#20B2AA', '#778899'] },
                }]}
                layout={{ autosize: true, showlegend: true, margin: { t: 0, b: 0 } }}
                useResizeHandler={true}
                style={{ width: '100%', height: '250px' }}
                />
            </div>

            <div className="card">
                <h3>Violation Types</h3>
                <Plot
                data={[{
                    type: 'bar',
                    x: violatedFocusNodes,
                    y: violatedFocusNodes_values,
                    marker: { color: '#4169E1' },
                }]}
                layout={{ autosize:true, margin: { t: 0, b: 30 } }}
                useResizeHandler={true}
                style={{ width: '100%', height: '250px' }}
                />
            </div>
            </div>


        </div>
    );
};

export default ViolatedNodePath;