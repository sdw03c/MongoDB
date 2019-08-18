var mongoose = require("mongoose")
var Schema = mongoose.Schema 

var NoteSchema = new Schema({
body: {
 type:  String,
 required: "Cannot save Note of null value"
}
})

var Note = mongoose.model("Note", NoteSchema)

module.exports = Note