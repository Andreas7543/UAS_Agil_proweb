const db = require("../config/db");

exports.getDashboard = async (req, res) => {

  try {

    /* ================= TOTAL PERANGKAT ================= */

    const [perangkat] = await db.query(`
      SELECT COUNT(*) AS total
      FROM perangkat
    `);

    /* ================= PEMINJAMAN AKTIF ================= */

    const [peminjaman] = await db.query(`
      SELECT COUNT(*) AS total
      FROM peminjaman p
      JOIN status_peminjaman s
      ON p.id_status = s.id_status
      WHERE s.nama_status = 'dipinjam'
    `);

    /* ================= TOTAL KERUSAKAN ================= */

    const [kerusakan] = await db.query(`
      SELECT COUNT(*) AS total
      FROM kerusakan
    `);

    /* ================= TOTAL LAB ================= */

    const [lab] = await db.query(`
      SELECT COUNT(*) AS total
      FROM laboratorium
    `);

    /* ================= STATUS PERANGKAT ================= */

    const [statusPerangkat] = await db.query(`
      SELECT
      status,
      COUNT(*) AS total
      FROM perangkat
      GROUP BY status
    `);

    /* ================= RESPONSE ================= */

    res.json({
      totalPerangkat: perangkat[0].total,
      peminjamanAktif: peminjaman[0].total,
      totalKerusakan: kerusakan[0].total,
      totalLab: lab[0].total,
      statusPerangkat: statusPerangkat
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });

  }

};