const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss()

const cors = require('cors')
const fs = require('fs')
const path = require('path')
const cookieParser = require('cookie-parser')

const DB = require('./dbConfig')
const authRouter = require("./auth");
// const {verifyToken} = require('./auth')

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json());
app.use(cookieParser())
app.use('/auth', authRouter.router)
app.use(authRouter.verifyToken)

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

// app.get('/projects/:username', async (req, res) => { 
//     console.log( req.query.userId)
//     const username = req.params.username
//     const userId = req.query.userId
//     let projects = []
//     const {data: rooms, error: dbError}= await DB.from('m2m_users_rooms').select('*').eq('userId', userId)
//     if (dbError) {
//         console.error( dbError)
//         return res.status(500)
//     }
//     rooms.forEach(async (item) => {
//         const {data, error} = await DB.storage
//             .from('images')
//             .download(`${item.sessionId}.jpg`)

//         if (error) {
//             console.error(error);
//         } else {
            // const buffer = await data.arrayBuffer();
            // const base64String = Buffer.from(buffer).toString('base64')
            // const file = `data:image/png;base64,` + base64String
//             projects.push({...item, file})
//         }
//     })
//     if (rooms.length > 0) {
//         res.json(projects)
//     }

// })

app.get("/projects/:username", async (req, res) => {
    const username = req.params.username;
    const userId = req.query.userId;
    let projects = [];

    const { data: rooms, error: dbError } = await DB.from("m2m_users_rooms")
        .select("*")
        .eq("userId", userId);
    if (dbError) {
        console.error(dbError);
        return res.status(500).json({ error: "Database error" });
    }
    let i = 0;
    for (const item of rooms) {
        const { data, error } = await DB.storage
            .from("images")
            .download(`${item.sessionId}.jpg`);
        if (error) {
            console.error(error);
        } else {
            const buffer = await data.arrayBuffer();
            const base64String = Buffer.from(buffer).toString("base64");
            const file = `data:image/png;base64,` + base64String;
            projects.push({ ...item, file });
        }

    }

    res.json(projects);
});


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