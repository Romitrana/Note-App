const mongoose = require("mongoose");
const NoteSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide title"],
    maxlength: 30,
  },
  created_at: { type: Date, default: Date.now },
  content: {
    type: String,
  },
  updated_at: { type: Date, default: Date.now },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Note", NoteSchema);
