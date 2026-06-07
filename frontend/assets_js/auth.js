async function login() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const res = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "pages/dashboard.html";
  } else {
    alert(data.message);
  }
}