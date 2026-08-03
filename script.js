// ------------------------------------------------------------
// Bank Customer Dashboard
// Handles customer profile, deposits, withdrawals, transaction
// history, search/filter, and dark mode.
// ------------------------------------------------------------

// Sample customer data (in a real app this would come from a server)
const customer = {
  name: "Ananya Sharma",
  id: "CUST10245",
  accountNumber: "50100234567890",
  accountType: "Savings",
  branch: "MG Road, Indore",
  ifsc: "NVTB0001234",
  phone: "+91 98765 43210",
  email: "ananya.sharma@example.com"
};

// App state - loaded from localStorage if it exists
let balance = 25000;
let totalDeposits = 0;
let totalWithdrawals = 0;
let transactions = [];
let currentFilter = "all";

// DOM references grabbed once so we don't keep re-querying
const balanceCard = document.querySelector("#balanceCard");
const depositCard = document.querySelector("#depositCard");
const withdrawCard = document.querySelector("#withdrawCard");
const countCard = document.querySelector("#countCard");

const depositInput = document.querySelector("#depositInput");
const withdrawInput = document.querySelector("#withdrawInput");
const depositError = document.querySelector("#depositError");
const withdrawError = document.querySelector("#withdrawError");

const searchInput = document.querySelector("#searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const transactionList = document.querySelector("#transactionList");

// ------------------------------------------------------------
// Init
// ------------------------------------------------------------
function init() {
  loadData();
  displayCustomer();
  updateDashboard();
  renderTransactions();
  applySavedTheme();
  attachEventListeners();
}

function displayCustomer() {
  document.querySelector("#custName").textContent = customer.name;
  document.querySelector("#custId").textContent = customer.id;
  document.querySelector("#accNumber").textContent = customer.accountNumber;
  document.querySelector("#accType").textContent = customer.accountType;
  document.querySelector("#branch").textContent = customer.branch;
  document.querySelector("#ifsc").textContent = customer.ifsc;
  document.querySelector("#phone").textContent = customer.phone;
  document.querySelector("#email").textContent = customer.email;
}

// ------------------------------------------------------------
// Local Storage
// ------------------------------------------------------------
function saveData() {
  const data = {
    balance,
    totalDeposits,
    totalWithdrawals,
    transactions
  };
  localStorage.setItem("bankData", JSON.stringify(data));
}

function loadData() {
  const saved = localStorage.getItem("bankData");
  if (!saved) return;

  const data = JSON.parse(saved);
  balance = data.balance;
  totalDeposits = data.totalDeposits;
  totalWithdrawals = data.totalWithdrawals;
  transactions = data.transactions || [];
}

// ------------------------------------------------------------
// Dashboard
// ------------------------------------------------------------
function updateDashboard() {
  balanceCard.textContent = formatCurrency(balance);
  depositCard.textContent = formatCurrency(totalDeposits);
  withdrawCard.textContent = formatCurrency(totalWithdrawals);
  countCard.textContent = transactions.length;
}

function formatCurrency(amount) {
  return "₹" + Number(amount).toFixed(2);
}

// ------------------------------------------------------------
// Validation
// ------------------------------------------------------------
function validateAmount(value) {
  // reject empty input
  if (value.trim() === "") {
    return { valid: false, message: "Please enter an amount." };
  }

  const num = parseFloat(value);

  // reject letters / non-numeric input
  if (isNaN(num)) {
    return { valid: false, message: "Please enter a valid amount." };
  }

  // reject zero or negative
  if (num <= 0) {
    return { valid: false, message: "Amount must be greater than zero." };
  }

  return { valid: true, amount: num };
}

// ------------------------------------------------------------
// Deposit
// ------------------------------------------------------------
function depositMoney() {
  depositError.textContent = "";
  const result = validateAmount(depositInput.value);

  if (!result.valid) {
    depositError.textContent = result.message;
    return;
  }

  const amount = round2(result.amount);
  balance = round2(balance + amount);
  totalDeposits = round2(totalDeposits + amount);

  addTransaction("deposit", amount);

  depositInput.value = "";
  updateDashboard();
  renderTransactions();
  saveData();
}

// ------------------------------------------------------------
// Withdraw
// ------------------------------------------------------------
function withdrawMoney() {
  withdrawError.textContent = "";
  const result = validateAmount(withdrawInput.value);

  if (!result.valid) {
    withdrawError.textContent = result.message;
    return;
  }

  const amount = round2(result.amount);

  if (amount > balance) {
    withdrawError.textContent = "Insufficient balance for this withdrawal.";
    return;
  }

  balance = round2(balance - amount);
  totalWithdrawals = round2(totalWithdrawals + amount);

  addTransaction("withdraw", amount);

  withdrawInput.value = "";
  updateDashboard();
  renderTransactions();
  saveData();
}

function round2(num) {
  return Math.round(num * 100) / 100;
}

// ------------------------------------------------------------
// Transactions
// ------------------------------------------------------------
function addTransaction(type, amount) {
  const now = new Date();

  const txn = {
    id: Date.now(),
    type: type,
    amount: amount,
    balanceAfter: balance,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString()
  };

  // newest first
  transactions.unshift(txn);
}

function renderTransactions() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  let filtered = transactions.filter((txn) => {
    // apply the active filter button first
    if (currentFilter !== "all" && txn.type !== currentFilter) {
      return false;
    }
    return true;
  });

  // then apply the search box on top of the filter
  if (searchTerm !== "") {
    filtered = filtered.filter((txn) => {
      const matchesType = txn.type.includes(searchTerm);
      const matchesAmount = txn.amount.toString().includes(searchTerm);
      return matchesType || matchesAmount;
    });
  }

  transactionList.innerHTML = "";

  if (filtered.length === 0) {
    transactionList.innerHTML = `<p class="no-transactions">No transactions found.</p>`;
    return;
  }

  filtered.forEach((txn) => {
    const item = document.createElement("div");
    item.className = `transaction-item ${txn.type}`;

    const sign = txn.type === "deposit" ? "+" : "-";

    item.innerHTML = `
      <div class="txn-left">
        <p class="txn-type">${txn.type}</p>
        <p class="txn-date">${txn.date} • ${txn.time}</p>
      </div>
      <div class="txn-right">
        <p class="txn-amount ${txn.type}">${sign}${formatCurrency(txn.amount)}</p>
        <p class="txn-balance">Balance: ${formatCurrency(txn.balanceAfter)}</p>
      </div>
    `;

    transactionList.appendChild(item);
  });
}

// ------------------------------------------------------------
// Dark mode
// ------------------------------------------------------------
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", isDark ? "on" : "off");

  const btn = document.querySelector("#darkModeBtn");
  btn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
}

function applySavedTheme() {
  const saved = localStorage.getItem("darkMode");
  if (saved === "on") {
    document.body.classList.add("dark");
    document.querySelector("#darkModeBtn").textContent = "☀️ Light Mode";
  }
}

// ------------------------------------------------------------
// Event listeners
// ------------------------------------------------------------
function attachEventListeners() {
  document.querySelector("#depositBtn").addEventListener("click", depositMoney);
  document.querySelector("#withdrawBtn").addEventListener("click", withdrawMoney);
  document.querySelector("#darkModeBtn").addEventListener("click", toggleDarkMode);

  searchInput.addEventListener("input", renderTransactions);

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderTransactions();
    });
  });

  // allow pressing Enter inside the amount fields
  depositInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") depositMoney();
  });

  withdrawInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") withdrawMoney();
  });
}

// kick things off
init();
