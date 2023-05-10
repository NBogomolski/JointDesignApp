const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss()

const cors = require('cors')
const fs = require('fs')
const path = require('path')


const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json());


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

app.post('/image', (req, res) => {
    try {
        const data = req.body.img.replace(`data:image/png;base64,`, '');
        fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64')
        return res.status(200).json({message: 'uploaded'})
    } catch (error) {
        console.error(error)
        return res.status(500).json('error')
    }
})
app.get("/image", (req, res) => {
    try {
        const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))
        const data = `data:image/png;base64,` + file.toString('base64')
        res.json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json('error')
    }
});

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