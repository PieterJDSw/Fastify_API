const User = require("../User")

  const users = (app, _, done) => {

    // Middleware
    app.addHook('onRequest', function(request, reply, done) {
        console.log('query', request.query);
        console.log('params', request.params);
        console.log('body', request.body);
      
        done();
      })

      app.addHook("onSend", (request, reply, payload, done) => {
        reply.headers({
          Server: "fastify",
          Demo:"Entelect Tech talk"
        });
       
        done();
      });


    //   Routes
    app.get("/api/users", async (request, reply) => {
        const person = await User.find({});
            reply.send( person)
    })
    app.get("/api/users/:userId", async (request, reply) => {
        var userId = request.params.userId
        const user = await User.findById(userId)
    })
    app.post("/api/users", async (request, reply) => {
        console.log(request.body)
        var user = request.body
        User.create(user)
    })
  
    done();
  };
  module.exports ={users}