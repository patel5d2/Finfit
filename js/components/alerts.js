// Sample alert data
const sampleAlerts = [
  { date: '2023-04-01', message: 'Suspicious activity detected' },
  { date: '2023-03-25', message: 'Password changed successfully' },
  { date: '2023-03-15', message: 'Low account balance' },
];

// Function to render alerts
const renderAlerts = () => {
  const recentAlerts = document.getElementById('recent-alerts');
  recentAlerts.innerHTML = '';

  sampleAlerts.forEach((alert) => {
    const alertListItem = document.createElement('li');
    alertListItem.textContent = `${alert.date}: ${alert.message}`;
    recentAlerts.appendChild(alertListItem);
  });
};

// Initialize alert rendering
renderAlerts();

// Event listeners for the alert settings form
document.getElementById('alert-settings-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const alertType = document.getElementById('alert-type').value;
  const alertFrequency = document.getElementById('alert-frequency').value;

  // Save alert settings and show a confirmation message
  console.log(`Alert type: ${alertType}`);
  console.log(`Alert frequency: ${alertFrequency}`);

  alert('Alert settings have been saved.');
});