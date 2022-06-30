const nodeExternals = require('webpack-node-externals')
const CopyPlugin = require('copy-webpack-plugin')

exports.default = {
    mode: 'production',
    target: 'node',
    plugins: [
        new CopyPlugin({
            patterns: [
                'package.json',
                'README.md'
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    externals: [nodeExternals()],
    output: {
        clean: true,
        filename: 'index.js',
        library: {
            type: 'commonjs-static'
        }
    }
};
