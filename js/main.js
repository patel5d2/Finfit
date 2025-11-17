async function loadComponents() {
    const components = [
        { url: '_header.html', placeholderId: 'header-placeholder' },
        { url: '_pin_lock.html', placeholderId: 'pin-lock-placeholder' },
        { url: '_dashboard.html', placeholderId: 'dashboard-placeholder' },
        { url: '_link_account.html', placeholderId: 'link-account-placeholder' },
        { url: '_categorize_transaction.html', placeholderId: 'categorize-transaction-placeholder' },
        { url: '_budget.html', placeholderId: 'budget-placeholder' },
        { url: '_investments.html', placeholderId: 'investments-placeholder' },
        { url: '_credit_score.html', placeholderId: 'credit-score-placeholder' },
        { url: '_stock_market.html', placeholderId: 'stock-market-placeholder' },
        { url: '_footer.html', placeholderId: 'footer-placeholder' }
    ];

    for (const component of components) {
        try {
            const response = await fetch(component.url);
            const data = await response.text();
            const placeholder = document.getElementById(component.placeholderId);
            if (placeholder) {
                placeholder.innerHTML = data;
            }
        } catch (error) {
            console.error(`Error loading component: ${component.url}`, error);
        }
    }
}

async function main() {
    await loadComponents();
    const event = new Event('componentsLoaded');
    document.dispatchEvent(event);
    const appModule = await import('./app.js');
}

main();
