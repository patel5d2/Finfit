
    document.addEventListener('DOMContentLoaded', () => {
      const navLinks = document.querySelectorAll('.nav-link');
      const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      const loginButton = document.getElementById('login-button');
      const loginModal = document.getElementById('loginModal');
      const searchForm = document.querySelector('.form-inline');
    
      // Add smooth scrolling to nav links
      navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          const target = event.target.getAttribute('href');
          const targetElement = document.querySelector(target);
          targetElement.scrollIntoView({ behavior: 'smooth' });
        });
      });
    
      // Initialize tooltips
      tooltips.forEach(tooltip => {
        new bootstrap.Tooltip(tooltip);
      });
    
      // Show login modal on login button click
      loginButton.addEventListener('click', () => {
        const modalInstance = new bootstrap.Modal(loginModal);
        modalInstance.show();
      });
    
      // Handle search form submission
      searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchInput = event.target.querySelector('input[type="search"]');
        const searchQuery = searchInput.value.trim();
    
        if (searchQuery.length > 0) {
          // Perform search and display results
          // Replace the following line with the actual search implementation
          console.log(`Search query: ${searchQuery}`);
        } else {
          searchInput.focus();
        }
      });
    });

    document.addEventListener('DOMContentLoaded', () => {
      const loginForm = document.getElementById('login-form');
      const loginGoogleButton = document.getElementById('login-google');
      const loginFacebookButton = document.getElementById('login-facebook');
      const createAccountLink = document.querySelector('.modal-footer a');
    
      // Handle login form submission
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const email = loginForm.email.value.trim();
        const password = loginForm.password.value;
        const rememberMe = loginForm['remember-me'].checked;
    
        if (email && password) {
          // Perform authentication and handle response
          // Replace the following lines with the actual authentication implementation
          console.log(`Email: ${email}`);
          console.log(`Password: ${password}`);
          console.log(`Remember me: ${rememberMe}`);
        }
      });
    
      // Handle Google login
      loginGoogleButton.addEventListener('click', () => {
        // Perform Google authentication and handle response
        // Replace the following line with the actual Google authentication implementation
        console.log('Google login clicked');
      });
    
      // Handle Facebook login
      loginFacebookButton.addEventListener('click', () => {
        // Perform Facebook authentication and handle response
        // Replace the following line with the actual Facebook authentication implementation
        console.log('Facebook login clicked');
      });
    
      // Handle create account link click
      createAccountLink.addEventListener('click', (event) => {
        event.preventDefault();
        // Navigate to the registration page or show registration modal
        // Replace the following line with the actual navigation or modal display implementation
        console.log('Create account clicked');
      });
    });
 
    document.addEventListener('DOMContentLoaded', () => {
      const viewCheckingTransactionsBtn = document.getElementById('view-checking-transactions');
      const viewSavingsTransactionsBtn = document.getElementById('view-savings-transactions');
      const viewCreditCardTransactionsBtn = document.getElementById('view-credit-card-transactions');
      const addAccountBtn = document.getElementById('add-account');
    
      // Sample transactions data
      const transactionsData = {
        checking: [
          { date: '2023-04-01', description: 'ATM Withdrawal', amount: '-$100.00' },
          { date: '2023-03-29', description: 'Direct Deposit', amount: '+$2,000.00' },
          // Add more transactions as needed
        ],
        savings: [
          { date: '2023-03-25', description: 'Interest Payment', amount: '+$15.00' },
          // Add more transactions as needed
        ],
        creditCard: [
          // Add transactions as needed
        ],
      };
    
      function displayTransactions(accountType) {
        console.log(`View ${accountType} Account Transactions:`);
        transactionsData[accountType].forEach(transaction => {
          console.log(`${transaction.date} - ${transaction.description} - ${transaction.amount}`);
        });
      }
    
      // Handle view transactions button clicks
      viewCheckingTransactionsBtn.addEventListener('click', () => {
        displayTransactions('checking');
      });
    
      viewSavingsTransactionsBtn.addEventListener('click', () => {
        displayTransactions('savings');
      });
    
      viewCreditCardTransactionsBtn.addEventListener('click', () => {
        displayTransactions('creditCard');
      });
    
      // Handle add account button click
      addAccountBtn.addEventListener('click', () => {
        // Display add account form or navigate to the add account page
        // Replace the following line with the actual form display or navigation implementation
        console.log('Add Account clicked');
      });
    });
    
    document.addEventListener('DOMContentLoaded', () => {
      const transferFundsForm = document.getElementById('transfer-funds-form');
      const fromAccountInput = document.getElementById('fromAccount');
      const toAccountInput = document.getElementById('toAccount');
      const amountInput = document.getElementById('amount');
      const transferFundsResponse = document.getElementById('transfer-funds-response');
    
      // Sample account balances
      let accountBalances = {
        checking: 1000,
        savings: 2500,
        creditCard: -500,
      };
    
      function validateTransfer(fromAccount, toAccount, amount) {
        if (!accountBalances[fromAccount]) {
          return `Invalid from account: ${fromAccount}`;
        }
        if (!accountBalances[toAccount]) {
          return `Invalid to account: ${toAccount}`;
        }
        if (amount <= 0) {
          return 'Amount must be greater than 0';
        }
        if (accountBalances[fromAccount] < amount) {
          return `Insufficient balance in ${fromAccount} account`;
        }
        return '';
      }
    
      function transferFunds(fromAccount, toAccount, amount) {
        const validationError = validateTransfer(fromAccount, toAccount, amount);
        if (validationError) {
          transferFundsResponse.textContent = validationError;
          transferFundsResponse.classList.add('error');
        } else {
          accountBalances[fromAccount] -= amount;
          accountBalances[toAccount] += amount;
          transferFundsResponse.textContent = `Successfully transferred $${amount} from ${fromAccount} to ${toAccount}`;
          transferFundsResponse.classList.remove('error');
        }
      }
    
      transferFundsForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const fromAccount = fromAccountInput.value;
        const toAccount = toAccountInput.value;
        const amount = parseFloat(amountInput.value);
    
        transferFunds(fromAccount, toAccount, amount);
      });
    });
    
    document.addEventListener('DOMContentLoaded', () => {
      const scheduleBillPaymentForm = document.getElementById('schedule-bill-payment-form');
      const payeeInput = document.getElementById('payee');
      const paymentDateInput = document.getElementById('paymentDate');
      const paymentAmountInput = document.getElementById('paymentAmount');
      const paymentsList = document.getElementById('payments-list');
    
      function validatePayment(payee, paymentDate, paymentAmount) {
        if (!payee || payee.trim() === '') {
          return 'Payee is required';
        }
        if (!paymentDate) {
          return 'Payment date is required';
        }
        if (paymentAmount <= 0) {
          return 'Amount must be greater than 0';
        }
        return '';
      }
    
      function schedulePayment(payee, paymentDate, paymentAmount) {
        const validationError = validatePayment(payee, paymentDate, paymentAmount);
        if (validationError) {
          alert(validationError);
        } else {
          const listItem = document.createElement('li');
          listItem.textContent = `Pay ${payee} $${paymentAmount} on ${paymentDate}`;
          paymentsList.appendChild(listItem);
          payeeInput.value = '';
          paymentDateInput.value = '';
          paymentAmountInput.value = '';
        }
      }
    
      scheduleBillPaymentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const payee = payeeInput.value;
        const paymentDate = paymentDateInput.value;
        const paymentAmount = parseFloat(paymentAmountInput.value);
    
        schedulePayment(payee, paymentDate, paymentAmount);
      });
    });
    
    // Listen for the DOMContentLoaded event to ensure the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get the required DOM elements
  const savingsGoalForm = document.getElementById('savings-goal-form');
  const savingsGoalAmountInput = document.getElementById('savings-goal-amount');
  const savingsCurrentAmountInput = document.getElementById('savings-current-amount');
  const savingsGoalProgress = document.getElementById('savings-goal-progress');
  const savingsGoalLabel = document.getElementById('savings-goal-label');

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
      // Calculate the progress percentage
      const percentage = Math.floor((currentAmount / goalAmount) * 100);

      // Update the progress bar and label
      savingsGoalProgress.style.width = `${percentage}%`;
      savingsGoalLabel.textContent = `${percentage}%`;

      // Clear the input fields
      savingsGoalAmountInput.value = '';
      savingsCurrentAmountInput.value = '';
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
});

