document.addEventListener('DOMContentLoaded', () => {
  const loanDetailsForm = document.getElementById('loan-details-form');
  const loanAmountInput = document.getElementById('loan-amount');
  const loanTypeSelect = document.getElementById('loan-type');
  const interestRateInput = document.getElementById('interest-rate');
  const loanTermInput = document.getElementById('loan-term');
  const loanResults = document.getElementById('loan-results');
  const monthlyPaymentDisplay = document.getElementById('monthly-payment');
  const amortizationTable = document.getElementById('amortization-table');
  const amortizationSchedule = document.getElementById('amortization-schedule');
  const expandCollapseBtn = document.getElementById('expand-collapse');

  function calculateMonthlyPayment(principal, interestRate, termInMonths) {
    const rate = interestRate / 100 / 12;
    const factor = (1 + rate) ** termInMonths;
    return (principal * rate * factor) / (factor - 1);
  }

  function generateAmortizationSchedule(principal, interestRate, termInMonths, monthlyPayment) {
    const schedule = [];
    let balance = principal;

    for (let i = 1; i <= termInMonths; i++) {
      const interestPayment = balance * (interestRate / 100 / 12);
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month: i,
        principalPayment,
        interestPayment,
        remainingBalance: balance > 0 ? balance : 0,
      });
    }

    return schedule;
  }

  function displayAmortizationSchedule(schedule) {
    amortizationSchedule.innerHTML = '';
    schedule.forEach(payment => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${payment.month}</td>
        <td>$${payment.principalPayment.toFixed(2)}</td>
        <td>$${payment.interestPayment.toFixed(2)}</td>
        <td>$${payment.remainingBalance.toFixed(2)}</td>
      `;
      amortizationSchedule.appendChild(row);
    });
  }

  loanDetailsForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const principal = parseFloat(loanAmountInput.value);
    const interestRate = parseFloat(interestRateInput.value);
    const termInYears = parseFloat(loanTermInput.value);

    const termInMonths = termInYears * 12;
    const monthlyPayment = calculateMonthlyPayment(principal, interestRate, termInMonths);

    monthlyPaymentDisplay.textContent = `$${monthlyPayment.toFixed(2)}`;
    loanResults.style.display = 'block';

    const schedule = generateAmortizationSchedule(principal, interestRate, termInMonths, monthlyPayment);
    displayAmortizationSchedule(schedule);
  });

  expandCollapseBtn.addEventListener('click', () => {
    if (amortizationTable.style.display === 'none') {
      amortizationTable.style.display = 'table';
      expandCollapseBtn.textContent = 'Collapse';
    } else {
      amortizationTable.style.display = 'none';
      expandCollapseBtn.textContent = 'Expand';
    }
  });
});