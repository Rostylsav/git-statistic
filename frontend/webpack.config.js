const { resolve } = require('path')
const { HotModuleReplacementPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = () => {
    return ({
        //in which mode app is build
        mode: 'development',

        //start file
        entry: resolve(__dirname, 'src/index.jsx'),

        // whhere to put bundles
        output: {
            filename: 'js/[name].bundle.js',
            path: resolve(__dirname, 'dist'),
        },

        // which plagins to include
        plugins: [
            new HtmlWebpackPlugin({
                template: resolve(__dirname, 'public', 'index.html'),
                filename: 'index.html',
            }),
            new HotModuleReplacementPlugin()
        ],

        // server configuration
        devServer: {
            port: 4444,
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
            compress: true,
            hot: true,
            historyApiFallback: true,
            // contentBase: resolve(__dirname, 'public'),
        },

        resolve: {
            extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
            modules: ['node_modules'],
        },

        module: {
            rules: [
                {
                    test: /\.js(x?)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                    ],
                },
                // TODO add min-css-extract-plugin
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' },
                        { loader: 'sass-loader' }
                    ]
                },
                {
                    test: /\.(png|jpg)$/,
                    loader: 'url-loader'
                },
            ]
        }
    })
}