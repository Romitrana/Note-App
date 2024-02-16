const {getAllNotes,getSingleNote,createNote,deleteNotes,updateNotes} = require('../controllers/controller.js')
const express = require('express');
const router = express.Router();

router.route('/').get(getAllNotes).post(createNote);
router.route('/:id').get(getSingleNote).patch(updateNotes).delete(deleteNotes);


module.exports = router;