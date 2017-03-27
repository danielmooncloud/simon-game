var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
	context: __dirname + "/app/js/",
	entry: "./gui.js",
	output: {
		path: __dirname + "/public",
		filename: "app.bundle.js"
	},

	module: {
		loaders: [
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader", 
					use: "css-loader!resolve-url-loader!sass-loader?sourceMap",
					publicPath: "../images/"
				})
			},
			{
				test: /\.png?/,
				loader: "file-loader?outputPath=images/"
			},
			{
				test: /\.js?/,
				loaders: ["babel-loader", "eslint-loader"]
			}
		]
	},

	plugins: [
				
		new webpack.ProvidePlugin({
			$: "jquery",
 				jQuery: "jquery",
			"window.jQuery": "jquery"
		}),
		new ExtractTextPlugin("css/[name].css")
	]
}