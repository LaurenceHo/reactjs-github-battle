/**
 * Created by laurence-ho on 02/09/17.
 */
const path = require ('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin');

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve (__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	resolve: {
		modules: [
			path.join (__dirname, "dist"),
			"node_modules"
		],
		extensions: [ ".ts", ".tsx", '.js', '.json' ]
	},
	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader"
			},
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			},
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					query: {
						presets: [ "es2015" ]
					}
				}
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin ({
			template: 'src/index.html'
		})
	]
};

