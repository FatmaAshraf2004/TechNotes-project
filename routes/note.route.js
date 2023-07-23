const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth.middleware.js");

const {createNote, showNotes, showNote, updateNote, deleteNote} = require('../controller/note.control.js');

router.post('/create',auth, createNote);
router.get('/',auth, showNotes);
router.get('/:id',auth, showNote);
router.put('/:id',auth, updateNote);
router.delete('/:id',auth, deleteNote);

module.exports = router