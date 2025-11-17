document.addEventListener('DOMContentLoaded', () => {
    const transferFundsForm = document.getElementById('transfer-funds-form');
    const fromAccountInput = document.getElementById('fromAccount');
    const toAccountInput = document.getElementById('toAccount');
    const amountInput = document.getElementById('amount');
    const transferFundsResponse = document.getElementById('transfer-funds-response');
    const checkingBalance = document.getElementById('checking-balance');
    const savingsBalance = document.getElementById('savings-balance');
    const creditCardBalance = document.getElementById('credit-card-balance');
  
    // Sample account balances
    let accountBalances = {
      checking: 1000,
      savings: 2500,
      creditCard: -500,
    };
  
    function updateBalances() {
        checkingBalance.textContent = `Balance: $${accountBalances.checking.toFixed(2)}`;
        savingsBalance.textContent = `Balance: $${accountBalances.savings.toFixed(2)}`;
        creditCardBalance.textContent = `Balance: $${accountBalances.creditCard.toFixed(2)}`;
    }
  
    function validateTransfer(fromAccount, toAccount, amount) {
      if (!accountBalances[fromAccount]) {
        return `Invalid from account: ${fromAccount}`;
      }
      if (!accountBalances[toAccount]) {
        return `Invalid to account: ${toAccount}`;
      }
      if (amount <= 0) {
        return 'Amount must be greater than 0';
      }
      if (accountBalances[fromAccount] < amount) {
        return `Insufficient balance in ${fromAccount} account`;
      }
      return '';
    }
  
    function transferFunds(fromAccount, toAccount, amount) {
      const validationError = validateTransfer(fromAccount, toAccount, amount);
      if (validationError) {
        transferFundsResponse.textContent = validationError;
        transferFundsResponse.classList.add('error');
      } else {
        accountBalances[fromAccount] -= amount;
        accountBalances[toAccount] += amount;
        transferFundsResponse.textContent = `Successfully transferred $${amount} from ${fromAccount} to ${toAccount}`;
        transferFundsResponse.classList.remove('error');
        updateBalances();
      }
    }
  
    transferFundsForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const fromAccount = fromAccountInput.value;
      const toAccount = toAccountInput.value;
      const amount = parseFloat(amountInput.value);
  
      transferFunds(fromAccount, toAccount, amount);
    });

    // Initial balance display
    updateBalances();
  });