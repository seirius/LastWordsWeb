const $ = require('jquery');
const io = require('socket.io-client');
const socket = io();

socket.on('connect', s => {
    console.log('socket connected');
});

socket.on('java-client', args => {
    console.log('java-client', args);
})


const tiles = new Vue({
    el: '#tiles',
    data: function () {
        // getTiles().then(response => this.rows = response);
        socket.on('vue-tiles', (data) => {
            this.rows = data;
            // getTiles().then(response => this.rows = response);
        });
        return {
            rows: []
        }
    },
    methods: {
        tileClick: (tile, event) => {
            socket.send('asfasf')
            socket.emit('vue-to-java', 'hi')
        }
    }
});


// function getTiles() {
//     return $.getJSON('tiles.json');
// }