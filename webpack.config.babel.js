const fs = require("fs");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = (env, argv) => {
	const devMode = argv.mode !== "production";
	// let readStream = fs.createReadStream("./readme.md");
	// if (!fs.existsSync("./dist")) {
	// 	fs.mkdirSync("./dist");
	// }
	// let writeStream = fs.createWriteStream("./dist/readme.md");
	// readStream.pipe(writeStream);
	// // lets put the readme.md file into dist to make
	// available to the front end 'fetch' command

	return {
		optimization: {
			splitChunks: {}
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: "./../css/[name].css",
				chunkFilename: "[id].css"
			}),
			new CopyPlugin([
				{
					from: "./src/demos",
					to: path.resolve(__dirname, `dist/demos/`)
				}
				//  { from: 'other', to: 'public' },
			]),
			new webpack.ProvidePlugin({
				$: "jquery",
				jQuery: "jquery",
				UIkit: "uikit",
				Icons: "uikit/dist/js/uikit-icons-custom"
			})
		],
		entry: {
			// app: "./src/js/app.js",
			main: "./src/js/main.js",
			head: "./src/js/head.js",
			combined: "./custom/uikit-custom.less"
		},
		output: {
			path: path.resolve(__dirname, "dist/js/"),
			filename: "[name].bundle.js"
		},
		devtool: devMode ? "cheap-module-eval-source-map" : "cheap-module-source-map",
		module: {
			rules: [
				{
					exclude: /node_modules|_reference|dist|custom/,
					use: {
						loader: "babel-loader",
						options: {
							presets: [
								[
									"@babel/preset-env",
									{
										useBuiltIns: "usage",
										corejs: {
											version: "^3.6.5"
										}
									}
								]
							],
							plugins: [["@babel/transform-runtime"]]
						}
					}
				},
				{
					test: /\.(css|less)$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								hmr: devMode,
								sourceMap: true
							}
						},
						{
							loader: "css-loader", // translates CSS into CommonJS
							options: {
								sourceMap: false
							}
						},
						{
							loader: "less-loader", // compiles less to css
							options: {
								lessOptions: {
									// paths: [path.resolve(__dirname, 'node_modules/uikit/src/less/components')],
									// includePath: "./node_modules/uikit/src/less/components",
									sourceMap: false
								}
							}
						}
					]
				},
				{
					test: /img\/(.*)\.(jp(e*)g|png|gif|ico)$/,
					use: {
						loader: "url-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "./../img/",
							limit: false
						}
					}
				},
				{
					test: /\.svg$/,
					use: {
						loader: "svg-inline-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "./../img/"
						}
					}
				},
				{
					test: /ico$/,
					use: {
						loader: "url-loader",
						options: {
							outputPath: "./../",
							name: "[name].[ext]",
							limit: false
						}
					}
				},
				// {
				//     test: /jquery(.*)\.js$/,
				//     loader: "file-loader",
				//     options: {
				//         name: "[name].[ext]",
				//     },
				// },
				{
					test: /\.html$/,
					loader: "file-loader",
					options: {
						name: "[name].[ext]",
						outputPath: "./../"
					}
				}
			]
		}
	};
};
