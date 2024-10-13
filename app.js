// Load test cases from JSON file
let testCases = [];

fetch('test-cases.json')
    .then(response => response.json())
    .then(data => {
        testCases = data;
        displayTestCases(testCases);
    })
    .catch(error => console.error('Error loading test cases:', error));

// Function to display test cases in a table
// Function to display test cases in a table
function displayTestCases(testCases) {
    const tableBody = document.getElementById('testCaseTableBody');
    tableBody.innerHTML = '';

    testCases.forEach(testCase => {
        const row = document.createElement('tr');

        // Format the input data to be more readable
        const formattedInputData = formatInputData(testCase.inputData);

        row.innerHTML = `
            <td>${testCase.id}</td>
            <td>${testCase.testSteps.join('<br>')}</td>
            <td>${formattedInputData}</td>
            <td>${testCase.expectedResults}</td>
            <td>${testCase.actualResults}</td>
            <td>${testCase.testEnvironment}</td>
            <td>${testCase.executionStatus}</td>
            <td>${testCase.bugSeverity}</td>
            <td>${testCase.bugPriority}</td>
            <td>${testCase.notes}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Helper function to format JSON data for display
function formatInputData(inputData) {
    let formattedData = '';
    for (const key in inputData) {
        if (typeof inputData[key] === 'object') {
            // If the value is an object, loop through its properties
            formattedData += `<b>${key}:</b><br>`;
            for (const subKey in inputData[key]) {
                formattedData += `&nbsp;&nbsp;&nbsp;${subKey}: ${inputData[key][subKey]}<br>`;
            }
        } else {
            formattedData += `<b>${key}:</b> ${inputData[key]}<br>`;
        }
    }
    return formattedData;
}

// Search function
function searchTestCases() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredTestCases = testCases.filter(testCase => {
        return testCase.id.toLowerCase().includes(searchInput) ||
               testCase.testSteps.some(step => step.toLowerCase().includes(searchInput)) ||
               testCase.inputData.username?.toLowerCase().includes(searchInput) ||
               testCase.inputData.password?.toLowerCase().includes(searchInput) ||
               testCase.inputData.checkoutInfo?.firstName?.toLowerCase().includes(searchInput) ||
               testCase.inputData.checkoutInfo?.lastName?.toLowerCase().includes(searchInput);
    });

    displayTestCases(filteredTestCases);
}

// Filter function
function filterTestCases() {
    const filterStatus = document.getElementById('filterStatus').value;
    const filteredTestCases = filterStatus === 'All'
        ? testCases
        : testCases.filter(testCase => testCase.executionStatus === filterStatus);

    displayTestCases(filteredTestCases);
}