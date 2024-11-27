// main overview of the dashboard

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Plot from 'react-plotly.js'
import '../style/Analysis.css';


const Overview = (props) => {

    const { result } = props;


    return (
        <div className="overview-container">

            {/* Main Content */}
            <div className="card-row">
            {['Total Violations', 'Total violating Focus Node', 'Most Frequent Violation', 'Focus Node with Most Violations'].map((title, index) => (
                <div className="card" key={index}>
                <h3>{title}</h3>
                <p>{index === 0 ? result.total_violations[0] : index === 1 ? result.total_violating_nodes[0] : index === 2 ? result.most_frequent_violation_type[0] : result.most_violating_node[0]}</p>
                </div>
            ))}
            </div>


            <div className="card-row">
                <div className="card">
                <h3>Total Violations</h3>
                <p>{result.total_violations[0]}</p>
                </div>

                <div className="card">
                <h3>Total Violating Focus Nodes</h3>
                <p>{result.total_violating_nodes[0]}</p>
                </div>

                <div className="card">
                <h3>Most Frequent Violation</h3>
                <p>{result.most_frequent_violation_type[frequentViolationIndex]}</p>
                <div>
                    <button onClick={prevFrequentViolation}>-</button>
                    <label>{frequentViolationIndex+1}/{result.most_frequent_violation_type.length}</label>
                    <button onClick={nextFrequentViolation}>+</button>
                </div>
                </div>

                <div className="card">
                <h3>Focus Node with Most Violations</h3>
                <p>{result.most_violating_node[frequentNodeIndex]}</p>
                <div>
                    <button onClick={prevFrequentNode}>-</button>
                    <label>{frequentNodeIndex+1}/{result.most_violating_node.length}</label>
                    <button onClick={nextFrequentNode}>+</button>
                </div>
                </div>
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
        </div>
    );
};

export default Overview;
