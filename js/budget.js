console.log('budget.js: Script start');
import { saveBudget } from './backend.js';

document.addEventListener('componentsLoaded', () => {
    console.log('budget.js: componentsLoaded event received');
    const budgetForm = document.getElementById('budget-form');
    if(!budgetForm) {
        console.warn('budget.js: budget-form element not found.');
        return;
    }
    const budgetModalElement = document.getElementById('budget-modal');
    if (!budgetModalElement) {
        console.warn('budget.js: budget-modal element not found.');
        return;
    }
    const budgetModal = new bootstrap.Modal(budgetModalElement);

    budgetForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const categoryInput = document.getElementById('budget-category');
        const amountInput = document.getElementById('budget-amount');

        const category = categoryInput ? categoryInput.value : 'Uncategorized';
        const amount = amountInput ? parseFloat(amountInput.value) : 0;

        if (category && amount > 0) {
            const newBudget = {
                category,
                amount,
                spent: 0,
            };
            saveBudget(newBudget);
            budgetModal.hide();
            console.log('budget.js: New budget saved:', newBudget);
            document.dispatchEvent(new Event('budgetUpdated')); // Notify dashboard to re-render
        } else {
            alert('Please enter a valid category and amount for the budget.');
            console.warn('budget.js: Invalid budget input.');
        }
    });
});
console.log('budget.js: Script end');
