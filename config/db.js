const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(err => console.error(err))

module.exports = mongoose;

