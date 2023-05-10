const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss()
const PORT = process.env.PORT || 5000

app.ws('/', (ws, req) => {
    console.log('connected')
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.event) {
            case 'connection': {
                console.log(msg)
                handleUserConnection(ws, msg)
                break
            }
            case 'draw': {
                broadcastConnection(ws, msg)
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
    ws.sessionId = msg.sessionId
    broadcastConnection(ws, msg)
}

function broadcastConnection(ws, msg) {
    aWss.clients.forEach(client => {
        if (client.sessionId == msg.sessionId) {
            client.send(JSON.stringify(msg))
        }
    })
}