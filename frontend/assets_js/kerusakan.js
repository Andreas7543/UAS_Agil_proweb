async function createKerusakan() {
  const payload = {
    id_perangkat: 1,
    id_user: 1,
    id_jenis: 1,
    deskripsi: "Tidak bisa nyala"
  };

  const res = await apiFetch("/kerusakan", {
    method: "POST",
    body: JSON.stringify(payload)
  });

  alert(res.message);
}