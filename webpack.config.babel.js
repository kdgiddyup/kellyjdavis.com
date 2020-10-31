const path = require("path");
const fs = require("fs");
const CopyPlugin = require('copy-webpack-plugin');
// webpack config options can be found
// at https://webpack.js.org/configuration/

module.exports = () => {
    let readStream = fs.createReadStream("./readme.md");
    if (!fs.existsSync("./dist")) {
        fs.mkdirSync("./dist");
    }
    let writeStream = fs.createWriteStream("./dist/readme.md");
    readStream.pipe(writeStream);
    // lets put the readme.md file into dist to make
    // available to the front end 'fetch' command

    return {
        plugins: [
            new CopyPlugin([
              { 
                  from: './src/demos', 
                  to: path.resolve(__dirname, `dist/demos/`), 
                },
            //  { from: 'other', to: 'public' },
            ]),
          ],
        entry: `./src/js/index`,
        output: {
            path: path.resolve(__dirname, `dist/assets/`),
            filename: "bundle.js",
            publicPath: `assets/`,
        },
        /* 
            
            'entry' determines which js file to bundle,
            and which files in it to import;
            non-imports in src/ won't be parsed.
            'output' specifies where to place the output
            bundle, what it should be called and where
            to place public assets
            
            */

        module: {
            /* 
                
                module rules tell webpack what to do
                with what files (determined by regex 'test'
                value);
                actions include what files to exclude,
                what loader to use (must be NPM installed)
                and for certain loaders, options such as 
                what to name the output file and where to
                put it.
          
                Notes on common loaders:
          
                style-loader, css-loader: Used in conjunction to
                first parse CSS files, then output a <style> tag
                placed in the index.html <head>
          
                file-loader: pass through matching files without
                parsing; use the name, outputPath specified
          
                babel-loader: process files through the babel 
                compiler using the given preset ('env' is 
                recommended by babel), which should also be
                specified in your .babelrc file
                
                url-loader: parse matching files as inline assets
                and return the URL src attribute; if you set a 
                size limit, files above limit will fallback to
                file-loader with options specified (eg, name, outputPath)
                
          
                */

            rules: [
                {
                    test: /\.(eot|svg|ttf|woff|woff2)$/,
                    exclude: /semantic/,
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "fonts/",
                    },
                },
                {
                    test: /semantic(.*)default(.*)\.(eot|svg|ttf|woff|woff2)$/,
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "css/themes/default/assets/fonts/",
                    },
                },
                /*  Need fonts from other Semantic-UI themes? 
                      Copy above rule, then replace 'default' in
                      'test' and 'outputPath' properties with theme folder's name
                      Be sure to also import (or uncomment import) the font 
                      in the src/js/index.js file
                      */
                {
                    test: /\.css$/,
                    exclude: /semantic/,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /semantic(.*).css$/,
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "css/",
                    },
                },
                {
                    test: /\.jsx|\.js$/,
                    exclude: /node_modules|jquery/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [["env", { modules: false }]],
                        },
                    },
                },
                {
                    test: /jquery|semantic(.*)\.js$/,
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "js/",
                    },
                },
                {
                    test: /\.(jp(e*)g|png|gif|ico)$/,
                    use: {
                        loader: "url-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "img/",
                            limit: 10000,
                        },
                    },
                },
                {
                    test: /\.(html)$/,
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "../",
                    },
                },
            ],
        },
        stats: {
            colors: true,
        },
        devtool: "source-map",
    };
};
