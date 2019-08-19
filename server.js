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
app.use(express.static("public"));
var PORT = process.env.PORT || 8000
var db = require("./models")
mongoose.Promise = global.Promise
//var MONGODB_URI = process.env.MONGODB_URI || "mongodb://wiredDB:SharonLearnsMlab1!@ds311128.mlab.com:11128/heroku_4wlg6bpj"
mongoose.connect(process.env.MONGODB_URI || "mongodb://wiredDB:SharonLearnsMlab1!@ds311128.mlab.com:11128/heroku_4wlg6bpj", { useMongoClient: true })
//console.log(MONGODB_URI)
app.get("/scraped", function(req, res){
axios.get("https://www.wired.com/most-popular/").then(function(response){
    var $ = cheerio.load(response.data)
    var results = []

    $("div.archive-item-component__info").each(function(i, element){
        var url = $(element).children("a").attr("href")
        var header = $(element).children("a").children("h2").text()
        var summary = $(element).children("a").children("p").text()
        var scraped = false
     
    //    console.log(url)
    //     console.log(header)
    //     console.log(summary)
if(url && header && summary){
results.push({
    url: "https://www.wired.com/" + url,
    header: header, 
    summary: summary,
    scraped: scraped 
})
}
})
db.Article.remove({}).then(function(){
    db.Article.create(results).then(function(dbArticles){
        res.redirect("/")
        console.log(dbArticles)
    }).catch(function(err){
        if (err) throw err
    })
    console.log(results)
    }).catch(function(err){
        if (err) throw err
    })   
}).catch(function(err){
    if (err) throw err
})
console.log("removed")

})

// axios.get("https://www.wired.com/most-popular/").then(function(response){
//     var $ = cheerio.load(response.data)
//     var results = []

//     $("div.archive-item-component__info").each(function(i, element){
//         var url = $(element).children("a").attr("href")
//         var header = $(element).children("a").children("h2").text()
//         var summary = $(element).children("a").children("p").text()
     
//     //    console.log(url)
//     //     console.log(header)
//     //     console.log(summary)
// if(url && header && summary ){
//     var dataToAdd = {
//         url: "https://www.wired.com/" + url,
//         header: header, 
//         summary: summary

//     }
// results.push(dataToAdd   //scraped: false 
// )
// }
// console.log(results)
//  db.Article.create(results).then(function(dbArticles){
//      res.json(dbArticles)
//      console.log(dbArticles)
//  }).catch(function(err){
//      if (err) throw err
//  })
// })
// return results;

// })
// // .catch(function(err){
// //     if (err) throw err
// // })

// })


app.get("/clear", function(req, res){
    db.Article.remove({}).then(function(){
        res.redirect("/")
    }).catch(function(err){
        if (err) throw err
    })
    console.log("removed")
})


app.get("/", function(req, res){
    db.Article.find({scraped:false}).then(function(dbArticles){
        res.render("index", {dbArticles})
    }).catch(function(err){
        if (err) throw err
    })
})

app.get("/saved", function(req, res){
    db.Article.find({scraped:true}).then(function(dbArticles){
        res.render("saved", {dbArticles})
    }).catch(function(err){
        if (err) throw err
    })
})

app.put("/saved/:id", function(req, res){
    var id = req.params.id
    console.log(id)
    db.Article.findOneAndUpdate({_id: id }, {scraped:true}).then(function(dbArticles){
     console.log(dbArticles)
      res.redirect("/")
    }).catch(function(err){
        if (err) throw err
    })
})

app.put("/delete/:id", function(req, res){
    var id = req.params.id
    db.Article.findOneAndUpdate({_id:id}, {scraped:false}).then(function(dbArticles){
        console.log(dbArticles)
         res.redirect("/saved")
       }).catch(function(err){
           if (err) throw err
       })

})

// app.get("/saved/notes/:id", function(req, res){
//     id = req.params.id
// db.Article.find({_id:id}).populate("note").then(function(dbArticles){
//  //console.log(dbArticles.note[1].body + "Sharon Rocks")
//  res.render("saved", {dbArticles})
// }).catch(function(err){
//     if (err) throw err
// })
// })

app.get("/saved/notes/:id", function (req, res) { // this for see notes from article id. when client click button to see,
    // this command takes notes from articles with taken id.
    id = req.params.id
    db.Article.find({ _id: id }).populate("note").then(function (dbArticles) {
    res.json(dbArticles)
})
})
app.post("/saved/notes/:id", function(req, res){
    id = req.params.id
   //body = req.body
    console.log(req.body)
db.Note.create(req.body).then(function(dbNote){
    console.log(dbNote)
 return db.Article.findOneAndUpdate({_id:id}, {$push: {note: dbNote._id}}, {new:true})
}).then(function(dbArticle){
    console.log(dbArticle + "here")
    res.redirect("/saved")
}).catch(function(err){
    if (err) throw err
})
})

app.delete("/saved/notes/:id", function(req, res){
  id = req.params.id
  console.log(id)
  db.Note.findOneAndRemove({_id:id}).then(function(dbNote){
    console.log(dbNote + "here")
    res.redirect("/saved")
}).catch(function(err){
    if (err) throw err
})
})

app.listen(PORT, function(){
    console.log(`Server listening on http://localhost: ${PORT}`);
})