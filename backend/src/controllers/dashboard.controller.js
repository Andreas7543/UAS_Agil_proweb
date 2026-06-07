const db = require("../config/db");

exports.getDashboard = async (req, res) => {

  try {

    /* TOTAL PERANGKAT */
    const [perangkat] = await db.query(`
      SELECT COUNT(*) AS total
      FROM perangkat
    `);

    /* PEMINJAMAN AKTIF */
    const [jadwal] = await db.query(`
  SELECT COUNT(*) AS total
  FROM jadwal
`);

    /* TOTAL KERUSAKAN */
    const [kerusakan] = await db.query(`
      SELECT COUNT(*) AS total
      FROM kerusakan
    `);

    /* TOTAL LAB */
    const [lab] = await db.query(`
      SELECT COUNT(*) AS total
      FROM laboratorium
    `);

    res.json({

      totalPerangkat:
      perangkat[0].total,

     peminjamanAktif: 
     jadwal[0].total,

      totalKerusakan:
      kerusakan[0].total,

      totalLab:
      lab[0].total

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      message:
      "Gagal load dashboard"

    });

  }

};