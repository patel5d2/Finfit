// Listen for the DOMContentLoaded event to ensure the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get the required DOM elements
  const savingsGoalForm = document.getElementById('savings-goal-form');
  const savingsGoalAmountInput = document.getElementById('savings-goal-amount');
  const savingsCurrentAmountInput = document.getElementById('savings-current-amount');
  const savingsGoalProgress = document.getElementById('savings-goal-progress');
  const savingsGoalLabel = document.getElementById('savings-goal-label');

  let savingsGoal = JSON.parse(localStorage.getItem('savingsGoal')) || { goalAmount: 0, currentAmount: 0 };

  function updateSavingsGoalDisplay() {
    const { goalAmount, currentAmount } = savingsGoal;
    if (goalAmount > 0) {
        const percentage = Math.floor((currentAmount / goalAmount) * 100);
        savingsGoalProgress.style.width = `${percentage}%`;
        savingsGoalLabel.textContent = `${percentage}%`;
    }
  }

  // Function to validate the savings goal input
  function validateSavingsGoal(goalAmount, currentAmount) {
    if (goalAmount <= 0) {
      return 'Goal amount must be greater than 0';
    }
    if (currentAmount < 0) {
      return 'Current amount must be greater than or equal to 0';
    }
    if (currentAmount > goalAmount) {
      return 'Current amount must not be greater than goal amount';
    }
    return '';
  }

  // Function to update the savings goal progress and display
  function updateSavingsGoal(goalAmount, currentAmount) {
    // Validate the input and show an error message if needed
    const validationError = validateSavingsGoal(goalAmount, currentAmount);
    if (validationError) {
      alert(validationError);
    } else {
        savingsGoal = { goalAmount, currentAmount };
        localStorage.setItem('savingsGoal', JSON.stringify(savingsGoal));
        updateSavingsGoalDisplay();
    }
  }

  // Event listener for the savings goal form submission
  savingsGoalForm.addEventListener('submit', (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Parse the input values
    const goalAmount = parseFloat(savingsGoalAmountInput.value);
    const currentAmount = parseFloat(savingsCurrentAmountInput.value);

    // Call the updateSavingsGoal function with the input values
    updateSavingsGoal(goalAmount, currentAmount);
  });

  // Initial display
  updateSavingsGoalDisplay();
});