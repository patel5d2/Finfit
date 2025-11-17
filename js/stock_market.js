console.log('stock_market.js: Script start');
import { saveInvestment } from './backend.js';

document.addEventListener('componentsLoaded', () => {
    console.log('stock_market.js: componentsLoaded event received');
    const stockMarketModalElement = document.getElementById('stock-market-modal');
    if (!stockMarketModalElement) {
        console.warn('stock_market.js: stock-market-modal element not found.');
        return;
    }
    const stockMarketModal = new bootstrap.Modal(stockMarketModalElement);
    const stockMarketForm = document.getElementById('stock-market-form');
    const stockTickerInput = document.getElementById('stock-ticker-input');
    const stockMarketLoading = document.getElementById('stock-market-loading');
    const stockMarketData = document.getElementById('stock-market-data');
    const stockCompanyName = document.getElementById('stock-company-name');
    const stockCompanyDescription = document.getElementById('stock-company-description');
    const stockCurrentPrice = document.getElementById('stock-current-price');
    const stockPriceChange = document.getElementById('stock-price-change');
    const stockMarketCap = document.getElementById('stock-market-cap');
    const stockPeRatio = document.getElementById('stock-pe-ratio');
    const stock52WeekHigh = document.getElementById('stock-52-week-high');
    const stock52WeekLow = document.getElementById('stock-52-week-low');
    const stockVolume = document.getElementById('stock-volume');
    const stockPriceChartCanvas = document.getElementById('stock-price-chart');
    const addToPortfolioBtn = document.getElementById('add-to-portfolio-btn');
    const stockNewsList = document.getElementById('stock-news-list');
    let stockChart;

    if (stockMarketForm) {
        stockMarketForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const ticker = stockTickerInput ? stockTickerInput.value.trim().toUpperCase() : '';
            if (ticker) {
                if (stockMarketLoading) stockMarketLoading.style.display = 'block';
                if (stockMarketData) stockMarketData.style.display = 'none';

                const apiKey = '7YQCRWAATJ49ZQWC'; // Replace with your actual Alpha Vantage API key
                const overviewUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`;
                const quoteUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`;
                const timeSeriesUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${apiKey}`;
                const newsUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=${apiKey}`;

                try {
                    const [overviewResponse, quoteResponse, timeSeriesResponse, newsResponse] = await Promise.all([
                        fetch(overviewUrl),
                        fetch(quoteUrl),
                        fetch(timeSeriesUrl),
                        fetch(newsUrl)
                    ]);

                    const overviewData = await overviewResponse.json();
                    const quoteData = (await quoteResponse.json())['Global Quote'];
                    const timeSeriesData = (await timeSeriesResponse.json())['Time Series (Daily)'];
                    const newsData = (await newsResponse.json()).feed;

                    if (stockCompanyName) stockCompanyName.textContent = overviewData.Name || 'N/A';
                    if (stockCompanyDescription) stockCompanyDescription.textContent = overviewData.Description || 'N/A';
                    if (stockCurrentPrice) stockCurrentPrice.textContent = `$${parseFloat(quoteData['05. price'] || 0).toFixed(2)}`;
                    const priceChangeValue = parseFloat(quoteData['09. change'] || 0);
                    if (stockPriceChange) {
                        stockPriceChange.textContent = `${priceChangeValue.toFixed(2)} (${parseFloat(quoteData['10. change percent'] || 0).toFixed(2)}%)`;
                        stockPriceChange.style.color = priceChangeValue >= 0 ? 'green' : 'red';
                    }
                    if (stockMarketCap) stockMarketCap.textContent = `$${(parseInt(overviewData.MarketCapitalization || 0) / 1000000000).toFixed(2)}B`;
                    if (stockPeRatio) stockPeRatio.textContent = overviewData.PERatio || 'N/A';
                    if (stock52WeekHigh) stock52WeekHigh.textContent = `$${parseFloat(overviewData['52WeekHigh'] || 0).toFixed(2)}`;
                    if (stock52WeekLow) stock52WeekLow.textContent = `$${parseFloat(overviewData['52WeekLow'] || 0).toFixed(2)}`;
                    if (stockVolume) stockVolume.textContent = parseInt(overviewData.Volume || 0).toLocaleString();

                    if (timeSeriesData && stockPriceChartCanvas) {
                        const dates = Object.keys(timeSeriesData).reverse();
                        const prices = dates.map(date => parseFloat(timeSeriesData[date]['4. close']));
                        renderStockChart(dates, prices);
                    } else {
                        console.warn('stock_market.js: Time series data or chart canvas not found.');
                    }

                    if (stockNewsList) {
                        stockNewsList.innerHTML = '';
                        if (newsData && newsData.length > 0) {
                            newsData.slice(0, 5).forEach(newsItem => {
                                const listItem = document.createElement('li');
                                listItem.className = 'list-group-item';
                                listItem.innerHTML = `
                                    <a href="${newsItem.url}" target="_blank">${newsItem.title}</a>
                                    <p>${newsItem.summary}</p>
                                `;
                                stockNewsList.appendChild(listItem);
                            });
                        } else {
                            stockNewsList.innerHTML = '<li class="list-group-item">No news available.</li>';
                        }
                    }

                    if (addToPortfolioBtn) {
                        addToPortfolioBtn.onclick = () => {
                            const newInvestment = {
                                name: overviewData.Name || ticker,
                                amount: parseFloat(quoteData['05. price'] || 0),
                            };
                            saveInvestment(newInvestment);
                            stockMarketModal.hide();
                            console.log('stock_market.js: Investment added to portfolio:', newInvestment);
                            document.dispatchEvent(new Event('investmentUpdated')); // Notify dashboard to re-render
                        };
                    }

                    if (stockMarketData) stockMarketData.style.display = 'block';
                } catch (error) {
                    console.error('stock_market.js: Error fetching stock data:', error);
                    alert('Failed to fetch stock data. Please try again. Check console for details.');
                } finally {
                    if (stockMarketLoading) stockMarketLoading.style.display = 'none';
                }
            } else {
                alert('Please enter a stock ticker symbol.');
            }
        });
    } else {
        console.warn('stock_market.js: stock-market-form element not found.');
    }

    function renderStockChart(dates, prices) {
        if (stockChart) {
            stockChart.destroy();
        }
        if (stockPriceChartCanvas) {
            stockChart = new Chart(stockPriceChartCanvas, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'Price',
                        data: prices,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day'
                            }
                        }
                    }
                }
            });
        } else {
            console.warn('stock_market.js: stock-price-chart canvas not found.');
        }
    }
});
console.log('stock_market.js: Script end');