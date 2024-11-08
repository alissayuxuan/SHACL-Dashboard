import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Plot from 'react-plotly.js'
import '../style/Result.css';


const Result = () => {
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const response = await fetch("http://localhost:5000/result");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setResult(data);
            } catch (error) {
                console.error("Error fetching result:", error);
            }
        };

        fetchResult();
    }, []);




    // nagivate home
    const navigate = useNavigate();

   /* const focusNode_Distribution_Data = result.last_analysis.focusNode_Distribution;
    const labels_FocusNodeDistribution = focusNode_Distribution_Data.map(item => item.focusNode)
    const value = focusNode_Distribution_Data.map(item => parseInt(item.count, 10))*/

    const goToHome = () => {
        navigate('/');
    };

    return (
        <div>
            <h1>Analysis Result</h1>
            {result ? (
                <div class = "test">
                    <div>
                        <p class="anzeige">Triple Count: {result.analysis.triple_count}</p>
                        {/*<p>focusNode_Distribution: {result.analysis_result.focusNode_Distribution}</p>
                        <p>resultPath_Distribution: {result.analysis_result.resultPath_Distribution}</p>
                        <p>sourceConstraintComponent_Distribution: {result.analysis_result.sourceConstraintComponent_Distribution}</p>
                        <p>resultSeverity_Distribution: {result.analysis_result.resultSeverity_Distribution}</p>
                        <p>sourceShape_Distribution: {result.analysis_result.sourceShape_Distribution}</p>

                        {/* Display more analysis results as needed */}
                    </div>

                    <div class="PieChart">
                        <Plot
                            data={[{
                                labels: ['node1','node2', 'node3', 'node4'],
                                values: [3, 7, 8 ,9],
                                type: 'pie'
                            }]}
                            layout={{height: 400,
                                width: 400, 

                            }}
                            />
                    </div>
                    <div class="PieChart">
                        <Plot
                            data={[{
                                labels: ['node1','node2', 'node3', 'node4'],
                                values: [3, 7, 8 ,9],
                                type: 'pie'
                            }]}
                            layout={{height: 400,
                                width: 400, 

                            }}
                    
                            />
                    </div>
                    <div class="Pie Chart">
                        <Plot
                            data={[{
                                labels: ['node1','node2', 'node3', 'node4'],
                                values: [3, 7, 8 ,9],
                                type: 'pie'
                            }]}
                            layout={{height: 400,
                                width: 400, 

                            }}
                            />
                    </div>
                </div>
                
                
            ) : (
                <p>Loading...</p>
            )}
            <button onClick={goToHome}>HOME</button>
        </div>
    );
};

export default Result;
