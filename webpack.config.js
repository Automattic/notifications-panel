const ExtractTextPlugin = require( "extract-text-webpack-plugin" );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );
const spawnSync = require( 'child_process' ).spawnSync;
const webpack = require( 'webpack' );

// webpack.config.js
module.exports = {
	cache: true,
	devtool: '#source-map',
	entry: {
		build: path.resolve( __dirname, 'src' ),
		standalone: path.resolve( __dirname, 'standalone' )
	},

	node: {
		fs: 'empty'
	},

	output: {
		path: path.resolve( __dirname, 'public' ),
		filename: '[name].min.js'
	},

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					babelrc: false,
					cacheDirectory: true,
					presets: [
						[ "es2015", { modules: false } ],
						"stage-2"
					],
					plugins: [
						"lodash",
						"syntax-jsx",
						"transform-react-jsx",
						"transform-react-display-name"
					]
				}
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract( {
					fallback: 'style-loader',
					use: [ 'css-loader', 'postcss-loader', 'sass-loader' ]
				} )
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin( {
			'process.env': {
				'NODE_ENV': JSON.stringify( process.env.NODE_ENV || 'development' )
			}
		} ),
		new HtmlWebpackPlugin( {
			filename: 'root.html',
			gitDescribe: spawnSync( 'git', [ 'describe', '--always', '--dirty' ] ).stdout.toString( 'utf8' ).replace( '\n', '' ),
			hash: true,
			nodePlatform: process.platform,
			nodeVersion: process.version,
			template: 'index.ejs'
		} ),
		new ExtractTextPlugin( 'build.css' ),
	],
	resolve: {
		// you can now require('file') instead of require('file.coffee')
		extensions: [ '.js', '.jsx', '.json' ],
		modules: [ 'node_modules', 'src' ]
	}
};
