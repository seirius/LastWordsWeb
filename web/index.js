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
        socket.on('node-map', args => {
            if (args) {
                this.nodeMap = JSON.parse(args);
            }
        });

        socket.on('entity-path', args => {
            if (this.nodeMap && args) {
                const path = JSON.parse(args);
                if (this.originalNodes) {
                    this.originalNodes.forEach(tileNode => {
                        this.nodeMap.tileNodes[tileNode.x][tileNode.y] = tileNode;
                    });
                    this.originalNodes = [];
                }
                path.forEach(tileNode => {
                    const originalNode = this.nodeMap.tileNodes[tileNode.x][tileNode.y];
                    this.originalNodes.push(originalNode);
                    this.nodeMap.tileNodes[tileNode.x][tileNode.y] = tileNode;
                });
                this.$forceUpdate();
            }
        });
        // socket.on('vue-tiles', (data) => {
        //     this.rows = data;
        //     // getTiles().then(response => this.rows = response);
        // });
        return {
            originalNodes: [],
            nodeMap: {
                tileNodes: []
            }
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