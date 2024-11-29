// main overview of the dashboard

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Plot from 'react-plotly.js'
import '../style/Analysis.css';


const Overview = (props) => {

    const { result, violationTypes, violationTypes_values, violatingNodes, violatingNodes_values, violatingPaths, violatingPaths_values } = props;

    const most_frequent_violation_type = result.most_frequent_violation_type.substring(2, result.most_frequent_violation_type.length - 2);
    const most_violating_node = result.most_violating_node.substring(2, result.most_violating_node.length - 2);
    const most_violating_path = result.most_violating_node.substring(2, result.most_violating_node.length - 2); // TODO CHANGE

    console.log("most_frequent_violation_type:\n", typeof result.most_frequent_violation_type);
    console.log("most_violating_node\n", typeof result.most_violating_node);
    console.log("violatingNodes_values\n", violatingNodes_values);


    return (
        <div className="overview-container">

            {/* Main Content */}
            
            <div className="card-row">
            {['Total Violations', 'Total violating Focus Node', 'Total violating Result Paths'].map((title, index) => (
                <div className="card" key={index}>
                <h3>{title}</h3>
                <p>{index === 0 ? result.total_violations : index === 1 ? result.total_violating_nodes : result.total_violating_nodes}</p> {/*TODO CHANGE*/}
                </div>
            ))}
            </div>

            <div className="card-row">
            {['Most Frequent Violation', 'Focus Node with Most Violations', 'Result Path with Most Violations'].map((title, index) => (
                <div className="card" key={index}>
                <h3>{title}</h3>
                <p>{index === 0 ? most_frequent_violation_type : index === 1 ? most_violating_node : most_violating_path}</p> 
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
                <h3>Violation Type</h3>
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
                <h3>Violating FocusNodes</h3>
                <Plot
                data={[{
                    type: 'pie',
                    labels: violatingNodes,
                    values: violatingNodes_values,
                    marker: { colors: ['#FFD700', '#32CD32', '#1E90FF'] },
                }]}
                layout={{ autosize: true, showlegend: true, margin: { t: 0, b: 0 } }}
                useResizeHandler={true}
                style={{ width: '100%', height: '250px' }}
                />
            </div>
            </div>

            <div className="chart-row">
            <div className="card">
                <h3>Violation Entities</h3>
                <Plot
                data={[{
                    type: 'bar',
                    x: violatingNodes,
                    y: violatingNodes_values,
                    marker: { color: '#8A2BE2' },
                }]}
                layout={{ autosize: true, margin: { t: 0, b: 30 } }}
                useResizeHandler={true}
                style={{ width: '100%', height: '250px' }}
                />
            </div>  
            </div>

            <div className="chart-row">
            <div className="card">
                <h3>Violating ResultPaths</h3>
                <Plot
                data={[{
                    type: 'pie',
                    labels: violatingPaths,
                    values: violatingPaths_values,
                    marker: { colors: ['#FFD700', '#32CD32', '#1E90FF'] },
                }]}
                layout={{ autosize: true, showlegend: true, margin: { t: 0, b: 0 } }}
                useResizeHandler={true}
                style={{ width: '100%', height: '250px' }}
                />
            </div>
            </div>

            <div className="chart-row">
            <div className="card">
                <h3>Violating ResultPaths</h3>
                <Plot
                data={[{
                    type: 'bar',
                    x: violatingPaths,
                    y: violatingPaths_values,
                    marker: { color: '#8A2BE2' },
                }]}
                layout={{ autosize: true, margin: { t: 0, b: 30 } }}
                useResizeHandler={true}
                style={{ width: '100%', height: '250px' }}
                />
            </div>  
            </div>

        </div>
    );
};

export default Overview;
