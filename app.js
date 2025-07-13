// Global state
let employees = [];
let filteredEmployees = [];
let currentPage = 1;
let pageSize = 10;

// Utility to get URL query parameter
function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

document.addEventListener("DOMContentLoaded", () => {
      // Load employees from localStorage or default mock data
    const stored = localStorage.getItem("employees");
    if (stored) {
      employees = JSON.parse(stored);
    } else {
      // Default mock data
      employees = [
        { id: "E001", firstName: "Alice", lastName: "Smith", email: "alice@example.com", department: "HR", role: "Manager" },
        { id: "E002", firstName: "Bob", lastName: "Brown", email: "bob@example.com", department: "IT", role: "Developer" }
      ];
      localStorage.setItem("employees", JSON.stringify(employees));
    }
    filteredEmployees = [...employees];
    renderPage();

    // Search input
    document.getElementById("search").addEventListener("input", () => {
      applyFilters();
    });

    // Page size selector
    document.getElementById("pageSize").addEventListener("change", e => {
      changePageSize(parseInt(e.target.value));
    });
  }

  // Form handling on add/edit page
  const form = document.querySelector("#emp-form");
  if (form) {
    const id = getQueryParam("id");
    if (id) {
      // Prefill edit
      const stored = localStorage.getItem("employees");
      const all = stored ? JSON.parse(stored) : [];
      const emp = all.find(e => e.id === id);
      if (emp) {
        document.getElementById("employeeId").value = emp.id;
        document.getElementById("firstName").value = emp.firstName;
        document.getElementById("lastName").value = emp.lastName;
        document.getElementById("email").value = emp.email;
        document.getElementById("department").value = emp.department;
        document.getElementById("role").value = emp.role;
      }
    }
    form.addEventListener("submit", e => submitForm(e));
  }
});

function renderPage() {
  const start = (currentPage - 1) * pageSize;
  const pageData = filteredEmployees.slice(start, start + pageSize);
  renderTable(pageData);
  updatePagination();
}

function renderTable(data) {
  const tbody = document.querySelector("#employee-table tbody");
  tbody.innerHTML = "";
  data.forEach(emp => {
    const tr = document.createElement("tr");
    tr.setAttribute("data-id", emp.id);
    tr.innerHTML = `
      <td>${emp.id}</td>
      <td>${emp.firstName}</td>
      <td>${emp.lastName}</td>
      <td>${emp.email}</td>
      <td>${emp.department}</td>
      <td>${emp.role}</td>
      <td>
        <button onclick="onEdit('${emp.id}')">Edit</button>
        <button onclick="onDelete('${emp.id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function applyFilters() {
  const searchText = document.getElementById("search").value.toLowerCase();
  filteredEmployees = employees.filter(emp =>
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchText) ||
    emp.email.toLowerCase().includes(searchText)
  );
  currentPage = 1;
  renderPage();
}

function sortBy(field) {
  filteredEmployees.sort((a, b) => a[field].localeCompare(b[field]));
  currentPage = 1;
  renderPage();
}

function changePageSize(size) {
  pageSize = size;
  currentPage = 1;
  renderPage();
}

function goToPage(page) {
  const totalPages = Math.ceil(filteredEmployees.length / pageSize);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderPage();
}

function updatePagination() {
  const totalPages = Math.ceil(filteredEmployees.length / pageSize);
  document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${totalPages}`;
  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").disabled = currentPage === totalPages;
}

function onDelete(id) {
  employees = employees.filter(e => e.id !== id);
  applyFilters();
}

function onEdit(id) {
  window.location.href = `add_edit.html?id=${id}`;
}

function submitForm(event) {
  event.preventDefault();
  let all = localStorage.getItem("employees");
  all = all ? JSON.parse(all) : employees;
  const id = document.getElementById("employeeId").value || `E${Date.now()}`;
  const employee = {
    id,
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    email: document.getElementById("email").value.trim(),
    department: document.getElementById("department").value.trim(),
    role: document.getElementById("role").value.trim()
  };
  if (!employee.email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
    alert("Invalid email format");
    return;
  }
  const idx = all.findIndex(e => e.id === id);
  if (idx > -1) all[idx] = employee;
  else all.push(employee);
  localStorage.setItem("employees", JSON.stringify(all));
  window.location.href = "index.html";
}
