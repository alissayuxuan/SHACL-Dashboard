import React, { useState } from "react";
import '../style/SearchEntry.css';

import html2pdf from 'html2pdf.js';

function SearchEntry(props) {

    const { violationTypes, violatingNodes, violatingPaths } = props;

    const [violationTypeSearch, setViolationTypeSearch] = useState("");
    const [violationTypeResults, setViolationTypeResult] = useState([]);
    
    const [focusNodeSearch, setFocusNodeSearch] = useState("");
    const [focusNodeResults, setFocusNodeResult] = useState([]);

    const [resultPathSearch, setResultPathSearch] = useState("");
    const [resultPathResults, setResultPathResult] = useState([]);

    const [violationTypeSelected, setViolationTypeSelected] = useState(false);
    const [focusNodeSelected, setFocusNodeSelected] = useState(false);
    const [resultPathSelected, setResultPathSelected] = useState(false);

    //violation entries
    const [violationEntries, setViolationEntries] = useState("");
    const [hasResult, setHasResult] = useState(false);

    // Violation Type Search
    const handleViolationTypeChange = (e) => {
        const input = e.target.value.toLowerCase();
        setViolationTypeSearch(input);
  
        const results = violationTypes.filter((type) =>
          type.toLowerCase().includes(input)
        );
        setViolationTypeResult(results);
        setViolationTypeSelected(false);

        // invalid input
        const noInput = document.getElementById('invalidSearch-noInput');
        noInput.style.display = 'none';
        const invalidInput = document.getElementById('invalidSearch-input');
        invalidInput.style.display = 'none';
    };
  
    const handleViolationTypeClick = (result) => {
        setViolationTypeSearch(result);  
        setViolationTypeResult([]);
        setViolationTypeSelected(true);      
    }

    // FocusNode Search
    const handleFocusNodeChange = (e) => {
        const input = e.target.value.toLowerCase();
        setFocusNodeSearch(input);
  
        const results = violatingNodes.filter((type) =>
          type.toLowerCase().includes(input)
        );
        setFocusNodeResult(results);
        setFocusNodeSelected(false);

        // invalid input
        const noInput = document.getElementById('invalidSearch-noInput');
        noInput.style.display = 'none';
        const invalidInput = document.getElementById('invalidSearch-input');
        invalidInput.style.display = 'none';
    };
  
    const handleFocusNodeClick = (result) => {
        setFocusNodeSearch(result);
        setFocusNodeResult([]);
        setFocusNodeSelected(true);
    }

    // ResultPath Search
    const handleResultPathChange = (e) => {
        const input = e.target.value.toLowerCase();
        setResultPathSearch(input);
  
        const results = violatingPaths.filter((type) =>
          type.toLowerCase().includes(input)
        );
        setResultPathResult(results);
        setResultPathSelected(false);

        // invalid input
        const noInput = document.getElementById('invalidSearch-noInput');
        noInput.style.display = 'none';
        const invalidInput = document.getElementById('invalidSearch-input');
        invalidInput.style.display = 'none';
    };
  
    const handleResultPathClick = (result) => {
        setResultPathSearch(result);
        setResultPathResult([]);
        setResultPathSelected(true);
    }
  

    // search: send and receive data from backend
    const handleSearch = async (event) => {
        if (!isValidSearch()) {
            setHasResult(false);
            setViolationEntries("");
            return;
        }
        // valid Search
        const noInput = document.getElementById('invalidSearch-noInput');
        noInput.style.display = 'none';
        const invalidInput = document.getElementById('invalidSearch-input');
        invalidInput.style.display = 'none';

        event.preventDefault();
        const formData = new FormData();
        formData.append("violationType", violationTypeSearch);
        formData.append("focusNode", focusNodeSearch);
        formData.append("resultPath", resultPathSearch);
        
        let url = 'http://localhost:5000/search';

        /*try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                alert("image couldnt be send to backend", response.status);
                console.error("Request failed:", response.status);
            }

            const result = await response.json();
            console.log(result);

        } catch (error) {
            console.error("Error: ", error);
        }*/

        const test = `
        To address the limitations of state-of-the-art neural network verification, we propose a novel framework that introduces two key components: Specification Networks and Neuro-Symbolic Assertion Language (NESAL).
Specification Networks
Specification Networks are highly specialized deep neural networks that serve as proxies for complex, semantic properties that cannot be easily expressed by logical formulas. These networks are trained for specific tasks relevant to the verification process. To illustrate the concept, consider the following example:
Let f be a deep neural network that takes images from a front-facing camera as input and outputs a command (left, right, accelerate, decelerate) for an autonomous vehicle. We wish to verify the property P: "f must issue a deceleration command when a stop sign appears in the front camera view."
Instead of attempting to formalize all possible characteristics of stop signs (e.g., positions, shapes, colors) in a logical formula, we introduce a specification network g. This network is a binary classifier trained specifically to recognize stop signs in images. The specification network g serves as a proxy for the complex property we wish to verify in f.
By utilizing g, we can reformulate the property P into a more tractable form: "if g(x) = true, then f(x) = decelerate," where x represents an input image. This reformulation allows us to leverage the power of neural networks in recognizing complex patterns while still enabling formal verification techniques.
This approach significantly expands the range of properties that can be verified, bridging the gap between high-level semantic concepts and the low-level operations of neural networks under verification.";
NESAL (Neuro-Symbolic Assertion Language) is a novel specification language introduced in the neuro-symbolic verification framework. It allows for the combination of logical specifications with neural networks, enabling the verification of complex, real-world properties that were previously difficult to express using traditional methods. Here are key aspects of NESAL:

1. Integration of Neural Networks: NESAL allows users to incorporate specification networks (specialized neural networks) into logical assertions[1].

2. Expressive Power: It can express a wide range of properties that go beyond simple first-order constraints on inputs and outputs of neural networks[1].

3. Logical Formulas: NESAL assertions combine logical formulas with calls to specification networks, allowing for more nuanced and complex property specifications[1].

4. Flexibility: The language can handle properties that are neither strictly local nor global, addressing limitations of current verification approaches[1].

5. Real-world Applicability: NESAL enables the verification of properties relevant to practical scenarios, such as an autonomous vehicle responding to a stop sign[1].

6. Compatibility: The framework is designed to work with existing verification infrastructure, making it accessible to researchers and practitioners[1].

By using NESAL, verifiers can now express and verify properties that were previously outside the scope of formal verification techniques, bridging the gap between high-level semantic concepts and low-level neural network operations.

Citations:
[1] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/47815054/8bcbb496-d378-4cda-9737-40f05ccd3258/neuro-symbolic-verification.pdf
Specification networks are a key component of the neuro-symbolic verification framework. They serve as neural network proxies for complex, semantic properties that are difficult to express using traditional logical constraints. Here's a more detailed explanation of specification networks:

## Purpose and Function

Specification networks are designed to bridge the gap between high-level semantic properties and the low-level operations of neural networks under verification. They translate complex real-world concepts into a form that can be more easily integrated into formal verification processes.

## Characteristics

1. **Input-Output Mapping**: Like standard neural networks, specification networks map inputs to outputs. However, their purpose is to represent specific properties or concepts relevant to verification.

2. **Trained on Relevant Data**: These networks are typically trained on data that represents the property or concept they're meant to capture.

3. **Binary or Multi-class Output**: Depending on the property, specification networks may output binary decisions (e.g., "stop sign present" or "not present") or multi-class probabilities.

## Examples of Use

1. **Object Recognition**: A specification network could be trained to recognize stop signs in various conditions, angles, and lighting situations.

2. **Semantic Understanding**: For natural language processing tasks, a specification network might be trained to identify specific semantic concepts or intentions in text.

3. **Fairness Properties**: A specification network could be designed to detect potential bias or unfairness in decision-making processes.

## Integration with NESAL

Specification networks are used within NESAL (Neuro-Symbolic Assertion Language) assertions. For example, an assertion might state that if the specification network detects a stop sign with high confidence, the main neural network under verification must output a "stop" command.

## Advantages

1. **Handling Complex Properties**: They allow for the verification of properties that would be extremely difficult or impossible to express using traditional logical constraints.

2. **Leveraging Existing Models**: Pre-trained models for perception or language understanding can be repurposed as specification networks, taking advantage of advances in these fields.

3. **Flexibility**: New specification networks can be trained or existing ones fine-tuned for specific verification tasks.

By using specification networks, the neuro-symbolic verification framework significantly expands the range of properties that can be formally verified in neural network systems, making it more applicable to real-world, complex scenarios.
Section 4 of the paper introduces the neuro-symbolic verification framework, which aims to address the limitations of current neural network verification methods. The key components of this framework are:

1. Neuro-Symbolic Assertion Language (NESAL): A new specification language that allows the combination of logical specifications with neural networks.

2. Specification Networks: Neural networks that serve as proxies for complex, semantic properties. These networks enable the integration of advanced perception and natural language recognition into formal verification.

The framework works as follows:

1. It uses specification networks to represent complex real-world properties that are difficult to express using traditional logical constraints.

2. NESAL allows users to write assertions that combine these specification networks with logical formulas.

3. The framework then verifies these NESAL assertions against the neural network under test.

This approach allows for the verification of a wider range of complex, real-world properties that were previously outside the scope of existing verification methods. For example, it can handle properties like "an autonomous vehicle must stop when it encounters a stop sign," which would be extremely difficult to express using traditional first-order logical constraints.

The authors also discuss practical ways to obtain specification networks, such as:

1. Training new networks specifically for verification tasks
2. Repurposing existing pre-trained networks
3. Using human-in-the-loop approaches to refine networks for verification

Overall, this neuro-symbolic framework significantly expands the capabilities of neural network verification, making it more applicable to real-world scenarios and complex properties.

Citations:
[1] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/47815054/8bcbb496-d378-4cda-9737-40f05ccd3258/neuro-symbolic-verification.pdf        

`
        setViolationEntries(test);
        setHasResult(true);
    }

    // Check invalid inputs
    const isValidSearch = () => {
        if (violationTypeSearch == "" && focusNodeSearch == "" && resultPathSearch == "") {
            const noInput = document.getElementById('invalidSearch-noInput');
            noInput.style.display = 'flex';
            return false;
        }
        else if ((violationTypeSearch != "" && !violationTypes.includes(violationTypeSearch)) || 
                (focusNodeSearch != "" && !violatingNodes.includes(focusNodeSearch)) || 
                (resultPathSearch != "" && !violatingPaths.includes(resultPathSearch))) {
            const invalidInput = document.getElementById('invalidSearch-input');
            invalidInput.style.display = 'flex';
            return false;
        }
        return true;
    }

    // Download Search
    const downloadSearch = () => {
        const resultPanel = document.getElementById('resultPanel');
        resultPanel.style.border = "none";
        resultPanel.style.margin = "0px";

        const options = {
            margin: 15,
            filename: 'search.pdf',
            
            html2canvas: { scale: 2 }, // better quality
            jsPDF: { format: 'a4', orientation: 'portrait' },
          };

        html2pdf().set(options).from(resultPanel).save();
    }


  return (
    <div className="searchEntry-container">

        <h1>Search Function</h1>
        <p>Select the ViolationType, FocusNode and ResultPath of the Violations you want to look at!</p>

        <div className="searchContainer"> 
            <div className="searchInput-div">
                {/* ViolationType Search */}
                <div className="search-card">
                    <div className="search-input-container">
                        <input
                            type="text"
                            className="search-input"
                            value={violationTypeSearch}
                            onChange={handleViolationTypeChange}
                            placeholder="ViolationType"
                        />
                    </div>
                    <ul className="search-result-list" style={{ listStyle: "none", padding: 0 }}>
                        {violationTypeSearch && violationTypeResults.length > 0 ? (
                        violationTypeResults.map((result, index) => (
                            <li 
                                key={index}
                                className='result-item'
                                onClick={() => handleViolationTypeClick(result)}>
                            {result}
                            </li>
                        ))
                        ) : violationTypeSelected ? (<></>) 
                        : violationTypeSearch ? (
                        <li style={{ color: "red" }}>no results found</li>
                        ) : null}
                    </ul>
                </div>
                
                { /* FocusNode Search */ }
                <div className="search-card">
                    <div className="search-input-container">
                        <input
                            type="text"
                            className="search-input"
                            value={focusNodeSearch}
                            onChange={handleFocusNodeChange}
                            placeholder="FocusNode"
                        />
                    </div>
                    <ul className="search-result-list" style={{ listStyle: "none", padding: 0 }}>
                        {focusNodeSearch && focusNodeResults.length > 0 ? (
                        focusNodeResults.map((result, index) => (
                            <li 
                                key={index}
                                className='result-item'
                                onClick={() => handleFocusNodeClick(result)}>
                            {result}
                            </li>
                        ))
                        ) : focusNodeSelected ? (<></>) 
                        : focusNodeSearch ? (
                        <li style={{ color: "red" }}>no results found</li>
                        ) : null}
                    </ul>
                </div>

                { /* ResultPath Search */ }
                <div className="search-card">
                    <div className="search-input-container">
                        <input
                            type="text"
                            className="search-input"
                            value={resultPathSearch}
                            onChange={handleResultPathChange}
                            placeholder="ResultPath"
                        />
                    </div>
                    
                    <ul className="search-result-list" style={{ listStyle: "none", padding: 0 }}>
                        {resultPathSearch && resultPathResults.length > 0 ? (
                        resultPathResults.map((result, index) => (
                            <li 
                                key={index}
                                className='result-item'
                                onClick={() => handleResultPathClick(result)}>
                            {result}
                            </li>
                        ))
                        ) : resultPathSelected ? (<></>) 
                        : resultPathSearch ? (
                        <li style={{ color: "red" }}>no results found</li>
                        ) : null}
                    </ul>
                </div>
                
                {/* Search Button */}
                <button className="searchButton" onClick={handleSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </button>
            
            </div>

            <div className="invalidInput-container">
                {/* Invalid Search - no input */}
                <p id="invalidSearch-noInput">Invalid Search. At least one filter has to be filled</p>
                <p id="invalidSearch-input">Invalid search input</p>
            </div>
        </div>

        
        {/* Download */}
        { hasResult ? (
            <div>
                <div className='download-container'>
                <button className='download-btn' onClick={downloadSearch}>Download</button>
                </div>

                <div id="resultPanel">
                    {violationEntries}
                </div>
            </div>
        ) : <div></div>}
        
    </div>
  );
}

export default SearchEntry;