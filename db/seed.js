const mongoose = require("./connection")
const seedData = require("./seeds")

const Beer = mongoose.model("Beer")

Beer.remove({}).then(()=> {
  Beer.collection.insert(seedData).then(() => {
    process.exit()
  })
})
