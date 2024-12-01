// main overview of the dashboard

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Plot from 'react-plotly.js'
import '../style/Analysis.css';


const ViolationTypeFilter = (props) => {

    const { name, result, violatedFocusNodes, violatedFocusNodes_values, violatedResultPaths, violatedResultPaths_values } = props;

    const top10_violatedFocusNodes = violatedFocusNodes.slice(0, 10);
    const top10_violatedFocusNodes_values = violatedFocusNodes_values.slice(0, 10);
    const top10_violatedResultPaths = violatedResultPaths.slice(0, 10);
    const top10_violatedResultPaths_values = violatedResultPaths_values.slice(0, 10);

    const most_violating_node = result.most_violating_node.substring(2, result.most_violating_node.length - 2);
    const most_violating_path = result.most_frequent_resultPath.substring(2, result.most_frequent_resultPath.length - 2); 


    return (
        <div className="overview-container">

            {/* Main Content */}
            <div className="card-row">
            {['Total Violations', 'Number of violated FocusNodes', 'Number of violated ResultPaths'].map((title, index) => (
                <div className="card" key={index}>
                <h3>{title}</h3>
                <p>{index === 0 ? result.total_violations : index === 1 ? result.total_violating_nodes : result.total_violating_resultPaths}</p>
                </div>
            ))}
            </div>

            <div className="card-row">
            {['Most frequent in FocusNode:', 'Most frequent in ResultPath:'].map((title, index) => (
                <div className="card" key={index}>
                <h3>{title}</h3>
                <p>{index === 0 ? most_violating_node : most_violating_path}</p>
                </div>
            ))}
            </div>
            
            {/* FocusNode */}
            <div className="chart-row">
            <div className="card">
                <h3>FocusNodes violating the {name}</h3>
                <Plot
                data={[{
                    type: 'pie',
                    labels: top10_violatedFocusNodes,
                    values: top10_violatedFocusNodes_values,
                    marker: { colors: ['#FFA07A', '#20B2AA', '#778899'] },
                }]}
                layout={{ autosize: true, showlegend: true, margin: { t: 0, b: 0 } }}
                useResizeHandler={true}
                style={{ width: '100%', height: '250px' }}
                />
            </div>
            </div>

            <div className="chart-row">
            <div className="card">
                <h3>FocusNodes violating the {name}</h3>
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

            <div className="chart-row">
            <div className="card">
                <h3>FocusNodes violating the {name}</h3>
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

            {/* ResultPaths */}
            <div className="chart-row">
            <div className="card">
                <h3>ResultPaths violating the {name}</h3>
                <Plot
                data={[{
                    type: 'pie',
                    labels: top10_violatedResultPaths,
                    values: top10_violatedResultPaths_values,
                    marker: { colors: ['#FFA07A', '#20B2AA', '#778899'] },
                }]}
                layout={{ autosize: true, showlegend: true, margin: { t: 0, b: 0 } }}
                useResizeHandler={true}
                style={{ width: '100%', height: '250px' }}
                />
            </div>
            </div>

            <div className="chart-row">
            <div className="card">
                <h3>ResultPaths violating the {name}</h3>
                <Plot
                data={[{
                    type: 'bar',
                    x: violatedResultPaths,
                    y: violatedResultPaths_values,
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
                <h3>ResultPaths violating the {name}</h3>
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

export default ViolationTypeFilter;
