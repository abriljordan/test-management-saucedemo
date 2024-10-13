document.addEventListener("DOMContentLoaded", function () {
    // Fetch test cases from the JSON file
    fetch('test-cases.json')
        .then(response => response.json())
        .then(data => {
            // Call function to display test cases
            displayTestCases(data);
        })
        .catch(error => {
            console.error('Error loading test cases:', error);
            alert('Failed to load test cases.');
        });
});

function displayTestCases(testCases) {
    const tableBody = document.querySelector('#test-case-table tbody');
    
    // Clear previous table rows
    tableBody.innerHTML = '';

    testCases.forEach(testCase => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${testCase.id}</td>
            <td>${formatSteps(testCase.testSteps)}</td>
            <td>${formatInputData(testCase.inputData)}</td>
            <td>${testCase.expectedResults}</td>
            <td>${testCase.actualResults}</td>
            <td>${testCase.testEnvironment}</td>
            <td class="${getStatusClass(testCase.executionStatus)}">${testCase.executionStatus}</td>
            <td class="${getSeverityClass(testCase.bugSeverity)}">${testCase.bugSeverity}</td>
            <td>${testCase.bugPriority}</td>
            <td>${testCase.notes}</td>
        `;
        tableBody.appendChild(row);
    });
}

function formatSteps(steps) {
    return `<ul>${steps.map(step => `<li>${step}</li>`).join('')}</ul>`;
}

function formatInputData(inputData) {
    return `Username: ${inputData.username}, Password: ${inputData.password}`;
}

function getStatusClass(status) {
    return status === 'Passed' ? 'status-passed' : 'status-failed';
}

function getSeverityClass(severity) {
    if (severity === 'High') return 'severity-high';
    if (severity === 'Medium') return 'severity-medium';
    return 'severity-low';
}