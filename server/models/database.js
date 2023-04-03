// const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function(){
//   console.log('Connected')
// });



//require the mongoose library
const mongoose = require("mongoose")


//connect the node to the mongodb, the last part is the name of the db
mongoose.connect("mongodb://127.0.0.1:27017/BlogM")
.then(()=>{
    console.log("Mongo connected");
})
.catch((e)=>{
    console.log("failed to connect", e)
})

// Models
require('./Category');
require('./Blog');

module.exports = mongoose;