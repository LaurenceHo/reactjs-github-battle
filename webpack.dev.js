const merge = require ('webpack-merge');
const common = require ('./webpack.common.js');
const HotModuleReplacementPlugin = require ('webpack/lib/HotModuleReplacementPlugin');
const HtmlWebpackPlugin = require ('html-webpack-plugin');

module.exports = merge (common, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		historyApiFallback: true,
		hot: true,
		inline: true
	},
	plugins: [
		new HtmlWebpackPlugin ({
			template: 'app/index.html'
		}),
		new HotModuleReplacementPlugin ()
	]
});