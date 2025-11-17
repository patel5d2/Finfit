console.log('link_account.js: Script start');
import { saveAccount } from './backend.js';

document.addEventListener('componentsLoaded', () => {
    console.log('link_account.js: componentsLoaded event received');
    const linkAccountForm = document.getElementById('link-account-form');
    if(!linkAccountForm) {
        console.warn('link_account.js: link-account-form element not found.');
        return;
    }
    const linkAccountModalElement = document.getElementById('link-account-modal');
    if (!linkAccountModalElement) {
        console.warn('link_account.js: link-account-modal element not found.');
        return;
    }
    const linkAccountModal = new bootstrap.Modal(linkAccountModalElement);

    linkAccountForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const bankNameInput = document.getElementById('bank-name');
        const bankName = bankNameInput ? bankNameInput.value : 'Unknown Bank';
        
        // Simulate linking account and adding a new account to the database
        const newAccount = {
            id: Date.now(),
            name: `${bankName} Account`,
            balance: Math.random() * 10000,
            type: 'checking'
        };

        console.log('link_account.js: New account linked:', newAccount);
        saveAccount(newAccount); // Assuming saveAccount is implemented in backend.js to update the DB

        linkAccountModal.hide();
        // Optionally, trigger a dashboard re-render to show the new account
        document.dispatchEvent(new Event('accountLinked'));
    });
});
console.log('link_account.js: Script end');