document.addEventListener('DOMContentLoaded', () => {
  const budgetForm = document.getElementById('budget-form');
  const budgetAmountInput = document.getElementById('budget-amount');
  const budgetDisplay = document.getElementById('budget-display');
  const currentBudget = document.getElementById('current-budget');
  const expensesDisplay = document.getElementById('expenses');
  const remainingBudgetDisplay = document.getElementById('remaining-budget');
  const addExpenseBtn = document.getElementById('add-expense');

  let budget = 0;
  let expenses = 0;

  function updateBudgetDisplay() {
    currentBudget.textContent = `Current Budget: $${budget.toFixed(2)}`;
    expensesDisplay.textContent = `Expenses: $${expenses.toFixed(2)}`;
    remainingBudgetDisplay.textContent = `Remaining Budget: $${(budget - expenses).toFixed(2)}`;
  }

  budgetForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const budgetAmount = parseFloat(budgetAmountInput.value);
    if (budgetAmount >= 0) {
      budget = budgetAmount;
      updateBudgetDisplay();
      budgetAmountInput.value = '';
    } else {
      alert('Budget amount must be greater than or equal to 0');
    }
  });

  addExpenseBtn.addEventListener('click', () => {
    const expenseAmount = parseFloat(prompt('Enter expense amount:'));

    if (isNaN(expenseAmount)) {
      alert('Please enter a valid expense amount');
    } else if (expenseAmount < 0) {
      alert('Expense amount must be greater than or equal to 0');
    } else {
      expenses += expenseAmount;
      updateBudgetDisplay();
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const loanDetailsForm = document.getElementById('loan-details-form');
  const loanAmountInput = document.getElementById('loan-amount');
  const loanTypeSelect = document.getElementById('loan-type');
  const interestRateInput = document.getElementById('interest-rate');
  const loanTermInput = document.getElementById('loan-term');
  const loanResults = document.getElementById('loan-results');
  const monthlyPaymentDisplay = document.getElementById('monthly-payment');
  const amortizationTable = document.getElementById('amortization-table');
  const amortizationSchedule = document.getElementById('amortization-schedule');
  const expandCollapseBtn = document.getElementById('expand-collapse');

  function calculateMonthlyPayment(principal, interestRate, termInMonths) {
    const rate = interestRate / 100 / 12;
    const factor = (1 + rate) ** termInMonths;
    return (principal * rate * factor) / (factor - 1);
  }

  function generateAmortizationSchedule(principal, interestRate, termInMonths, monthlyPayment) {
    const schedule = [];
    let balance = principal;

    for (let i = 1; i <= termInMonths; i++) {
      const interestPayment = balance * (interestRate / 100 / 12);
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month: i,
        principalPayment,
        interestPayment,
        remainingBalance: balance > 0 ? balance : 0,
      });
    }

    return schedule;
  }

  function displayAmortizationSchedule(schedule) {
    amortizationSchedule.innerHTML = '';
    schedule.forEach(payment => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${payment.month}</td>
        <td>$${payment.principalPayment.toFixed(2)}</td>
        <td>$${payment.interestPayment.toFixed(2)}</td>
        <td>$${payment.remainingBalance.toFixed(2)}</td>
      `;
      amortizationSchedule.appendChild(row);
    });
  }

  loanDetailsForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const principal = parseFloat(loanAmountInput.value);
    const interestRate = parseFloat(interestRateInput.value);
    const termInYears = parseFloat(loanTermInput.value);

    const termInMonths = termInYears * 12;
    const monthlyPayment = calculateMonthlyPayment(principal, interestRate, termInMonths);

    monthlyPaymentDisplay.textContent = `$${monthlyPayment.toFixed(2)}`;
    loanResults.style.display = 'block';

    const schedule = generateAmortizationSchedule(principal, interestRate, termInMonths, monthlyPayment);
    displayAmortizationSchedule(schedule);
  });

  expandCollapseBtn.addEventListener('click', () => {
    if (amortizationTable.style.display === 'none') {
      amortizationTable.style.display = 'table';
      expandCollapseBtn.textContent = 'Collapse';
    } else {
      amortizationTable.style.display = 'none';
      expandCollapseBtn.textContent = 'Expand';
    }
  });
});

// Chart data
const pieChartData = {
  labels: ['Groceries', 'Utilities', 'Entertainment'],
  datasets: [
    {
      data: [500, 300, 200],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: 'rgba(234, 236, 244, 1)',
    },
  ],
};

const lineChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Account Balance',
      data: [1000, 2000, 3000, 2500, 3500, 4000],
      backgroundColor: 'rgba(78, 115, 223, 0.05)',
      borderColor: 'rgba(78, 115, 223, 1)',
      borderWidth: 2,
    },
  ],
};

const barChartData = {
  labels: ['Income', 'Expenses'],
  datasets: [
    {
      label: 'Amount',
      data: [6000, 1000],
      backgroundColor: ['#4e73df', '#1cc88a'],
      borderColor: ['#4e73df', '#1cc88a'],
      borderWidth: 1,
    },
  ],
};

// Chart options
const globalChartOptions = {
  maintainAspectRatio: false,
  tooltips: {
    backgroundColor: 'rgb(255,255,255)',
    bodyFontColor: '#858796',
    borderColor: '#dddfeb',
    borderWidth: 1,
    xPadding: 15,
    yPadding: 15,
    displayColors: false,
    caretPadding: 10,
    callbacks: {
      label: (tooltipItem, data) => {
        const label = data.labels[tooltipItem.index];
        const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
        return `${label}: $${value}`;
      },
    },
  },
  legend: {
    display: true,
    position: 'bottom',
    labels: {
      fontColor: '#858796',
      boxWidth: 20,
    },
  },
  cutoutPercentage: 80,
};

// Create charts
const createCharts = () => {
  const pieChartCtx = document.getElementById('pie-chart').getContext('2d');
  const lineChartCtx = document.getElementById('line-chart').getContext('2d');
  const barChartCtx = document.getElementById('bar-chart').getContext('2d');

  if (pieChartCtx && lineChartCtx && barChartCtx) {
    new Chart(pieChartCtx, {
      type: 'doughnut',
      data: pieChartData,
      options: globalChartOptions,
    });

    new Chart(lineChartCtx, {
      type: 'line',
      data: lineChartData,
      options: globalChartOptions,
    });

    new Chart(barChartCtx, {
      type: 'bar',
      data: barChartData,
      options: globalChartOptions,
    });
  } else {
    console.error('Failed to create chart contexts.');
  }
};

// Event listeners
document.getElementById('update-statistics').addEventListener('click', () => {
  // You can implement the logic to update the charts data here
  console.log('Update statistics button clicked');
});

// Initialize
createCharts();
// Generate random chart data
const generateRandomData = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Update chart data
const updateChartData = (chart, newData) => {
  chart.data.labels = newData.labels;
  chart.data.datasets = newData.datasets;
  chart.update();
};

// Create charts
const createChart = (canvasId, chartType, chartData) => {
  const chartCtx = document.getElementById(canvasId).getContext('2d');

  if (chartCtx) {
    return new Chart(chartCtx, {
      type: chartType,
      data: chartData,
      options: globalChartOptions,
    });
  } else {
    console.error(`Failed to create chart context for ${canvasId}.`);
    return null;
  }
};

// Event listeners
document.getElementById('update-statistics').addEventListener('click', () => {
  // Update pie chart data
  const newPieChartData = {
    ...pieChartData,
    datasets: [
      {
        ...pieChartData.datasets[0],
        data: pieChartData.datasets[0].data.map(() => generateRandomData(100, 600)),
      },
    ],
  };
  updateChartData(pieChart, newPieChartData);

  // Update line chart data
  const newLineChartData = {
    ...lineChartData,
    datasets: [
      {
        ...lineChartData.datasets[0],
        data: lineChartData.datasets[0].data.map(() => generateRandomData(1000, 4000)),
      },
    ],
  };
  updateChartData(lineChart, newLineChartData);

  // Update bar chart data
  const newBarChartData = {
    ...barChartData,
    datasets: [
      {
        ...barChartData.datasets[0],
        data: barChartData.datasets[0].data.map(() => generateRandomData(1000, 6000)),
      },
    ],
  };
  updateChartData(barChart, newBarChartData);

  console.log('Update statistics button clicked');
});

// Initialize and store chart instances
const pieChart = createChart('pie-chart', 'doughnut', pieChartData);
const lineChart = createChart('line-chart', 'line', lineChartData);
const barChart = createChart('bar-chart', 'bar', barChartData);

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

// Function to toggle dark mode
const toggleDarkMode = () => {
  const body = document.body;
  body.classList.toggle('dark-mode');

  // Save user's dark mode preference
  const isDarkMode = body.classList.contains('dark-mode');
  localStorage.setItem('isDarkMode', isDarkMode);
};

// Event listener for the dark mode toggle button
document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);

// Initialize dark mode preference from local storage
const isDarkMode = localStorage.getItem('isDarkMode') === 'true';
if (isDarkMode) {
  toggleDarkMode();
}
