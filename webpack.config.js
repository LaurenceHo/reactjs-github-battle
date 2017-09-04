/**
 * Created by laurence-ho on 02/09/17.
 */
const path = require ('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin');

module.exports = {
	entry: './app/index.jsx',
	output: {
		path: path.resolve (__dirname, 'dist'),
		filename: 'index_bundle.js'
	},
	resolve: {
		modules: [
			path.join (__dirname, "dist"),
			"node_modules"
		],
		extensions: [ '.js', '.jsx', '.json' ]
	},
	module: {
		rules: [
			{
				test: /\.(jsx)$/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			}
		]
	},
	devServer: {
		historyApiFallback: true
	},
	plugins: [
		new HtmlWebpackPlugin ({
			template: 'app/index.html'
		})
	]
};

