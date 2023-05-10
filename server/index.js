const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss()
const PORT = process.env.PORT || 5000

app.ws('/', (ws, req) => {
    console.log(connected)
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.event) {
            case 'connection': {
                handleUserConnection(ws, msg)
                break
            }
        }
        console.log(msg)
    })
})

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})


function handleUserConnection(ws, msg) {
    msg = JSON.parse(msg)
    ws.id = msg.id
    broadcastConnection(ws, msg)
}

function broadcastConnection(ws, msg) {
    aWss.clients.forEach(client => {
        if (client.id == msg.id) {
            client.send(`${msg.username} connected`)
        }
    })
}