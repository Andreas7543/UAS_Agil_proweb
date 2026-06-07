const db = require("../config/db");

/* ================= GET ALL ================= */

exports.getAll = async (req, res) => {

  try {

    const [rows] = await db.query(`
SELECT 
  j.id_jadwal,
  j.mata_kuliah,
  j.nama_dosen,
  j.hari,
  j.jam_mulai,
  j.jam_selesai,
  j.penanggung_jawab,
  l.nama_lab
      FROM jadwal j
      JOIN laboratorium l
      ON j.id_lab = l.id_lab
      ORDER BY j.id_jadwal DESC
    `);

    res.json(rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Gagal mengambil jadwal"
    });

  }

};

/* ================= CREATE ================= */

exports.create = async (req, res) => {

  try {

    const {
      mata_kuliah,
      nama_dosen,
      hari,
      jam_mulai,
      jam_selesai,
      id_lab,
      penanggung_jawab
    } = req.body;

    await db.query(`
      INSERT INTO jadwal
      (
        mata_kuliah,
        nama_dosen,
        hari,
        jam_mulai,
        jam_selesai,
        id_lab,
        penanggung_jawab
      )
      VALUES (?,?,?,?,?,?,?)
    `,[
      mata_kuliah,
      nama_dosen,
      hari,
      jam_mulai,
      jam_selesai,
      id_lab,
      penanggung_jawab
    ]);

    res.json({
      message:"Berhasil tambah jadwal"
    });

  } catch(err){

    console.log(err);

    res.status(500).json({
      message:"Gagal tambah jadwal"
    });

  }

};

/* ================= UPDATE ================= */

exports.update = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      mata_kuliah,
      nama_dosen,
      hari,
      jam_mulai,
      jam_selesai,
      id_lab,
      penanggung_jawab
    } = req.body;

    await db.query(`
      UPDATE jadwal
      SET
      mata_kuliah = ?,
      nama_dosen = ?,
      hari = ?,
      jam_mulai = ?,
      jam_selesai = ?,
      id_lab = ?,
      penanggung_jawab = ?
      WHERE id_jadwal = ?
    `,[
      mata_kuliah,
      nama_dosen,
      hari,
      jam_mulai,
      jam_selesai,
      id_lab,
      penanggung_jawab,
      id
    ]);

    res.json({
      message:"Berhasil update jadwal"
    });

  } catch(err){

    console.log(err);

    res.status(500).json({
      message:"Gagal update jadwal"
    });

  }

};

/* ================= DELETE ================= */

exports.remove = async (req, res) => {

  try {

    const { id } = req.params;

    await db.query(`
      DELETE FROM jadwal
      WHERE id_jadwal = ?
    `, [id]);

    res.json({
      message: "Berhasil hapus jadwal"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Gagal hapus jadwal"
    });

  }

};