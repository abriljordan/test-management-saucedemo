// Load test cases from JSON file
let testCases = [];

fetch('test-cases.json')
    .then(response => response.json())
    .then(data => {
        testCases = data;
        displayTestCases(testCases);  // Display all test cases when the page loads
    })
    .catch(error => console.error('Error loading test cases:', error));

// Function to display test cases in a table
function displayTestCases(filteredCases) {
    const tableBody = document.getElementById('testCaseTableBody');
    tableBody.innerHTML = '';

    filteredCases.forEach(testCase => {
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
        formattedData += `<b>${key}:</b> ${inputData[key]}<br>`;
    }
    return formattedData;
}

// Search function
function searchTestCases() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase(); // Case-insensitive search
    const filteredTestCases = testCases.filter(testCase => {
        return (
            testCase.id.toLowerCase().includes(searchInput) || 
            testCase.testSteps.some(step => step.toLowerCase().includes(searchInput)) ||
            (testCase.inputData.username && testCase.inputData.username.toLowerCase().includes(searchInput)) ||
            (testCase.inputData.password && testCase.inputData.password.toLowerCase().includes(searchInput)) ||
            (testCase.inputData.checkoutInfo?.firstName && testCase.inputData.checkoutInfo.firstName.toLowerCase().includes(searchInput)) ||
            (testCase.inputData.checkoutInfo?.lastName && testCase.inputData.checkoutInfo.lastName.toLowerCase().includes(searchInput)) ||
            testCase.expectedResults.toLowerCase().includes(searchInput) ||
            testCase.actualResults.toLowerCase().includes(searchInput) ||
            testCase.testEnvironment.toLowerCase().includes(searchInput) ||
            testCase.executionStatus.toLowerCase().includes(searchInput) ||
            testCase.bugSeverity.toLowerCase().includes(searchInput) ||
            testCase.bugPriority.toLowerCase().includes(searchInput) ||
            testCase.notes.toLowerCase().includes(searchInput)
        );
    });

    // Display the filtered results
    displayTestCases(filteredTestCases);
}

// Filter by execution status
function filterByExecutionStatus() {
    const selectedStatus = document.getElementById('statusFilter').value;
    const filteredTestCases = testCases.filter(testCase => {
        return selectedStatus === 'All' || testCase.executionStatus === selectedStatus;
    });
    displayTestCases(filteredTestCases);
}

// Add event listener for search and filter
document.getElementById('searchInput').addEventListener('input', searchTestCases);
document.getElementById('statusFilter').addEventListener('change', filterByExecutionStatus);