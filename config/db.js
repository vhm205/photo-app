const mongoose = require('mongoose');

console.log(process.env.DB_CONNECTION)
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = mongoose;

