const pool = require("../connection");
const getNotes = async (req, res) => {
  try {
    const { id } = req.user;
    const notes = (
      await pool.query("select * from notes where userId=$1", [id])
    ).rows;
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).end("internal server error");
  }
};
const getNoteById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const [note] = (
      await pool.query("select * from notes where id=$1 and userId=$2", [
        id,
        userId,
      ])
    ).rows;

    if (!note) {
      return res.status(404).json("note not found");
    }
    res.json(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).end("internal server error");
  }
};
const addNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title } = req.body;

    const [note] = (
      await pool.query(
        "insert into notes (title,userId) values ($1,$2) returning *",
        [title, userId]
      )
    ).rows;

    res.json(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).end("internal server error");
  }
};
const updateNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { title } = req.body;

    const [note] = (
      await pool.query(
        "update notes set title=$3 where id=$1 and userId=$2 returning *",
        [id, userId, title]
      )
    ).rows;
    res.json(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).end("internal server error");
  }
};
const deleteNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const [note] = (
      await pool.query(
        "delete from notes where id=$1 and userId=$2 returning *",
        [id, userId]
      )
    ).rows;
    res.json(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).end("internal server error");
  }
};
module.exports = {
  getNotes,
  getNoteById,
  addNote,
  updateNote,
  deleteNote,
};
