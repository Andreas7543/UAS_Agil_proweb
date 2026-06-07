const db = require("../config/db");

exports.getAll = async (req, res) => {
  const [rows] = await db.query(`
    SELECT p.*, l.nama_lab, k.nama_kategori
    FROM perangkat p
    JOIN laboratorium l ON p.id_lab = l.id_lab
    JOIN kategori_perangkat k ON p.id_kategori = k.id_kategori
  `);

  res.json(rows);
};

exports.create = async (req, res) => {
  const { nama_perangkat, no_seri, id_lab, id_kategori, status } = req.body;

  await db.query(
    "INSERT INTO perangkat (nama_perangkat, no_seri, id_lab, id_kategori, status) VALUES (?,?,?,?,?)",
    [nama_perangkat, no_seri, id_lab, id_kategori, status]
  );

  res.json({ message: "Berhasil tambah perangkat" });
};
exports.update = async (req, res) => {
  const { id } = req.params;
  const { nama_perangkat, no_seri, id_lab, id_kategori, status } = req.body;

  await db.query(
    "UPDATE perangkat SET nama_perangkat=?, no_seri=?, id_lab=?, id_kategori=?, status=? WHERE id_perangkat=?",
    [nama_perangkat, no_seri, id_lab, id_kategori, status, id]
  );

  res.json({ message: "Berhasil update perangkat" });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  await db.query(
    "DELETE FROM perangkat WHERE id_perangkat=?",
    [id]
  );

  res.json({ message: "Berhasil hapus perangkat" });
};