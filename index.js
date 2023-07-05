// index.js
// Import the fastify framework
const fastify = require('fastify')
// Import "mongoose"
const mongoose = require("mongoose")
// Import our "User" model
const User = require("./User")
const app = fastify()
const mongoUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/users"
/** connect to MongoDB datastore */

    mongoose.connect(mongoUrl).then(() => console.log("MongoDB connected…")).catch(err=>{ console.error(err)})



app.get("/api/users", async (request, reply) => {
   
        const person = await User.find({});
            reply.send( notes)

})
app.get("/api/users/:userId", async (request, reply) => {
    var userId = request.params.userId
    User.findById(userId, (err, user) => {
        if (!err) {
            reply.send(user)
        } else {
            reply.send({ error: err })
        }
    })
})
app.post("/api/users", async (request, reply) => {
    console.log(request.body)
    var user = request.body
    User.create(user)
})
app.put("/api/users/:userId", async (request, reply) => {
    var userId = request.params.userId
    var newUserEdit = request.body
    User.findById(userId, (err, user) => {
        if (!err) {
            user.age = newUserEdit.age
            user.name = newUserEdit.name
            user.email = newUserEdit.email
            user.save((er, savedUser) => {
                if (!er) {
                    reply.send(savedUser)
                } else {
                    reply.send(er)
                }
            })
        } else {
            reply.send({ error: err })
        }
    })
})
// Start the server
app.listen(3000, function (err, address) {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening on ＄{address}`)
})