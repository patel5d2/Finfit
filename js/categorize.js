console.log('categorize.js: Script start');
import { getTransactions, saveTransactionCategory } from './backend.js';

document.addEventListener('componentsLoaded', () => {
    console.log('categorize.js: componentsLoaded event received');
    const categorizeTransactionModalElement = document.getElementById('categorize-transaction-modal');
    if(!categorizeTransactionModalElement) {
        console.warn('categorize.js: categorize-transaction-modal element not found.');
        return;
    }
    const categorizeTransactionModal = new bootstrap.Modal(categorizeTransactionModalElement);
    const categorizeTransactionForm = document.getElementById('categorize-transaction-form');
    const transactionDescription = document.getElementById('transaction-description');
    const transactionCategory = document.getElementById('transaction-category');
    const transactionIdInput = document.getElementById('transaction-id');
    const recentTransactionsList = document.getElementById('recent-transactions-list');

    if(recentTransactionsList) {
        recentTransactionsList.addEventListener('click', (event) => {
            const target = event.target.closest('li');
            if (target && target.dataset.transactionId) {
                const transactionId = parseInt(target.dataset.transactionId);
                const transactions = getTransactions();
                const transaction = transactions.find(t => t.id === transactionId);
                
                if (transaction) {
                    transactionDescription.value = transaction.description;
                    transactionCategory.value = transaction.category;
                    transactionIdInput.value = transaction.id;
        
                    categorizeTransactionModal.show();
                } else {
                    console.warn(`categorize.js: Transaction with ID ${transactionId} not found.`);
                }
            }
        });
    } else {
        console.warn('categorize.js: recent-transactions-list element not found.');
    }

    if (categorizeTransactionForm) {
        categorizeTransactionForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const transactionId = parseInt(transactionIdInput.value);
            const newCategory = transactionCategory.value;

            console.log(`categorize.js: Transaction ${transactionId} categorized as ${newCategory}`);
            // Assuming saveTransactionCategory updates the backend and potentially triggers a re-render
            saveTransactionCategory(transactionId, newCategory); 
            
            categorizeTransactionModal.hide();
            document.dispatchEvent(new Event('transactionCategorized')); // Notify dashboard to re-render
        });
    } else {
        console.warn('categorize.js: categorize-transaction-form element not found.');
    }
});
console.log('categorize.js: Script end');
