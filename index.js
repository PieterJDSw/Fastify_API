// index.js
// Import the fastify framework
const fastify = require('fastify')
// Import "mongoose"
const mongoose = require("mongoose")
const { users } = require("./routes/UserRoutes");
const app = fastify()
const mongoUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/users"
/** connect to MongoDB datastore */
    mongoose.connect(mongoUrl)
    .then(() => console.log("MongoDB connected…"))
    .catch(err=>{ console.error(err)})
   
app.register(users);
// Start the server
app.listen(3000, function (err, address) {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening on ＄{address}`)
})