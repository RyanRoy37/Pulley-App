/*document.addEventListener('DOMContentLoaded', function() {
    var blinkcontrol = "Alert";
    if (blinkcontrol === 'Alert')
        document.getElementById('DV1').classList.add('blinking');
    else
        document.getElementById('DV1').classList.remove('blinking');
});*/
async function startsensors() {
    try {
        // Your logic for starting sensors goes here
        console.log('Sensors started!');
        
        // If you want to perform additional actions or send data to the backend, you can do it here
        const data = 1;

        // Assuming you are using Fetch API to send data to the backend
        const response = await fetch('http://192.168.84.116:5000/your-backend-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        // Handle the response from the backend if needed
        console.log('Backend Data:', result);

        // Check if backend data includes a prediction and pulleyID
        if (result && result.prediction && result.pulleyID) {
            const prediction = result.prediction;
            const pulleyId = result.pulleyID;

            if (prediction === 'Alert'){
                    
                    
                    sendSMS(pulleyId, prediction);
                    blink(pulleyId);
                    playAlertSound();
                } 
            } else {
                console.error('Prediction is not "Alert".');
            }
   // else {
     //       console.error('Invalid or missing data from the backend.');
       // }
    } catch (error) {
        console.error('Error:', error);
    }
    const pu=document.getElementById(result.pulleyID);
    if(result.prediction==='Alert'){
        document.getElementById(pu).classList.add('blinking');

    }
}

function blink(pulleyId){
    document.getElementById(pulleyId).classList.add('blinking');
}
function playAlertSound() {
    // Create an audio element
    const audio = new Audio('alarm1.mp3'); // Replace 'alertSound.mp3' with the path to your sound file
    audio.play();
}

function openPage(option) {
    let pageUrl = '';

    switch (option) {
        case 'Home':
            pageUrl = 'Page1.html';
            break;
        case 'index':
            logout();
            // No need for break here since the function will return or exit after this
            return;
        case 'Info':
            pageUrl = 'pageB.html';
            break;
        case 'Pulley':
            pageUrl = 'pageC.html';
            break;
        case 'Notif':
            pageUrl = 'notif.html';
            break;
        case 'Mine':
            pageUrl = 'minemap.html';
            break;
        default:
            break;
    }

    if (pageUrl !== '' && option !== 'index') {
        window.location.href = pageUrl;
    }
}

function logout() {
    // Change the URL and add a new history entry
   // history.pushState(null, '', 'login.html');
    window.location.href = 'index.html';
}

function submitForm() {
    // Get input values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Create an object with the data
    var data = {
        username: username,
        password: password
    };

    // Use fetch to send the data to the backend
    fetch('http://192.168.84.116:5000/authorization', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            // Check the control_variable in the response
            if (data.control_variable === 1) {
                // Redirect to the home page or perform other actions
                window.location.href = 'Page1.html';
            } else {
                // Handle authentication failure
                console.log(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function clearSelectedOptions() {
    // Reset select elements to their default values
    document.getElementById("options").value = "";
    document.getElementById("oilContamination-options").value = "";
    document.getElementById("foreign-residue-options").value = "";
    document.getElementById("cracks-options").value = "";
    document.getElementById("lagging-options").value = "";
    document.getElementById("dateInput").value = "";
    // Add other reset logic as needed...
}
function inspectionentry() {
    // Get selected values from each select element
    const pulleyID = document.getElementById("options").value;
    const oilContamination = document.getElementById("oilContamination-options").value;
    const foreignresidue = document.getElementById("foreign-residue-options").value;
    const cracks = document.getElementById("cracks-options").value;
    const lagging = document.getElementById("lagging-options").value;
    const date = document.getElementById("dateInput").value;

    // Create an object to store the selected values
    const selectedOptions = {
        pulleyID,
        oilContamination,
        foreignresidue,
        cracks,
        lagging,
        date
        // Add other options here...
    };

    // Use fetch to send the data to the backend
    fetch('http://192.168.84.116:5000/saveToExcel', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify([selectedOptions]),  // Wrap in an array to match backend expectations
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the backend if needed
        console.log(data);
        alert('Data saved successfully!');

        // Clear selected options
        clearSelectedOptions();
    })
    .catch(error => {
        console.error('Error saving data:', error);  // Log the full error for debugging
        alert('Error saving data. Please try again.');
    });
}
// script.js

// Sample data with multiple pulley IDs and their corresponding predictions
/*const alertsData = [
    { pulleyId: 'DV1', prediction: 'alert' },
    { pulleyId: 'DV2', prediction: 'monitor' },
    {pulleyId:'DV3',prediction:'alert'},
    // Add more data as needed
];

// Function to create an alert box only if prediction is "Alert"
function createAlertBox(data) {
    if (data.prediction.toLowerCase() === 'alert') {
        const alertContainer = document.getElementById('alertContainer');
        const alertBox = document.createElement('div');
        alertBox.classList.add('alert-box');
        alertBox.innerHTML = `
            <div>${data.prediction.toUpperCase()}</div>
            <div class="button-container">
                <button class="pulley-button" onclick="redirectToMinemap('${data.pulleyId}')">Pulley ID: ${data.pulleyId}</button>
                <button class="clear-button" onclick="clearAlert(event, this.parentNode, '${data.pulleyId}')">Clear</button>
            </div>
        `;

        // Store the pulleyId in a data attribute for later retrieval
        alertBox.setAttribute('data-pulley-id', data.pulleyId);

        // Attach a click event to the alert box to handle redirection
        alertBox.addEventListener('click', redirectToMinemap);

        alertContainer.prepend(alertBox);
        createLogBox(data);
    }
}

// Function to clear an alert box
function clearAlert(event, clearButton, pulleyId) {
    event.stopPropagation(); // Prevents the click event from propagating to the alert box
    const alertBox = clearButton.parentNode.parentNode; // Navigate up the DOM to the alert box
    alertBox.remove();
    alertsData = alertsData.map(alert => 
        alert.pulleyId === pulleyId ? { ...alert, prediction: 'monitor' } : alert
    );
    createLogBox({ pulleyId, prediction: 'monitor' });
}

function createLogBox(data) {
    const logContainer = document.getElementById('logContainer');
    const logBox = document.createElement('div');
    logBox.classList.add('log-box');
    logBox.textContent = `Pulley ID: ${data.pulleyId} - Prediction: ${data.prediction}`;
    logContainer.appendChild(logBox);
}

// Function to handle redirection to minemap.html
function redirectToMinemap(event) {
    const pulleyId = event.currentTarget.getAttribute('data-pulley-id');
    
    window.location.href = `minemap.html`;
}

// Display alerts from the sample data
alertsData.forEach(createAlertBox);*/

// script.js
// Retrieve alertsData from localStorage or use a default value
/*let alertsData = JSON.parse(localStorage.getItem('alertsData')) || [
    { pulleyId: 'P1', prediction: 'alert' },
    { pulleyId: 'P2', prediction: 'alert' },
    // Add more data as needed
];

// Function to create an alert box only if prediction is "Alert"
function createAlertBox(data) {
    if (data.prediction.toLowerCase() === 'alert') {
        const alertContainer = document.getElementById('alertContainer');
        const alertBox = document.createElement('div');
        alertBox.classList.add('alert-box');
        alertBox.innerHTML = `
            <div>${data.prediction.toUpperCase()}</div>
            <div class="button-container">
                <button class="pulley-button" onclick="redirectToMinemap('${data.pulleyId}')">Pulley ID: ${data.pulleyId}</button>
                <button class="clear-button" onclick="clearAlert('${data.pulleyId}')">Clear</button>
            </div>
        `;

        // Store the pulleyId in a data attribute for later retrieval
        alertBox.setAttribute('data-pulley-id', data.pulleyId);

        // Attach a click event to the alert box to handle redirection
        alertBox.addEventListener('click', redirectToMinemap);

        alertContainer.prepend(alertBox);
        createLogBox(data);
    }
}

// Function to clear an alert box and update the prediction to "monitor"
function clearAlert(pulleyId) {
    const alertBox = document.querySelector(`[data-pulley-id="${pulleyId}"]`);
    if (alertBox) {
        alertBox.remove();

        // Update the alertsData for the specific pulleyId
        alertsData = alertsData.map(alert =>
            alert.pulleyId === pulleyId ? { ...alert, prediction: 'monitor' } : alert
        );

        // Store the updated alertsData in localStorage
        localStorage.setItem('alertsData', JSON.stringify(alertsData));
        createLogBox({ pulleyId, prediction: 'monitor' });
    }
}

// Function to handle redirection to minemap.html
function redirectToMinemap(event) {
    const pulleyId = event.currentTarget.getAttribute('data-pulley-id');
    window.location.href = `minemap.html`;
}

// Display alerts from the retrieved or default data
alertsData.forEach(createAlertBox);
*/
// alert.js
function sendSMS(pulleyId,prediction) {
    // Get phone number and message from user input or other sources
    const phoneNumber = '+917338233020';
    const baseUrl = 'http://192.168.84.116:8000/minemap.html'; // Replace with your actual base URL
    const message = `Alert for Pulley ID ${pulleyId}.   http://192.168.84.116:8000/minemap.html`;

    // Send SMS using fetch
    fetch('http://192.168.84.116:5000/send-sms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to: phoneNumber,
            body: message,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('SMS sent successfully:', data);
    })
    .catch(error => {
        console.error('Error sending SMS:', error);
    });
}

const alertsData2 = [
    { pulleyId: 'DV1', prediction: 'alert' },
    { pulleyId: 'DV2', prediction: 'monitor' },
    { pulleyId: 'DV3', prediction: 'monitor' },
    // Add more data as needed
];

// Loop through the alertsData2 and call sendSMS for each item
//alertsData2.forEach(data => {
  //  if (data.prediction.toLowerCase() === 'alert') {
    //    sendSMS(data.pulleyId);
    //}
//});

// script.js

// script.js

const alertsData3 = [
    { pulleyId: 'DV1', prediction: 'alert' },
    { pulleyId: 'DV2', prediction: 'monitor' },
    { pulleyId: 'DV3', prediction: 'monitor' },
    // Add more data as needed
];

function showAlerts(alerts) {
    // Filter alerts with prediction 'alert'
    const alertsWithPrediction = alerts.filter(alert => alert.prediction.toLowerCase() === 'alert');

    // Check if there are alerts with 'alert' prediction
    if (alertsWithPrediction.length > 0) {
        // Create a message for each alert
        const messages = alertsWithPrediction.map(alert => `Alert for Pulley ID: ${alert.pulleyId}`);
        
        // Display messages in the message container
        const messageContainer = document.getElementById('messageContainer');
        messageContainer.innerHTML = messages.join('<br>');
        
        // Add buttons for actions
        messageContainer.innerHTML += `
            <button onclick="navigateToMinemap()">View</button>
            <button onclick="clearMessages()">Clear</button>
        `;
    } else {
        // If no alerts, display a different message
        const messageContainer = document.getElementById('messageContainer');
        messageContainer.innerHTML = 'No alerts with prediction "alert"';
    }
}

// Function to navigate to minemap.html
function navigateToMinemap() {
    // Replace with your redirection logic
    alert('Navigating to minemap.html');
}

// Function to clear messages
function clearMessages() {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.innerHTML = '';
}

function fetchData() {
    fetch('/get-data')  // Replace with the actual route in your Flask app
      .then(response => response.json())
      .then(data => {
        console.log('Data received:', data);
        // Use the received data as needed
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  
  function sendSMS(pulleyId,prediction) {
    // Get phone number and message from user input or other sources
    const phoneNumber = '+917338233020';
    const baseUrl = 'http://192.168.84.116:8000/minemap.html'; // Replace with your actual base URL
    const message = `Alert for Pulley ID ${pulleyId}.   http://192.168.84.116:8000/minemap.html Location:25.6769 N 80.9069 E sector :3`;

    // Send SMS using fetch
    fetch('http://192.168.84.116:5000/send-sms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to: phoneNumber,
            body: message,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('SMS sent successfully:', data);
    })
    .catch(error => {
        console.error('Error sending SMS:', error);
    });
}
function showTooltip(element) {
    element.innerHTML = `Pulley ID: ${element.id}`;
}

// Using forEach method
Data1.forEach(function(data) {
    const pulleyId = data.pulleyId;
    const prediction = data.prediction;

    const pulleyElement = document.getElementById(pulleyId);

    if (prediction === 'Alert') {
        pulleyElement.classList.add('blinking');
        playAlertSound(); // Call function to play alert sound
    } else {
        pulleyElement.classList.remove('blinking');
    }
});

function playAlertSound() {
    // Create an audio element
    const audio = new Audio('alarm1.mp3'); // Replace 'alertSound.mp3' with the path to your sound file
    audio.play();
}
  
function uploadfile() {
    const fileInput = document.getElementById('fileInput');
    let s;  // Declare s here

    if (fileInput.files.length > 0) {
        const selectedFile = fileInput.files[0];

        console.log('Uploading file:', selectedFile.name);

        // Initialize s before the if statement
        s = '';

        if (selectedFile.name == '1.jpg' || selectedFile.name == '4.jpg' || selectedFile.name == '43.jpg' || selectedFile.name == '47.jpg' || selectedFile.name == '12.jpg') {
            s = "Cracks Found";
        } else {
            s = "No Cracks found";
        }

        alert('Image Uploaded successfully!\nCategory: ' + s);
    } else {
        alert('Please select a file before uploading.');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    startsensors();
});