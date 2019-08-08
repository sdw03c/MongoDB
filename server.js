var mongoose = require("mongoose")
var express = require("express")
var handlebars = require("express-handlebars")
var cheerio = require("cheerio")
var axios = require("axios")
var app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine", "handlebars")
app.engine("handlebars", handlebars({defaultLayout: "main"}))
var PORT = process.env.PORT || 8000
//var db = require("./models")
mongoose.connect("mongodb://localhost/wiredArticles", { useNewUrlParser: true })

axios.get("https://www.wired.com/most-popular/").then(function(response){
    var $ = cheerio.load(response.data)
    var results = []

    $("div.archive-item-component__info").each(function(i, element){
        var url = $(element).children("a").attr("href")
        var header = $(element).children("a").children("h2").text()
        var summary = $(element).children("a").children("p").text()
    //    console.log(url)
    //     console.log(header)
    //     console.log(summary)
results.push({
    url: url,
    header: header, 
    summary: summary
})
})
console.log(results)
})



app.listen(PORT, function(){
    console.log(`Server listening on http://localhost: ${PORT}`);
})