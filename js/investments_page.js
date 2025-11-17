console.log('investments_page.js: Script start');
import { getInvestments } from './backend.js';

document.addEventListener('componentsLoaded', () => {
    console.log('investments_page.js: componentsLoaded event received');
    const portfolioPerformanceChartCanvas = document.getElementById('portfolio-performance-chart');
    const assetAllocationChartCanvas = document.getElementById('asset-allocation-chart');
    const investmentsTbody = document.getElementById('investments-tbody');

    if (!portfolioPerformanceChartCanvas || !assetAllocationChartCanvas || !investmentsTbody) {
        console.warn('investments_page.js: One or more investment page elements not found.');
        return;
    }

    function renderInvestmentsPage() {
        console.log('investments_page.js: Rendering investments page...');
        renderPortfolioPerformance();
        renderAssetAllocation();
        renderInvestments();
    }

    function renderPortfolioPerformance() {
        const investments = getInvestments();
        // This is just a simulation. In a real app, you would fetch historical data for the portfolio.
        const dates = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const portfolioValues = [1000, 1200, 1100, 1300, 1400, 1500];

        new Chart(portfolioPerformanceChartCanvas, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Portfolio Value',
                    data: portfolioValues,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1
                }]
            }
        });
    }

    function renderAssetAllocation() {
        const investments = getInvestments();
        const assetAllocation = investments.reduce((acc, investment) => {
            // In a real app, you would have the type of investment (Stock, ETF, etc.)
            const type = 'Stock'; 
            acc[type] = (acc[type] || 0) + investment.amount;
            return acc;
        }, {});

        new Chart(assetAllocationChartCanvas, {
            type: 'pie',
            data: {
                labels: Object.keys(assetAllocation),
                datasets: [{
                    data: Object.values(assetAllocation),
                    backgroundColor: [
                        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796', '#5a5c69'
                    ]
                }]
            }
        });
    }

    function renderInvestments() {
        const investments = getInvestments();
        investmentsTbody.innerHTML = '';
        if (investments.length === 0) {
            investmentsTbody.innerHTML = '<tr><td colspan="3">No investments added yet.</td></tr>';
            return;
        }
        investments.forEach(investment => {
            const row = document.createElement('tr');
            // This is just a simulation. In a real app, you would calculate gains/losses.
            const gainsLosses = (Math.random() - 0.5) * investment.amount * 0.1;
            row.innerHTML = `
                <td>${investment.name}</td>
                <td>$${investment.amount.toFixed(2)}</td>
                <td style="color: ${gainsLosses >= 0 ? 'green' : 'red'}">$${gainsLosses.toFixed(2)}</td>
            `;
            investmentsTbody.appendChild(row);
        });
    }

    renderInvestmentsPage();
});
console.log('investments_page.js: Script end');