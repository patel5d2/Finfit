document.addEventListener('DOMContentLoaded', () => {
    const viewCheckingTransactionsBtn = document.getElementById('view-checking-transactions');
    const viewSavingsTransactionsBtn = document.getElementById('view-savings-transactions');
    const viewCreditCardTransactionsBtn = document.getElementById('view-credit-card-transactions');
    const addAccountBtn = document.getElementById('add-account');
    const transactionsTbody = document.getElementById('transactions-tbody');
  
    // Sample transactions data
    const transactionsData = {
      checking: [
        { date: '2023-04-01', description: 'ATM Withdrawal', amount: '-$100.00' },
        { date: '2023-03-29', description: 'Direct Deposit', amount: '+$2,000.00' },
        { date: '2023-03-28', description: 'Online Bill Payment', amount: '-$150.00' },
        { date: '2023-03-26', description: 'Mobile Check Deposit', amount: '+$500.00' },
      ],
      savings: [
        { date: '2023-03-25', description: 'Interest Payment', amount: '+$15.00' },
      ],
      creditCard: [
        { date: '2023-04-01', description: 'Groceries', amount: '-$50.00' },
        { date: '2023-03-29', description: 'Gas', amount: '-$30.00' },
      ],
    };
  
    function displayTransactions(accountType) {
        transactionsTbody.innerHTML = '';
        transactionsData[accountType].forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transaction.date}</td>
                <td>${transaction.description}</td>
                <td>${transaction.amount}</td>
            `;
            transactionsTbody.appendChild(row);
        });
    }
  
    // Handle view transactions button clicks
    viewCheckingTransactionsBtn.addEventListener('click', () => {
      displayTransactions('checking');
    });
  
    viewSavingsTransactionsBtn.addEventListener('click', () => {
      displayTransactions('savings');
    });
  
    viewCreditCardTransactionsBtn.addEventListener('click', () => {
      displayTransactions('creditCard');
    });
  
    // Handle add account button click
    addAccountBtn.addEventListener('click', () => {
      // Display add account form or navigate to the add account page
      // Replace the following line with the actual form display or navigation implementation
      console.log('Add Account clicked');
    });
  });