document.addEventListener("DOMContentLoaded", () => {
    const stockForm = document.getElementById("stock-form");
    const stockInput = document.getElementById("stock-input");
    const stockData = document.getElementById("stock-data");
    const marketIndex = document.getElementById("market-index");
    const latestPrice = document.getElementById("latest-price");
    const latestTime = document.getElementById("latest-time");
    const marketChange = document.getElementById("market-change");
    const marketChangePercent = document.getElementById("market-change-percent");
  
    stockForm.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const stockSymbol = stockInput.value.trim().toUpperCase();
  
      if (stockSymbol) {
        const stockQuoteData = await fetchStockData(stockSymbol);
  
        if (stockQuoteData) {
          updateStockData(stockQuoteData);
        } else {
          alert("Failed to fetch stock data. Please try again.");
        }
      }
    });
  
    function updateStockData(stockQuoteData) {
      marketIndex.textContent = stockQuoteData.symbol;
      latestPrice.textContent = stockQuoteData.latestPrice;
      latestTime.textContent = stockQuoteData.latestTime;
      marketChange.textContent = stockQuoteData.marketChange;
      marketChangePercent.textContent = stockQuoteData.marketChangePercent;
  
      stockData.style.display = "block";
      renderStockChart(stockQuoteData.historicalData);
    }
  
    async function fetchStockData(stockSymbol) {
      try {
        const apiKey = "7YQCRWAATJ49ZQWC";
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${apiKey}`;
        const response = await fetch(url);
  
        if (response.ok) {
          const data = await response.json();
          const quoteData = data["Global Quote"];
  
          if (!quoteData || !quoteData["01. symbol"]) {
            throw new Error("Invalid stock symbol");
          }
  
          const historicalData = await fetchHistoricalData(stockSymbol);
          return {
            symbol: quoteData["01. symbol"],
            latestPrice: quoteData["05. price"],
            latestTime: quoteData["07. latest trading day"],
            marketChange: quoteData["09. change"],
            marketChangePercent: quoteData["10. change percent"],
            historicalData,
          };
        } else {
          throw new Error("Failed to fetch stock data");
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  
    async function fetchHistoricalData(stockSymbol) {
      const apiKey = "7YQCRWAATJ49ZQWC";
      const historicalUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=compact&apikey=${apiKey}`;
      const historicalResponse = await fetch(historicalUrl);
  
      if (historicalResponse.ok) {
        const historicalData = await historicalResponse.json();
        const timeSeriesData = historicalData["Time Series (Daily)"];
        return parseHistoricalData(timeSeriesData);
      } else {
        throw new Error("Failed to fetch historical stock data");
      }
    }
  
    function parseHistoricalData(timeSeriesData) {
      const dates = [];
      const prices = [];
  
      for (const date in timeSeriesData) {
        dates.unshift(date);
        prices.unshift(parseFloat(timeSeriesData[date]["4. close"]));
      }
  
      return { dates, prices };
    }
  
    function renderStockChart(historicalData) {
      const stockChartCanvas = document.getElementById("stock-chart-canvas");
      const stockChartContext = stockChartCanvas.getContext("2d");

      // Destroy the previous chart if it exists
      if (window.stockChart) {
        window.stockChart.destroy();
      }
    
      // Create a new line chart
      window.stockChart = new Chart(stockChartContext, {
        type: "line",
        data: {
          labels: historicalData.dates,
          datasets: [
            {
              label: "Closing Price",
              data: historicalData.prices,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 1,
              pointRadius: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "time",
              time: {
                unit: "month",
              },
            },
            y: {
              beginAtZero: false,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }
});