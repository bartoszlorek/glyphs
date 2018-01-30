var path = require('path')

module.exports = {
    entry: {
        popup: './src/popup.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader',
                include: /src/
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
                include: /src/,
                query: {
                    modules: true,
                    localIdentName: '[name]-[local]--[hash:base64:5]'
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                include: /node_modules/
            }
        ]
    }
}
