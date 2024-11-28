// main overview of the dashboard

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Plot from 'react-plotly.js'
import '../style/Analysis.css';


const FilterView = (props) => {

    const { name } = props;

    const violationTypes = ["MinCountConstraintComponent", "DatatypeConstraintComponent", "MaxCountConstraintComponent"];
    const violationTypes_values = [5, 3, 1];


    return (
        <div className="overview-container">

            {/* Main Content */}
            <h1>NEW FILTER</h1>
            
            <div className="card-row">
            {['Total Violations', 'Most Frequent Violation', 'Second Most Frequent Violation'].map((title, index) => (
                <div className="card" key={index}>
                <h3>{title}</h3>
                <p>{index === 0 ? 7 : index === 1 ? "MinCountConstraintComponent" : "DatatypeConstraintComponent"}</p>
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


        </div>
    );
};

export default FilterView;
