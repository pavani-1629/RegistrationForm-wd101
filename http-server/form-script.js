const form = document.getElementById('user-form');
const tableBody = document.getElementById('table-body');

function getAge(dateString) {
  const today = new Date();
  const dob = new Date(dateString);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

function validateDob(dob) {
  const age = getAge(dob);
  return age >= 18 && age <= 55;
}

function getData() {
  return JSON.parse(localStorage.getItem("user-entries") || "[]");
}

function setData(data) {
  localStorage.setItem("user-entries", JSON.stringify(data));
}

function showData() {
  const entries = getData();
  tableBody.innerHTML = "";

  entries.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.accepted ? "true" : "false"}</td>
    `;
    tableBody.appendChild(row);
  });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;
  const dob = form.dob.value;
  const accepted = form.acceptTerms.checked;

  if (!validateDob(dob)) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const newEntry = { name, email, password, dob, accepted };
  const entries = getData();
  entries.push(newEntry);
  setData(entries);
  showData();
  form.reset();
});

window.onload = showData;
