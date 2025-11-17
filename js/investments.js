console.log('investments.js: Script start');
import { saveInvestment } from './backend.js';

document.addEventListener('componentsLoaded', () => {
    console.log('investments.js: componentsLoaded event received');
    const investmentForm = document.getElementById('investment-form');
    if(!investmentForm) {
        console.warn('investments.js: investment-form element not found.');
        return;
    }
    const investmentsModalElement = document.getElementById('investments-modal');
    if (!investmentsModalElement) {
        console.warn('investments.js: investments-modal element not found.');
        return;
    }
    const investmentsModal = new bootstrap.Modal(investmentsModalElement);

    investmentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const nameInput = document.getElementById('investment-name');
        const amountInput = document.getElementById('investment-amount');

        const name = nameInput ? nameInput.value : 'Unknown Investment';
        const amount = amountInput ? parseFloat(amountInput.value) : 0;

        if (name && amount > 0) {
            const newInvestment = {
                name,
                amount,
            };
            saveInvestment(newInvestment);
            investmentsModal.hide();
            console.log('investments.js: New investment saved:', newInvestment);
            document.dispatchEvent(new Event('investmentUpdated')); // Notify dashboard to re-render
        } else {
            alert('Please enter a valid investment name and amount.');
            console.warn('investments.js: Invalid investment input.');
        }
    });
});
console.log('investments.js: Script end');