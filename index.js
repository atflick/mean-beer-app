const express =     require('express')
const app =         express()
const parser =      require('body-parser')
const hbs =         require('express-handlebars')
const mongoose =    require('./db/connection.js')

var Beer = mongoose.model("Beer")

app.set("port", process.env.PORT || 3001)

app.set("view engine", "hbs")
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}))


app.use("/assets", express.static("public"))
app.use(parser.json({extended: true}))

// app.use(express.static(__dirname + '/public'))

app.get("/", (req, res) => {
  res.render("beers")
})

app.get("/api/beers", (req, res) => {
  Beer.find({}).then((beers) => {
    res.json(beers)
  })
})

app.get("/api/beers/:name", (req, res) => {
  Beer.findOne({name: req.params.name}).then((beer) => {
    res.json(beer)
  })
})

app.post("/api/beers", (req, res) => {
  Beer.create(req.body).then((beer) => {
    res.json(beer)
  })
})

app.delete("/api/beers/:name", (req, res) => {
  Beer.findOneAndRemove({name: req.params.name}).then(() => {
    res.json({success: true})
  })
})

app.put("/api/beers/:name", (req, res) => {
  Beer.findOneAndUpdate({name: req.params.name}, req.body.beer, {new: true}).then((beer) => {
    res.json(beer)
  })
})

app.listen(app.get("port"), () => {
  console.log('App is listening')
})
