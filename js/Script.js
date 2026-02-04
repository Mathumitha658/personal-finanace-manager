// ====== GLOBAL DATA ======
let totalIncome = 0;
let expenses = [];
let editIndex = -1;
let expenseChart = null;

// ====== DOM ======
const incomeInput = document.getElementById("income");
const incomeBtn = document.getElementById("setIncome");

const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("expenseDate");
const expenseForm = document.getElementById("expenseForm");

const incomeDisplay = document.querySelector(".text-success");
const expenseDisplay = document.querySelector(".text-danger");
const balanceDisplay = document.querySelector(".text-primary");

const expenseList = document.getElementById("expenseList");
const categoryList = document.getElementById("categoryList");

// ====== SET INCOME ======
incomeBtn.addEventListener("click", () => {
  const income = Number(incomeInput.value);
  if (income <= 0) {
    alert("Enter valid income");
    return;
  }
  totalIncome = income;
  updateSummary();
});

// ====== ADD / UPDATE EXPENSE ======
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const amount = Number(amountInput.value);
  const category = categoryInput.value;
  const date = dateInput.value;

  if (!amount || !category || !date) {
    alert("Please fill all fields");
    return;
  }

  const expenseObj = { amount, category, date };

  if (editIndex === -1) {
    expenses.push(expenseObj);
  } else {
    expenses[editIndex] = expenseObj;
    editIndex = -1;
  }

  expenseForm.reset();
  renderExpenses();
  updateSummary();
  renderCategorySummary();
  renderPieChart();
});

// ====== RENDER EXPENSE TABLE ======
function renderExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach((exp, index) => {
    expenseList.innerHTML += `
      <tr>
        <td>₹ ${exp.amount}</td>
        <td>${exp.category}</td>
        <td>${exp.date}</td>
        <td>
          <button class="btn btn-sm btn-warning me-1" onclick="editExpense(${index})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteExpense(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// ====== EDIT ======
function editExpense(index) {
  const exp = expenses[index];
  amountInput.value = exp.amount;
  categoryInput.value = exp.category;
  dateInput.value = exp.date;
  editIndex = index;
}

// ====== DELETE ======
function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
  updateSummary();
  renderCategorySummary();
  renderPieChart();
}

// ====== SUMMARY ======
function updateSummary() {
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  incomeDisplay.innerText = `₹ ${totalIncome}`;
  expenseDisplay.innerText = `₹ ${totalExpense}`;
  balanceDisplay.innerText = `₹ ${totalIncome - totalExpense}`;
}

// ====== CATEGORY LIST ======
function renderCategorySummary() {
  categoryList.innerHTML = "";
  const totals = {};

  expenses.forEach(e => {
    totals[e.category] = (totals[e.category] || 0) + e.amount;
  });

  for (let cat in totals) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.innerHTML = `<span>${cat}</span><strong>₹ ${totals[cat]}</strong>`;
    categoryList.appendChild(li);
  }
}

// ====== PIE CHART ======
function renderPieChart() {
  const canvas = document.getElementById("expenseChart");
  if (!canvas) return;

  const totals = {};
  expenses.forEach(e => {
    totals[e.category] = (totals[e.category] || 0) + e.amount;
  });

  const labels = Object.keys(totals);
  const data = Object.values(totals);

  if (expenseChart) expenseChart.destroy();

  expenseChart = new Chart(canvas, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4bc0c0",
          "#9966ff"
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });
}
