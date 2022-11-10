const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	mode: "development",
	output: {
		path: path.resolve(__dirname, "dist"),
	},
	resolve: {
		extensions: [".ts", ".js", ".json"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: "ts-loader",
						options: {
							configFile: path.resolve(__dirname, "tsconfig.json"),
						},
					},
				],
				exclude: /(node_modules)/,
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.pug$/,
				loader: "pug-loader",
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: ["file-loader"],
			},
		],
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "static"),
		},
		historyApiFallback: true,
		compress: true,
		port: 3000,
	},
	plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
};
