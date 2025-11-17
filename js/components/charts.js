// Chart data
const pieChartData = {
  labels: ['Groceries', 'Utilities', 'Entertainment'],
  datasets: [
    {
      data: [500, 300, 200],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: 'rgba(234, 236, 244, 1)',
    },
  ],
};

const lineChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Account Balance',
      data: [1000, 2000, 3000, 2500, 3500, 4000],
      backgroundColor: 'rgba(78, 115, 223, 0.05)',
      borderColor: 'rgba(78, 115, 223, 1)',
      borderWidth: 2,
    },
  ],
};

const barChartData = {
  labels: ['Income', 'Expenses'],
  datasets: [
    {
      label: 'Amount',
      data: [6000, 1000],
      backgroundColor: ['#4e73df', '#1cc88a'],
      borderColor: ['#4e73df', '#1cc88a'],
      borderWidth: 1,
    },
  ],
};

// Chart options
const globalChartOptions = {
  maintainAspectRatio: false,
  tooltips: {
    backgroundColor: 'rgb(255,255,255)',
    bodyFontColor: '#858796',
    borderColor: '#dddfeb',
    borderWidth: 1,
    xPadding: 15,
    yPadding: 15,
    displayColors: false,
    caretPadding: 10,
    callbacks: {
      label: (tooltipItem, data) => {
        const label = data.labels[tooltipItem.index];
        const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
        return `${label}: $${value}`;
      },
    },
  },
  legend: {
    display: true,
    position: 'bottom',
    labels: {
      fontColor: '#858796',
      boxWidth: 20,
    },
  },
  cutoutPercentage: 80,
};

// Create charts
const createChart = (canvasId, chartType, chartData) => {
    const chartCtx = document.getElementById(canvasId).getContext('2d');
  
    if (chartCtx) {
      return new Chart(chartCtx, {
        type: chartType,
        data: chartData,
        options: globalChartOptions,
      });
    } else {
      console.error(`Failed to create chart context for ${canvasId}.`);
      return null;
    }
  };

// Initialize and store chart instances
const pieChart = createChart('pie-chart', 'doughnut', pieChartData);
const lineChart = createChart('line-chart', 'line', lineChartData);
const barChart = createChart('bar-chart', 'bar', barChartData);


// Generate random chart data
const generateRandomData = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Update chart data
const updateChartData = (chart, newData) => {
  chart.data.labels = newData.labels;
  chart.data.datasets = newData.datasets;
  chart.update();
};

// Event listeners
document.getElementById('update-statistics').addEventListener('click', () => {
  // Update pie chart data
  const newPieChartData = {
    ...pieChartData,
    datasets: [
      {
        ...pieChartData.datasets[0],
        data: pieChartData.datasets[0].data.map(() => generateRandomData(100, 600)),
      },
    ],
  };
  updateChartData(pieChart, newPieChartData);

  // Update line chart data
  const newLineChartData = {
    ...lineChartData,
    datasets: [
      {
        ...lineChartData.datasets[0],
        data: lineChartData.datasets[0].data.map(() => generateRandomData(1000, 4000)),
      },
    ],
  };
  updateChartData(lineChart, newLineChartData);

  // Update bar chart data
  const newBarChartData = {
    ...barChartData,
    datasets: [
      {
        ...barChartData.datasets[0],
        data: barChartData.datasets[0].data.map(() => generateRandomData(1000, 6000)),
      },
    ],
  };
  updateChartData(barChart, newBarChartData);

  console.log('Update statistics button clicked');
});