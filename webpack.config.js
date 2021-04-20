var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : './index.js',
    output : {
        path : path.join(__dirname , 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port:9000,
    },
    module : {
        rules : [
            {test : /\.(js)$/, use:'babel-loader'},
            {test : /\.scss$/, use:['style-loader', 'css-loader', 'sass-loader']}
        ]
    },
    mode:'development',
    plugins : [
        new HtmlWebpackPlugin ({
            title: 'Development',
            template : './index.html'
        })
    ]

}
