const Note = require("../model/noteSchema");

//get ALL notes
const getAllNotes = async (req, res) => {
  try {
    const note = await Note.find({ userId: req.user.userId });
    res.status(200).send({ note });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

//get single note
const getSingleNote = async (req, res) => {
  try {
    const noteID = req.params.id;
    const singleNote = await Note.findOne({ _id: noteID });
    if (!singleNote) {
      return res.status(404).send({ msg: "No task with this ID" });
    }
    res.status(200).send({ singleNote });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

//create note
const createNote = async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).send({ msg: "note has been created", note });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

//delete note
const deleteNotes = async (req, res) => {
  const noteID = req.params.id;
  try {
    const note = await Note.findOneAndDelete({ _id: noteID });
    if (!note) {
      return res.status(404).send({ msg: "No task with this ID" });
    }
    res.status(200).send({ msg: "note has been deleted successfully", note });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

//update note
const updateNotes = async (req, res) => {
  const noteID = req.params.id;
  try {
    const note = await Note.findOneAndUpdate({ _id: noteID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!note) {
      return res.status(404).send({ msg: "No task with this ID" });
    }
    res.status(200).send({ msg: "note has been updated successfully", note });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

module.exports = {
  getAllNotes,
  getSingleNote,
  createNote,
  deleteNotes,
  updateNotes,
};
