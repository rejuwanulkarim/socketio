var port = 443
const http = require('http')
const express = require("express")
const app = express()

const cors = require('cors');
let message = ''


app.use((req, res, next) => {
    //allow access from every, elminate CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.removeHeader('x-powered-by');
    //set the allowed HTTP methods to be requested
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    //headers clients can use in their requests
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    //allow request to continue and be handled by routes
    next();
});


const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
})

app.get("/", (req, res) => {
    res.send("kjhgb")
})
server.listen(port, () => {
    console.log("server run on ", port)
})

io.on("connection", (socket) => {
    console.log(socket.id)
    socket.on('message', data => {
        // console.log(data)
        socket.broadcast.emit('message', data)
    })
    socket.on('open light', data => {
        socket.broadcast.emit('open_light', data)
        console.log(data)
    })
    socket.on('disconnect', () => {
        console.log("Client disconnect")
    })
})