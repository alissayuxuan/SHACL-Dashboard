// main overview of the dashboard

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Plot from 'react-plotly.js'
import '../style/Analysis.css';
import '../style/Overview.css';


const Overview = (props) => {

    const { result /*, violationTypes, violationTypes_values, violatingNodes, violatingNodes_values, violatingPaths, violatingPaths_values*/ } = props;

    console.log("RESULT!!!!!\n", result);
    console.log("result.most_frequent_violation_type\n", result.most_frequent_violation_type)
    console.log("typeof most frequent\n", typeof  result.most_frequent_violation_type)
    console.log("result.violationTypes_occurance\n", result.violationTypes_occurance)
    console.log("typeof violationtypes\n", typeof  result.violationTypes_occurance)


    const most_frequent_violation_type = result.most_frequent_violation_type.substring(2, result.most_frequent_violation_type.length - 2);
    const most_violating_node = result.most_violating_node.substring(2, result.most_violating_node.length - 2);
    const most_violating_path = result.most_frequent_resultPath.substring(2, result.most_frequent_resultPath.length - 2); // TODO CHANGE TO PATH

    const violationTypes = result.violationTypes_occurance.map(item => item.key);
    const violationTypes_values = result.violationTypes_occurance.map(item => item.value);

    const top10_violatingNodes = result.focusNode_violations.map(item => item.key).slice(0, 10); 
    const top10_violatingNodes_values = result.focusNode_violations.map(item => item.value).slice(0, 10);

    const top10_violatingPaths = result.focusNode_violations.map(item => item.key).slice(0, 10);  // TODO CHANGE TO PATH
    const top10_violatingPaths_values = result.focusNode_violations.map(item => item.value).slice(0, 10); // result_path_occurance


    return (
        <div className="overview-container">

            {/* Main Content */}
            
            <div className="card-row">
            {['Total Violations', 'Total violating Focus Node', 'Total violating Result Paths'].map((title, index) => (
                <div className="card" key={index}>
                <h3>{title}</h3>
                <p>{index === 0 ? result.total_violations : index === 1 ? result.total_violating_nodes : result.total_violating_resultPaths}</p> {/*TODO CHANGE*/}
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

            {/*Violation Types*/}
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

            {/*Violating FocusNode*/}
            <div className="chart-row">
            <div className="card">
                <h3>Violating FocusNodes</h3>
                <Plot
                data={[{
                    type: 'pie',
                    labels: top10_violatingNodes,
                    values: top10_violatingNodes_values,
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
                <h3>Violation FocusNodes</h3>
                <Plot
                data={[{
                    type: 'bar',
                    x: result.focusNode_violations.map(item => item.key),
                    y: result.focusNode_violations.map(item => item.value),
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
                <h3>Violation FocusNodes</h3>
                <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>FocusNode</th>
                            <th>Number of Violations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.focusNode_violations.map((entry, index) => (
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

            
            {/*Violating ResultPaths*/}
            <div className="chart-row">
            <div className="card">
                <h3>Violating ResultPaths</h3>
                <Plot
                data={[{
                    type: 'pie',
                    labels: top10_violatingPaths,
                    values: top10_violatingPaths_values,
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
                    x: result.result_path_occurance.map(item => item.key),
                    y: result.result_path_occurance.map(item => item.value),
                    marker: { color: '#8A2BE2' },
                }]}
                layout={{ autosize: true, margin: { t: 0, b: 30 } }}
                useResizeHandler={true}
                style={{ width: '100%', height: '250px' }}
                />
            </div>
            </div>


            {/*table*/}
            <div className="chart-row">
            <div className="card">
                <h3>Violating ResultPaths</h3>
                <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ResultPaths</th>
                            <th>Number of Violations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.result_path_occurance.map((entry, index) => (
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

export default Overview;
