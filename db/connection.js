const mongoose = require('mongoose')

var BeerSchema = new mongoose.Schema(
  {
    name: String,
    brewery: String,
    image_url: String,
    description: String
  }
)

mongoose.model('Beer', BeerSchema)
mongoose.connect('mongodb://localhost/beerapp')

module.exports = mongoose
