const express = require("express");
const { userAuth } = require("../middlewares/auth");
const {
  getNotes,
  getNoteById,
  addNote,
  updateNote,
  deleteNote,
} = require("../controllers/todo");
const router = express.Router();

router.get("/", userAuth, getNotes);
router.get("/:id", userAuth, getNoteById);
router.post("/add", userAuth, addNote);
router.put("/:id/update", userAuth, updateNote);
router.delete("/:id/delete", userAuth, deleteNote);

module.exports = router;
