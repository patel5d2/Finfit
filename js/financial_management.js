console.log('financial_management.js: Script start');
import { getTransactions, getBudgets } from './backend.js';

document.addEventListener('componentsLoaded', () => {
    console.log('financial_management.js: componentsLoaded event received');
    const spendingAnalysisChartCanvas = document.getElementById('spending-analysis-chart');
    const monthlyCashFlowChartCanvas = document.getElementById('monthly-cash-flow-chart');
    const expenseCategoriesTbody = document.getElementById('expense-categories-tbody');

    if (!spendingAnalysisChartCanvas || !monthlyCashFlowChartCanvas || !expenseCategoriesTbody) {
        console.warn('financial_management.js: One or more chart/table elements not found.');
        return;
    }

    function renderFinancialManagement() {
        console.log('financial_management.js: Rendering financial management...');
        renderSpendingAnalysis();
        renderMonthlyCashFlow();
        renderExpenseCategories();
    }

    function renderSpendingAnalysis() {
        const transactions = getTransactions();
        const spendingByCategory = transactions.reduce((acc, transaction) => {
            if (transaction.amount < 0) {
                acc[transaction.category] = (acc[transaction.category] || 0) + Math.abs(transaction.amount);
            }
            return acc;
        }, {});

        new Chart(spendingAnalysisChartCanvas, {
            type: 'doughnut',
            data: {
                labels: Object.keys(spendingByCategory),
                datasets: [{
                    data: Object.values(spendingByCategory),
                    backgroundColor: [
                        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796', '#5a5c69'
                    ]
                }]
            }
        });
    }

    function renderMonthlyCashFlow() {
        const transactions = getTransactions();
        const monthlyCashFlow = transactions.reduce((acc, transaction) => {
            const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });
            if (transaction.amount > 0) {
                acc[month] = {
                    income: (acc[month]?.income || 0) + transaction.amount,
                    expenses: acc[month]?.expenses || 0
                };
            } else {
                acc[month] = {
                    income: acc[month]?.income || 0,
                    expenses: (acc[month]?.expenses || 0) + Math.abs(transaction.amount)
                };
            }
            return acc;
        }, {});

        new Chart(monthlyCashFlowChartCanvas, {
            type: 'bar',
            data: {
                labels: Object.keys(monthlyCashFlow),
                datasets: [
                    {
                        label: 'Income',
                        data: Object.values(monthlyCashFlow).map(d => d.income),
                        backgroundColor: '#1cc88a'
                    },
                    {
                        label: 'Expenses',
                        data: Object.values(monthlyCashFlow).map(d => d.expenses),
                        backgroundColor: '#e74a3b'
                    }
                ]
            }
        });
    }

    function renderExpenseCategories() {
        const budgets = getBudgets();
        expenseCategoriesTbody.innerHTML = '';
        budgets.forEach(budget => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${budget.category}</td>
                <td>$${budget.spent.toFixed(2)}</td>
                <td>$${budget.amount.toFixed(2)}</td>
            `;
            expenseCategoriesTbody.appendChild(row);
        });
    }

    renderFinancialManagement();
});
console.log('financial_management.js: Script end');