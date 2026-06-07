const API = "http://localhost:3000/api";

/* LOGIN */
async function doLogin() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const errorBox = document.getElementById("loginError");

  try {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      errorBox.style.display = "block";
      errorBox.innerText = data.message || "Login gagal";
      return;
    }

    localStorage.setItem("isLogin", "true");
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";

  } catch (err) {
    errorBox.style.display = "block";
    errorBox.innerText = "Server error";
  }
}

/* REGISTER */
async function doRegister() {
  const nama = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const errorBox = document.getElementById("registerError");

  try {
    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ nama, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      errorBox.style.display = "block";
      errorBox.innerText = data.message || "Register gagal";
      return;
    }

    alert("Register berhasil, silakan login");
    window.location.href = "login.html";

  } catch (err) {
    errorBox.style.display = "block";
    errorBox.innerText = "Server error";
  }
}

/* LOGOUT */
function logout() {
  localStorage.removeItem("isLogin");
  window.location.href = "login.html";
}