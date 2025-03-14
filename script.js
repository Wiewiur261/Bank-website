document.addEventListener("DOMContentLoaded", () => {
  loadBalance();
  loadHistory();
});

function changeBalance(isDeposit) {
  let inputElement = document.getElementById("amountInput");
  let balanceElement = document.getElementById("balanceAmount");
  let historyElement = document.getElementById("history");

  let amount = parseFloat(inputElement.value);
  if (isNaN(amount) || amount <= 0) {
    alert("Podaj poprawną kwotę.");
    return;
  }

  let currentBalance = parseFloat(balanceElement.textContent);
  let newBalance = isDeposit
    ? currentBalance + amount
    : currentBalance - amount;

  if (newBalance < 0) {
    alert("Brak wystarczających środków.");
    return;
  }

  balanceElement.textContent = newBalance.toFixed(2);
  saveBalance(newBalance);

  let transactionText =
    (isDeposit ? "Wpłata" : "Wypłata") + ": " + amount.toFixed(2) + " PLN";
  let newTransaction = document.createElement("li");
  newTransaction.textContent = transactionText;
  historyElement.prepend(newTransaction);

  saveTransaction(transactionText);
  inputElement.value = "";
}

function saveBalance(balance) {
  localStorage.setItem("balance", balance);
}

function loadBalance() {
  let savedBalance = localStorage.getItem("balance");
  if (savedBalance !== null) {
    document.getElementById("balanceAmount").textContent =
      parseFloat(savedBalance).toFixed(2);
  }
}

function saveTransaction(transaction) {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  history.unshift(transaction);
  localStorage.setItem("history", JSON.stringify(history));
}

function loadHistory() {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  let historyElement = document.getElementById("history");
  history.forEach((transaction) => {
    let newTransaction = document.createElement("li");
    newTransaction.textContent = transaction;
    historyElement.appendChild(newTransaction);
  });
}

function resetAccount() {
  if (confirm("Czy na pewno chcesz zresetować konto?")) {
    localStorage.removeItem("balance");
    localStorage.removeItem("history");
    document.getElementById("balanceAmount").textContent = "0.00";
    document.getElementById("history").innerHTML = "";
  }
}
