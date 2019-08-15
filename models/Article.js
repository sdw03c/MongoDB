var mongoose = require("mongoose")
var Schema = mongoose.Schema

var ArticleSchema = new Schema({
header: {
    type: String, 
    required: true, 
    unique: {index: {unique: true}}
},
url:{
    type: String, 
    required: true, 
  //  unique: true
}, 
summary:{
    type: String, 
    required: true, 
  //  unique: true
},
scraped: Boolean,
note: {
    type: Schema.Types.ObjectId, 
    ref: "Note"
}
})

var Article = mongoose.model("Article", ArticleSchema)

module.exports = Article