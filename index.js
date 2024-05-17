var port = process.env.PORT||443
const http = require('http')
const express = require("express")
const app = express()

const cors = require('cors');
let message = ''
const server = http.createServer(app)
const io = require('socket.io')(server)


server.listen(port,()=>{
    console.log("server run on ", port)
})

io.on("connection",(socket)=>{
    console.log(socket.id)
    socket.on('message', data =>{
        // console.log(data)
        socket.broadcast.emit('message',data)
    })
    socket.on('open light',data=>{
        socket.broadcast.emit('open_light',data)
        console.log(data)
    })
    socket.on('disconnect',()=>{
        console.log("Client disconnect")
    })

    
    
})