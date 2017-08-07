var glob = require('glob')
var path = require('path')
var config = require('../config/index')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function assetsPath(_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

const entries = {}
const chunks = []
glob.sync('./demo/**/index.js').forEach(path => {
    var suffix = path.split('./demo/')[1].split('/')
    const chunk = 'demo/' + suffix[0] + '/index'
    entries[chunk] = path
    chunks.push(chunk)
})
entries['b-canvas'] = './src/bCanvas.js'

module.exports = {
    entry: entries,
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src'), resolve('test')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')],
                exclude: [resolve('node-modules')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: process.env.NODE_ENV === 'production'
                        ? assetsPath('[path][name].[ext]?v=4')
                        : assetsPath('images/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: assetsPath('fonts/[name].[ext]?v=1')
                }
            }
        ]
    }
}
