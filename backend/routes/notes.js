const express = require("express");
const router = express.Router();
const fetchUsers = require("../middleware/fetchUsers");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE 1 : Get All Notes using GET : "/api/notes/getnotes"
router.get("/getnotes", fetchUsers, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
});

//ROUTE 2 : Adding Notes using Post : "/api/notes/addnote"
router.post(
  "/addnote",
  fetchUsers,
  [
    body("title", "Enter A Valid Title").isLength({ min: 3 }),
    body("description", "Empty Note").exists(),
    body("tag"),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

//ROUTE 3 : Update a Note using PUT : "/api/notes/updatenote"
router.put("/updatenote/:id", fetchUsers, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    let note = await Note.findById(req.params.id);
    console.log(note.obj);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
  }
});
//ROUTE 4 : Delete a Note using DELETE : "/api/notes/deletenote"
router.delete("/deletenote/:id", fetchUsers, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: "the Note is Deleted" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
