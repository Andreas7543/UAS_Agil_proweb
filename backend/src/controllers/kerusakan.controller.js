const db = require("../config/db");

/* ================= GET ALL ================= */

exports.getAll = async (req, res) => {

  const [rows] = await db.query(`
    SELECT
      k.*,
      p.nama_perangkat,
      u.nama AS pelapor
    FROM kerusakan k
    LEFT JOIN perangkat p
      ON k.id_perangkat = p.id_perangkat
    LEFT JOIN users u
      ON k.id_user = u.id_user
    ORDER BY k.id_kerusakan DESC
  `);

  res.json(rows);
};

/* ================= CREATE ================= */

exports.create = async (req, res) => {

  const {
    id_perangkat,
    id_user,
    id_jenis,
    tanggal,
    deskripsi,
    status,
    biaya
  } = req.body;

  await db.query(
    `INSERT INTO kerusakan
    (id_perangkat,id_user,id_jenis,tanggal,deskripsi,status,biaya)
    VALUES (?,?,?,?,?,?,?)`,
    [
      id_perangkat,
      id_user,
      id_jenis,
      tanggal,
      deskripsi,
      status,
      biaya
    ]
  );

  res.json({
    message: "Berhasil tambah kerusakan"
  });
};

/* ================= UPDATE ================= */

exports.update = async (req, res) => {

  const { id } = req.params;

  const {
    id_perangkat,
    id_user,
    id_jenis,
    tanggal,
    deskripsi,
    status,
    biaya
  } = req.body;

  await db.query(
    `UPDATE kerusakan SET
      id_perangkat=?,
      id_user=?,
      id_jenis=?,
      tanggal=?,
      deskripsi=?,
      status=?,
      biaya=?
    WHERE id_kerusakan=?`,
    [
      id_perangkat,
      id_user,
      id_jenis,
      tanggal,
      deskripsi,
      status,
      biaya,
      id
    ]
  );

  res.json({
    message: "Berhasil update kerusakan"
  });
};

/* ================= DELETE ================= */

exports.remove = async (req, res) => {

  const { id } = req.params;

  await db.query(
    "DELETE FROM kerusakan WHERE id_kerusakan=?",
    [id]
  );

  res.json({
    message: "Berhasil hapus kerusakan"
  });
};