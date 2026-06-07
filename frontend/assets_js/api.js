const BASE_URL = "http://localhost:3000/api";

async function apiFetch(endpoint) {
  const res = await fetch(API + endpoint);
  return res.json();
}