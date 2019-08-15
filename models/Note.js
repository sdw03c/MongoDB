var mongoose = require("mongoose")
var Schema = mongoose.Schema 

var NoteSchema = new Schema({
head: Array,
body: String
})

var Note = mongoose.model("Note", NoteSchema)

module.exports = Note