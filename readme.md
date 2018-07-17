## New project set-up

### Prerequisites

If not already installed, install Nodejs, then globally install live-server and gulp: `npm i live-server gulp -g`

### Steps

1.  whatever you call it, cd into your "projects" directory and run `git clone https://dgtlmkt.git.beanstalkapp.com/jsdevtemplate.git project-name`
1.  run `cd project-name && rm -rf .git && git init` to initialize with source control
1.  in `package.json` change `name`, `description`, `author`, `version` and `license` properties to reflect your project.
1.  run `npm install`
1.  if there are no hiccups in installation, you'll end up at a _semantic-ui_ set-up prompt. Choose the `Custom` option. Use the defaults for most things (that is, just hit 'Enter'), but be sure the base directory is `semantic/` and set the output directories to what is shown below:
    ```javascript
    Where should we output a packaged version?: "./../dist/assets/style/semantic/",
    Where should we output compressed components?: "./../dist/assets/style/semantic/components/",
    Where should we output uncompressed components?: "./../dist/assets/style/semantic/components/"
    ```
1.  from the `/semantic` directory in the project **root** (NOT the one in `/dist`), move `gulpfile.js` and `/tasks` directory into the root
1.  edit `semantic.json` to make the following modifications:

    1.  set `themes` to `./../dist/assets/style/semantic/themes`
    1.  ensure that `packaged`, `uncompressed` and `compressed` property values all start with `./../dist/assets/style/`

    the file should now look like this:

        ```javascript
        {
          "base": "semantic/",
          "paths": {
            "source": {
              "config": "src/theme.config",
              "definitions": "src/definitions/",
              "site": "src/site/",
              "themes": "src/themes/"
            },
            "output": {
              "packaged": "./../dist/assets/style/semantic/",
              "uncompressed": "./../dist/assets/style/semantic/components/",
              "compressed": "./../dist/assets/style/semantic/components/",
              "themes": "./../dist/assets/style/semantic/themes/"
            },
            "clean": "dist/"
          },
          "permission": false,
          "rtl": false,
          "version": "2.3.2"
        }
        ```

1.  run `npm run build-all` to compile initial project files

1.  run `npm run serve` to set up watchers on semantic and webpack files, and to launch a development server and view project in browser. Whenever you save changes to your project files, they should auto-compile and the browser will refresh for you. Nice!

# Notes

Based on [this basic starting point](https://italonascimento.github.io/configuring-a-basic-environment-for-javascript-development/)

_Requires global installation of live-server (`npm i live-server -g`)_

Steps I took:

1.  created project directory with src and dist directories; added boilerplate index.html to `/dist`, including calls to same-directory assets/style/semantic.min.css and assets/style/semantic.min.js, as well as the CDN for jQuery. It also pulls in the `main.js` bundle from webpack's build process, just above the `</body>` tag.
2.  ran npm init
3.  installed webpack, webpack-cli, babel-loader, babel-core, gulp, style-loader, css-loader and webpack-merge _as dev dependencies_; any testing libraries should also be saved as dev dependencies.
4.  installed jquery (optionally) and semantic-ui as prod dependencies
5.  configured webpack:
    - create file webpack.common.js, webpack.dev.js and webpack.prod.js; webpack.common.js is merged via webpack-merge with the prod and dev config files, and includes boilerplate to process all `.js` files through babel, source js via `./src/js/index.js`, set output to `__dirname + "/dist/assets/js"` with filename `bundle.js`, use style-loader and css-loader modules to import .css tags automatically, set up 'source-map' option for dev, and exclude jquery from being compiled in the bundle
6.  configured babel:
    - intalled preset _as dev dependency_: babel-preset-env (departs from instructions in referenced post, which lists deprecated babel-preset-latest)
    - created .babelrc and adds preset to it
7.  installed semantic-ui _as a prod dependency_ (`npm install semantic-ui --save` / cd semantic/ / gulp build)
    - setup includes prompts for some basic preferences; I changed these properties:
      - base directory: `semantic/`
      - output directories:

```javascript
        "packaged": "./../dist/assets/style/semantic/",
        "uncompressed": "./../dist/assets/style/semantic/components/",
        "compressed": "./../dist/assets/style/semantic/components/",
        "themes": "./../dist/assets/style/semantic/themes/"
```

8.  modified package.json to use npm scripts to automate tasks (`&&` operator means second task runs after first completes; `&` means both tasks run concurrently):

```javascript
    "build": "webpack --config webpack.prod.js",
    "build-all": "gulp build && webpack --config webpack.prod.js",
    "watch": "webpack --config webpack.dev.js --watch & gulp watch",
    "serve": "npm run watch & live-server --open=/dist"
```

- `build-all` invokes `gulp build` for semantic-ui and `webpack` command to bundle js in production mode
- `build` invokes `webpack` command with production config to bundle js uglified
- _Note_ about `webpack`: Can optionally add a `--config <filename>` to load a different config file when necessary (say, for production time)
- `watch` invokes `webpack --mode development --watch` to compile in dev mode and watch for JS changes and `gulp watch` to watch for Semantic UI changes
- `serve` invokes `npm run watch` and `live-server` with its patch set to the `/dist` directory
