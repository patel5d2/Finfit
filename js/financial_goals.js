console.log('financial_goals.js: Script start');
import { getSavingsGoals, saveSavingsGoal } from './backend.js';

document.addEventListener('componentsLoaded', () => {
    console.log('financial_goals.js: componentsLoaded event received');
    const createGoalModalElement = document.getElementById('create-goal-modal');
    if (!createGoalModalElement) {
        console.warn('financial_goals.js: create-goal-modal element not found.');
        return;
    }
    const createGoalModal = new bootstrap.Modal(createGoalModalElement);
    const createGoalForm = document.getElementById('create-goal-form');
    const goalsList = document.getElementById('goals-list');

    if (!createGoalForm || !goalsList) {
        console.warn('financial_goals.js: One or more financial goals elements not found.');
        return;
    }

    function renderFinancialGoals() {
        console.log('financial_goals.js: Rendering financial goals...');
        const savingsGoals = getSavingsGoals();
        goalsList.innerHTML = '';
        if (savingsGoals.length === 0) {
            goalsList.innerHTML = '<li class="list-group-item">No financial goals set yet.</li>';
            return;
        }
        savingsGoals.forEach(goal => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            const percentage = (goal.currentAmount / goal.goalAmount) * 100;
            const daysLeft = Math.ceil((goal.goalAmount - goal.currentAmount) / (goal.currentAmount / 30)); // Simplified calculation
            listItem.innerHTML = `
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${goal.name}</h5>
                    <small>$${goal.currentAmount.toFixed(2)} / $${goal.goalAmount.toFixed(2)}</small>
                </div>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${percentage}%;" aria-valuenow="${goal.currentAmount}" aria-valuemin="0" aria-valuemax="${goal.goalAmount}"></div>
                </div>
                <small>Days until goal met (est.): ${daysLeft > 0 && isFinite(daysLeft) ? daysLeft : 'N/A'}</small>
            `;
            goalsList.appendChild(listItem);
        });
    }

    createGoalForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const nameInput = document.getElementById('goal-name');
        const goalAmountInput = document.getElementById('goal-amount');
        const currentAmountInput = document.getElementById('current-amount');

        const name = nameInput ? nameInput.value : '';
        const goalAmount = goalAmountInput ? parseFloat(goalAmountInput.value) : 0;
        const currentAmount = currentAmountInput ? parseFloat(currentAmountInput.value) : 0;

        if (name && goalAmount > 0 && currentAmount >= 0) {
            const newGoal = {
                name,
                goalAmount,
                currentAmount,
            };
            saveSavingsGoal(newGoal);
            renderFinancialGoals();
            createGoalModal.hide();
            console.log('financial_goals.js: New goal saved:', newGoal);
        } else {
            alert('Please enter valid goal details.');
            console.warn('financial_goals.js: Invalid goal input.');
        }
    });

    renderFinancialGoals();
});
console.log('financial_goals.js: Script end');