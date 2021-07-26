const path = require("path");

// main configuration object
module.exports = {
    // entry point is root of the bundle and beginning of dependecy graph
    entry: './assets/js/script.js',
    // output bundled code to distribution folder
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    // by default - webpack wants to run in production mode
    mode: 'development'
};