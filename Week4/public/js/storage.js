// storage.js
const STORAGE_KEY = "ft_transactions";
const SETTINGS_KEY = "ft_settings";

function getTransactions() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function addTransaction(transaction) {
  const transactions = getTransactions();
  transaction.id = Date.now();
  transactions.push(transaction);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function deleteTransaction(id) {
  const filtered = getTransactions().filter((t) => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

function clearTransactions() {
  localStorage.removeItem(STORAGE_KEY);
}

function getBalance() {
  return getTransactions().reduce((total, t) => {
    return t.type === "income" ? total + t.amount : total - t.amount;
  }, 0);
}

function getTotalIncome() {
  return getTransactions()
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
}

function getTotalExpenses() {
  return getTransactions()
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
}

function getCategoryTotals() {
  const totals = {};
  getTransactions()
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    });
  return totals;
}

function getSettings() {
  const data = localStorage.getItem(SETTINGS_KEY);
  return data ? JSON.parse(data) : { budget: 0, currency: "₹", darkMode: false };
}

function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}