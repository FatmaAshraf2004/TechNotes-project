const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const noteSchema = new mongoose.Schema({

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    text: {
      type: String,
      required: true,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

noteSchema.plugin(AutoIncrement, {
  inc_field: 'ticket',
  id: 'ticketNums',
  start_seq: 500
})

const NoteModel = mongoose.model('Note', noteSchema);
module.exports = NoteModel;


// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const noteSchema = new Schema({
//   title: {
//     type: String,
//     trim: true,
//     required: true
//   },
//   text: {
//     type: String,
//     trim: true,
//     required: true
//   },
// });

// const NoteModel = mongoose.model('Note', noteSchema);
// module.exports = NoteModel;