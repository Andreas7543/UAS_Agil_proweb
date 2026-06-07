const BASE_URL = "http://localhost:3000/api";

async function apiFetch(endpoint) {
  const res = await fetch(BASE_URL + endpoint);
  return res.json();
}

/* DASHBOARD */
async function loadDashboard() {
  const data = await apiFetch("/dashboard");

  document.getElementById("statTotalPerangkat").innerText = data.totalPerangkat;
  document.getElementById("statPeminjamanAktif").innerText = data.peminjamanAktif;
  document.getElementById("statKerusakan").innerText = data.totalKerusakan;
  document.getElementById("statLab").innerText = data.totalLab;

  renderStatus(data.statusPerangkat);
}

function renderStatus(list) {
  const el = document.getElementById("deviceStatusList");
  el.innerHTML = "";

  list.forEach(item => {
    el.innerHTML += `${item.status} : ${item.total}<br>`;
  });
}

/* PERANGKAT */
async function loadPerangkat() {
  const data = await apiFetch("/perangkat");

  const body = document.getElementById("perangkatTableBody");
  body.innerHTML = "";

  data.forEach((p, i) => {
    body.innerHTML += `
      <tr>
        <td>${i+1}</td>
        <td>${p.nama_perangkat}</td>
        <td>${p.no_seri}</td>
        <td>${p.nama_lab}</td>
        <td>${p.nama_kategori}</td>
        <td>${p.status}</td>
      </tr>
    `;
  });
}

/* LOAD */
window.onload = () => {
  loadDashboard();
  loadPerangkat();
};