let employees = Array.from(document.querySelectorAll("tr[data-id]"))?.map(row => ({
  id: row.dataset.id,
  firstName: row.children[0].textContent,
  lastName: row.children[1].textContent,
  email: row.children[2].textContent,
  department: row.children[3].textContent,
  role: row.children[4].textContent
})) || [];

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
        <button onclick="editEmployee('${emp.id}')">Edit</button>
        <button onclick="deleteEmployee('${emp.id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function applyFilters() {
  const searchText = document.getElementById("search").value.toLowerCase();
  const filtered = employees.filter(emp =>
    (emp.firstName + " " + emp.lastName).toLowerCase().includes(searchText) ||
    emp.email.toLowerCase().includes(searchText)
  );
  renderTable(filtered);
}

function sortBy(field) {
  employees.sort((a, b) => a[field].localeCompare(b[field]));
  renderTable(employees);
}

function deleteEmployee(id) {
  employees = employees.filter(e => e.id !== id);
  renderTable(employees);
}

function editEmployee(id) {
  const emp = employees.find(e => e.id === id);
  if (!emp) return;
  window.location.href = `add_edit.ftl?id=${id}`; // or handle inline logic if on same page
}

function submitForm(event) {
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
  window.location.href = "index.ftl";
}

// Initial render
if (typeof renderTable === "function") renderTable(employees);