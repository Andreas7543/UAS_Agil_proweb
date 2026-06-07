const db = require("../config/db");

const getAll = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM users");
  res.json(rows);
};

const create = async (req, res) => {
  const { nama, email, password } = req.body;

  await db.query(
    "INSERT INTO users (nama, email, password) VALUES (?,?,?)",
    [nama, email, password]
  );

  res.json({ message: "Berhasil tambah user" });
};

module.exports = {
  getAll,
  create
};