document.addEventListener('DOMContentLoaded', function() {
  var blinkcontrol = "Alert";
  if (blinkcontrol === 'Alert')
      document.getElementById('circle-overlay').classList.add('blinking');
  else
      document.getElementById('circle-overlay').classList.remove('blinking');
});

function openPage(option) {
  let pageUrl = '';

  switch (option) {
      case 'Home':
          pageUrl = 'home.html';
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
  history.pushState(null, '', 'login.html');
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
  fetch('http://192.168.0.107:5000/authorization', {
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
              window.location.href = 'home.html';
          } else {
              // Handle authentication failure
              console.log(data.message);
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
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
  fetch('http://127.0.0.1:5000/saveToExcel', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedOptions),
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
          console.error('Error:', error);
          alert('Error saving data. Please try again.');
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
