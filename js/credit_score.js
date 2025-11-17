console.log('credit_score.js: Script start');
import { getCreditScore } from './backend.js';

document.addEventListener('componentsLoaded', () => {
    console.log('credit_score.js: componentsLoaded event received');
    const creditScoreModalElement = document.getElementById('credit-score-modal');
    if(!creditScoreModalElement) {
        console.warn('credit_score.js: credit-score-modal element not found.');
        return;
    }
    const creditScoreModal = new bootstrap.Modal(creditScoreModalElement);
    const creditScoreDisplay = document.getElementById('credit-score');
    const viewCreditScoreBtn = document.getElementById('view-credit-score-btn');

    if(viewCreditScoreBtn) {
        viewCreditScoreBtn.addEventListener('click', () => {
            console.log('credit_score.js: View Credit Score button clicked.');
            // This is just a simulation. In a real app, you would fetch the credit score from an API.
            const creditScore = getCreditScore();
            if (creditScoreDisplay) {
                creditScoreDisplay.textContent = creditScore;
            } else {
                console.warn('credit_score.js: credit-score element not found.');
            }
        });
    } else {
        console.warn('credit_score.js: view-credit-score-btn element not found.');
    }
});
console.log('credit_score.js: Script end');