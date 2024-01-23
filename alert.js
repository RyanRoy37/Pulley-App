// alert.js
const alertsData1 = [
    { pulleyId: 'DV1', prediction: 'alert' },
    { pulleyId: 'DV2', prediction: 'monitor' },
    { pulleyId: 'DV3', prediction: 'alert' },
    // Add more data as needed
];

function createAlertBox(data) {
    if (data.prediction.toLowerCase() === 'alert') {
        const alertContainer = document.getElementById('alertContainer');
        const alertContent = document.getElementById('alertContent');

        alertContent.innerHTML = `Alert for Pulley ID: ${data.pulleyId}`;
        alertContainer.style.display = 'block';
    }
}

function clearAlert() {
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    alertsData1.forEach(createAlertBox);
});
