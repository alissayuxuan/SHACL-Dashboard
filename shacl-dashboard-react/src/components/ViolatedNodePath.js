// main overview of the dashboard

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Plot from 'react-plotly.js'
import '../style/Analysis.css';


const ViolatedNodePath = (props) => {

    const { result, violationTypes, violationTypes_values } = props;

    const most_frequent_violation_type = result.most_frequent_violation_type.substring(2, result.most_frequent_violation_type.length - 2);


    return (
        <div className="overview-container">

            {/* Main Content */}            
            <div className="card-row">
            {['Total Violations', 'Most frequent ViolationType'].map((title, index) => (
                <div className="card" key={index}>
                <h3>{title}</h3>
                <p>{index === 0 ? result.total_violations : most_frequent_violation_type} </p>
                </div>
            ))}
            </div>
            

            <div className="chart-row">
            <div className="card">
                <h3>Violation Types</h3>
                <Plot
                data={[{
                    type: 'pie',
                    labels: violationTypes,
                    values: violationTypes_values,
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
                    x: violationTypes,
                    y: violationTypes_values,
                    marker: { color: '#4169E1' },
                }]}
                layout={{ autosize:true, margin: { t: 0, b: 30 } }}
                useResizeHandler={true}
                style={{ width: '100%', height: '250px' }}
                />
            </div>
            </div>

            <div className="chart-row">
            <div className="card">
                <h3>Violation Types</h3>
                <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Violation Types</th>
                            <th>Number of Violations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.violationTypes_occurance.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.key}</td>
                                <td>{entry.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
            </div>


        </div>
    );
};

export default ViolatedNodePath;
