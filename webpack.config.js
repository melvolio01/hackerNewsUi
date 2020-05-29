const path = require('path');

module.exports = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: 'babel-loader' },
            { test: /\.(css|scss)$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
        ]
    },
    mode: 'development'
}