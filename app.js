function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("#employee-table");
  let employees = [];

  if (table) {
    // Initialize employees array from rendered HTML rows
    employees = Array.from(table.querySelectorAll("tbody tr[data-id]")).map(row => ({
      id: row.dataset.id,
      firstName: row.children[0].textContent,
      lastName: row.children[1].textContent,
      email: row.children[2].textContent,
      department: row.children[3].textContent,
      role: row.children[4].textContent
    }));

    // Render initial table
    renderTable(employees);

    // Attach search/filter/sort event handlers
    document.getElementById("search").addEventListener("input", () => applyFilters(employees));
  }

  const form = document.querySelector("#emp-form");
  if (form) {
    // Prefill form when editing
    const id = getQueryParam("id");
    if (id) {
      const emp = employees.find(e => e.id === id);
      if (emp) {
        document.getElementById("employeeId").value = emp.id;
        document.getElementById("firstName").value = emp.firstName;
        document.getElementById("lastName").value = emp.lastName;
        document.getElementById("email").value = emp.email;
        document.getElementById("department").value = emp.department;
        document.getElementById("role").value = emp.role;
      }
    }

    form.addEventListener("submit", event => submitForm(event, employees));
  }
});

function renderTable(data) {
  const tbody = document.querySelector("#employee-table tbody");
  tbody.innerHTML = "";
  data.forEach(emp => {
    const tr = document.createElement("tr");
    tr.setAttribute("data-id", emp.id);
    tr.innerHTML = `
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

function applyFilters(employees) {
  const searchText = document.getElementById("search").value.toLowerCase();
  const filtered = employees.filter(emp =>
    (emp.firstName + " " + emp.lastName).toLowerCase().includes(searchText) ||
    emp.email.toLowerCase().includes(searchText)
  );
  renderTable(filtered);
}

function sortBy(field) {
  const table = document.querySelector("#employee-table");
  if (!table) return;
  // Fetch current list from DOM
  const employees = Array.from(table.querySelectorAll("tbody tr[data-id]")).map(row => ({
    id: row.dataset.id,
    firstName: row.children[0].textContent,
    lastName: row.children[1].textContent,
    email: row.children[2].textContent,
    department: row.children[3].textContent,
    role: row.children[4].textContent
  }));
  employees.sort((a, b) => a[field].localeCompare(b[field]));
  renderTable(employees);
}

function onDelete(id) {
  let employees = Array.from(document.querySelectorAll("tbody tr[data-id]")).map(row => ({
    id: row.dataset.id,
    firstName: row.children[0].textContent,
    lastName: row.children[1].textContent,
    email: row.children[2].textContent,
    department: row.children[3].textContent,
    role: row.children[4].textContent
  }));
  employees = employees.filter(e => e.id !== id);
  renderTable(employees);
}

function onEdit(id) {
  // Navigate to add_edit page
  window.location.href = `add_edit.html?id=${id}`;
}

function submitForm(event, employees) {
  event.preventDefault();
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
  const index = employees.findIndex(e => e.id === id);
  if (index > -1) {
    employees[index] = employee;
  } else {
    employees.push(employee);
  }
  alert("Saved successfully!");
  window.location.href = "index.html";
}
