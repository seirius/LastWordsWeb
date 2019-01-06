const $ = require('jquery');
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

const tiles = new Vue({
    el: '#tiles',
    data: function () {
        getTiles().then(response => this.rows = response);
        socket.on('new-tiles', (data) => {
            getTiles().then(response => this.rows = response);
        });
        socket.on('java-client', () => console.log('java-client-connected'));
        socket.emit('new-tiles')
        return {
            rows: []
        }
    }
});


function getTiles() {
    return $.getJSON('tiles.json');
}