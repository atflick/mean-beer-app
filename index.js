const express =     require('express')
const app =         express()
const parser =      require('body-parser')
const hbs =         require('express-handlebars')
const mongoose =    require('./db/connection.js')


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

app.listen(app.get("port"), () => {
  console.log('App is listening')
})
