// This file simulates a backend API for the Finfit application.
// All data is stored in local storage.

const DB_KEY = 'finfit_db';

function getDB() {
    return JSON.parse(localStorage.getItem(DB_KEY)) || {
        user: {
            isLoggedIn: false,
            name: 'User',
            pin: null,
        },
        accounts: [
            { id: 1, name: 'Checking Account', balance: 1000, type: 'checking' },
            { id: 2, name: 'Savings Account', balance: 2500, type: 'savings' },
            { id: 3, name: 'Credit Card', balance: -500, type: 'credit-card' },
        ],
        transactions: [
            { id: 1, accountId: 1, date: '2023-04-01', description: 'ATM Withdrawal', amount: -100, category: 'Cash' },
            { id: 2, accountId: 1, date: '2023-03-29', description: 'Direct Deposit', amount: 2000, category: 'Income' },
            { id: 3, accountId: 1, date: '2023-03-28', description: 'Online Bill Payment', amount: -150, category: 'Bills' },
            { id: 4, accountId: 1, date: '2023-03-26', description: 'Mobile Check Deposit', amount: 500, category: 'Income' },
            { id: 5, accountId: 2, date: '2023-03-25', description: 'Interest Payment', amount: 15, category: 'Income' },
            { id: 6, accountId: 3, date: '2023-04-01', description: 'Groceries', amount: -50, category: 'Food' },
            { id: 7, accountId: 3, date: '2023-03-29', description: 'Gas', amount: -30, category: 'Transport' },
        ],
        savingsGoals: [],
        budgets: [],
        investments: [],
        creditScore: 750,
    };
}

function saveDB(db) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
}

// --- User ---
export function login(pin) {
    const db = getDB();
    if (db.user.pin === pin) {
        db.user.isLoggedIn = true;
        saveDB(db);
        return true;
    }
    return false;
}

export function logout() {
    const db = getDB();
    db.user.isLoggedIn = false;
    saveDB(db);
}

export function setPin(pin) {
    const db = getDB();
    db.user.pin = pin;
    saveDB(db);
}

export function getUser() {
    return getDB().user;
}

// --- Accounts ---
export function getAccounts() {
    return getDB().accounts;
}

export function getAccount(id) {
    return getDB().accounts.find(acc => acc.id === id);
}

// --- Transactions ---
export function getTransactions() {
    return getDB().transactions;
}

// --- Savings Goals ---
export function getSavingsGoals() {
    return getDB().savingsGoals;
}

export function saveSavingsGoal(goal) {
    const db = getDB();
    db.savingsGoals.push(goal);
    saveDB(db);
}

// --- Budgets ---
export function getBudgets() {
    return getDB().budgets;
}

export function saveBudget(budget) {
    const db = getDB();
    db.budgets.push(budget);
    saveDB(db);
}

// --- Investments ---
export function getInvestments() {
    return getDB().investments;
}

export function saveInvestment(investment) {
    const db = getDB();
    db.investments.push(investment);
    saveDB(db);
}

// --- Credit Score ---
export function getCreditScore() {
    return getDB().creditScore;
}
