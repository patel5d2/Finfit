console.log('dashboard.js: Script start');
import { getAccounts, getTransactions, getBudgets, getSavingsGoals, getInvestments, getCreditScore } from './backend.js';

document.addEventListener('componentsLoaded', () => {
    console.log('dashboard.js: componentsLoaded event received');
    const accountSummaryList = document.getElementById('account-summary-list');
    if(!accountSummaryList) {
        console.warn('dashboard.js: account-summary-list element not found.');
        return;
    }
    const recentTransactionsList = document.getElementById('recent-transactions-list');
    const budgetSummaryList = document.getElementById('budget-summary-list');
    const savingsGoalsSummaryList = document.getElementById('savings-goals-summary-list');
    const investmentsSummaryList = document.getElementById('investments-summary-list');
    const creditScoreSummary = document.getElementById('credit-score-summary');
    const transactionSearch = document.getElementById('transaction-search');

    function renderDashboard(searchQuery = '') {
        console.log('dashboard.js: Rendering dashboard...');
        renderAccountSummary();
        renderRecentTransactions(searchQuery);
        renderBudgetSummary();
        renderSavingsGoalsSummary();
        renderInvestmentsSummary();
        renderCreditScoreSummary();
    }

    function renderAccountSummary() {
        const accounts = getAccounts();
        accountSummaryList.innerHTML = '';
        accounts.forEach(account => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = `
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${account.name}</h5>
                    <small>$${account.balance.toFixed(2)}</small>
                </div>
                <canvas id="account-chart-${account.id}" height="50"></canvas>
            `;
            accountSummaryList.appendChild(listItem);

            const transactions = getTransactions().filter(t => t.accountId === account.id);
            const dates = transactions.map(t => t.date);
            const balances = transactions.map(t => t.amount);
            
            const chartElement = document.getElementById(`account-chart-${account.id}`);
            if (chartElement) {
                new Chart(chartElement, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [{
                            label: 'Balance',
                            data: balances,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            tension: 0.1
                        }]
                    },
                    options: {
                        scales: {
                            x: { display: false },
                            y: { display: false }
                        },
                        plugins: {
                            legend: { display: false }
                        }
                    }
                });
            } else {
                console.warn(`dashboard.js: Chart element for account ${account.id} not found.`);
            }
        });
    }

    function renderRecentTransactions(searchQuery) {
        let transactions = getTransactions();
        if (searchQuery) {
            transactions = transactions.filter(t => t.description.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        transactions = transactions.slice(0, 5);
        if (recentTransactionsList) {
            recentTransactionsList.innerHTML = '';
            transactions.forEach(transaction => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                listItem.dataset.transactionId = transaction.id;
                listItem.innerHTML = `
                    <span>${transaction.description}</span>
                    <span>$${transaction.amount.toFixed(2)}</span>
                `;
                recentTransactionsList.appendChild(listItem);
            });
        } else {
            console.warn('dashboard.js: recent-transactions-list element not found.');
        }
    }

    function renderBudgetSummary() {
        const budgets = getBudgets();
        if (budgetSummaryList) {
            budgetSummaryList.innerHTML = '';
            budgets.forEach(budget => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.innerHTML = `
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${budget.category}</h5>
                        <small>$${budget.spent.toFixed(2)} / $${budget.amount.toFixed(2)}</small>
                    </div>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: ${ (budget.spent / budget.amount) * 100 }%;" aria-valuenow="${budget.spent}" aria-valuemin="0" aria-valuemax="${budget.amount}"></div>
                    </div>
                `;
                budgetSummaryList.appendChild(listItem);
            });
        } else {
            console.warn('dashboard.js: budget-summary-list element not found.');
        }
    }

    function renderSavingsGoalsSummary() {
        const savingsGoals = getSavingsGoals();
        if (savingsGoalsSummaryList) {
            savingsGoalsSummaryList.innerHTML = '';
            savingsGoals.forEach(goal => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.innerHTML = `
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${goal.name}</h5>
                        <small>$${goal.currentAmount.toFixed(2)} / $${goal.goalAmount.toFixed(2)}</small>
                    </div>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: ${ (goal.currentAmount / goal.goalAmount) * 100 }%;" aria-valuenow="${goal.currentAmount}" aria-valuemin="0" aria-valuemax="${goal.goalAmount}"></div>
                    </div>
                `;
                savingsGoalsSummaryList.appendChild(listItem);
            });
        } else {
            console.warn('dashboard.js: savings-goals-summary-list element not found.');
        }
    }

    function renderInvestmentsSummary() {
        const investments = getInvestments();
        if (investmentsSummaryList) {
            investmentsSummaryList.innerHTML = '';
            investments.forEach(investment => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                listItem.innerHTML = `
                    <span>${investment.name}</span>
                    <span class="badge bg-primary rounded-pill">$${investment.amount.toFixed(2)}</span>
                `;
                investmentsSummaryList.appendChild(listItem);
            });
        } else {
            console.warn('dashboard.js: investments-summary-list element not found.');
        }
    }

    function renderCreditScoreSummary() {
        const creditScore = getCreditScore();
        if (creditScoreSummary) {
            creditScoreSummary.textContent = creditScore;
        } else {
            console.warn('dashboard.js: credit-score-summary element not found.');
        }
    }

    if (transactionSearch) {
        transactionSearch.addEventListener('input', (event) => {
            renderDashboard(event.target.value);
        });
    } else {
        console.warn('dashboard.js: transaction-search element not found.');
    }

    renderDashboard();
});
console.log('dashboard.js: Script end');