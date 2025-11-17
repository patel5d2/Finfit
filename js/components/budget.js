document.addEventListener('DOMContentLoaded', () => {
  const budgetForm = document.getElementById('budget-form');
  const budgetAmountInput = document.getElementById('budget-amount');
  const currentBudget = document.getElementById('current-budget');
  const expensesDisplay = document.getElementById('expenses');
  const remainingBudgetDisplay = document.getElementById('remaining-budget');
  const addExpenseForm = document.getElementById('add-expense-form');
  const expenseNameInput = document.getElementById('expense-name');
  const expenseAmountInput = document.getElementById('expense-amount');
  const expenseList = document.getElementById('expense-list');

  let budget = JSON.parse(localStorage.getItem('budget')) || 0;
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  function updateBudgetDisplay() {
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    currentBudget.textContent = `Current Budget: $${budget.toFixed(2)}`;
    expensesDisplay.textContent = `Expenses: $${totalExpenses.toFixed(2)}`;
    remainingBudgetDisplay.textContent = `Remaining Budget: $${(budget - totalExpenses).toFixed(2)}`;
  }

  function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach(expense => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${expense.name}</span><span>$${expense.amount.toFixed(2)}</span>`;
        expenseList.appendChild(listItem);
    });
  }

  budgetForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const budgetAmount = parseFloat(budgetAmountInput.value);
    if (budgetAmount >= 0) {
      budget = budgetAmount;
      localStorage.setItem('budget', JSON.stringify(budget));
      updateBudgetDisplay();
      budgetAmountInput.value = '';
    } else {
      alert('Budget amount must be greater than or equal to 0');
    }
  });

  addExpenseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const expenseName = expenseNameInput.value;
    const expenseAmount = parseFloat(expenseAmountInput.value);

    if (expenseName && expenseAmount > 0) {
        expenses.push({ name: expenseName, amount: expenseAmount });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        updateBudgetDisplay();
        renderExpenses();
        expenseNameInput.value = '';
        expenseAmountInput.value = '';
    } else {
        alert('Please enter a valid expense name and amount');
    }
  });

  // Initial display
  updateBudgetDisplay();
  renderExpenses();
});