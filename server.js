const express = require('express');
const path = require('path');
const multer = require('multer');
const socket = require('socket.io');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'resources/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) //Appending extension
    }
})

const upload = multer({ storage });

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'index.html'));
});

app.use(express.static('web'));
app.use(express.static('resources'));


const server = app.listen(port, () => console.log(`Listenning on port ${port}`));

const io = socket(server);

io.on('connection', socket => {
    console.log('new user');

    socket.on('kotlin-tiles', (args) => {
        io.sockets.emit('vue-tiles', args);
    });

    socket.on('node-map', args => {
        io.sockets.emit('node-map', args);
    });

    socket.on('entity-path', args => {
        io.sockets.emit('entity-path', args);
    });

});

app.post('/debug/a-star', upload.single('tiles'), (req, res) => {
    res.send('done');
    io.sockets.emit('new-tiles', {});
});