const $ = require('jquery')

$.getJSON('tiles.json').then(response => {
    const tiles = new Vue({
        el: '#tiles',
        data: {
            rows: response
        }
    });
});