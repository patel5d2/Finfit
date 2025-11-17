document.addEventListener('DOMContentLoaded', () => {
    const scheduleBillPaymentForm = document.getElementById('schedule-bill-payment-form');
    const payeeInput = document.getElementById('payee');
    const paymentDateInput = document.getElementById('paymentDate');
    const paymentAmountInput = document.getElementById('paymentAmount');
    const paymentsList = document.getElementById('payments-list');
  
    let scheduledPayments = [];
  
    function renderPayments() {
        paymentsList.innerHTML = '';
        scheduledPayments.forEach(payment => {
            const listItem = document.createElement('li');
            listItem.textContent = `Pay ${payment.payee} $${payment.paymentAmount} on ${payment.paymentDate}`;
            paymentsList.appendChild(listItem);
        });
    }
  
    function validatePayment(payee, paymentDate, paymentAmount) {
      if (!payee || payee.trim() === '') {
        return 'Payee is required';
      }
      if (!paymentDate) {
        return 'Payment date is required';
      }
      if (paymentAmount <= 0) {
        return 'Amount must be greater than 0';
      }
      return '';
    }
  
    function schedulePayment(payee, paymentDate, paymentAmount) {
      const validationError = validatePayment(payee, paymentDate, paymentAmount);
      if (validationError) {
        alert(validationError);
      } else {
        scheduledPayments.push({ payee, paymentDate, paymentAmount });
        renderPayments();
        payeeInput.value = '';
        paymentDateInput.value = '';
        paymentAmountInput.value = '';
      }
    }
  
    scheduleBillPaymentForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const payee = payeeInput.value;
      const paymentDate = paymentDateInput.value;
      const paymentAmount = parseFloat(paymentAmountInput.value);
  
      schedulePayment(payee, paymentDate, paymentAmount);
    });
  });