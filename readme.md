# Notes

Based on [this basic starting point](https://italonascimento.github.io/configuring-a-basic-environment-for-javascript-development/)

_Requires global installation of live-server (`npm i live-server -g`)_

Steps I took:

1.  created project directory with src and dist directories; added boilerplate index.html to `/dist`, including calls to same-directory semantic.min.css and semantic.min.js, as well as the CDN for jQuery. It also pulls in the `main.js` bundle from webpack's build process, just above the `</body>` tag.
2.  ran npm init
3.  installed webpack, webpack-cli, babel-loader, babel-core, gulp, style-loader and css-loader _as dev dependencies_; any testing libraries should also be saved as dev dependencies.
4.  installed jquery (optionally) and semantic-ui as prod dependencies
5.  configured webpack:
    - create file webpack.config.js and added boilerplate to process all `.js` files through babel, source js via `./src/js/index.js`, set output to `__dirname + "/dist/js"` with filename `bundle.js`, use style-loader and css-loader modules to create .css tags automatically, set up 'source-map' option, and exclude jquery from being compiled in the bundle
6.  configured babel:
    - intalled preset _as dev dependency_: babel-preset-env (departs from instructions in referenced post, which lists deprecated babel-preset-latest)
    - created .babelrc and adds preset to it
7.  installed semantic-ui _as a prod dependency_ (`npm install semantic-ui --save` / cd semantic/ / gulp build)
    - changed autoInstall setting in `semantic.json` file to `true` so build will occur without user interaction
    - setup includes prompts for some basic preferences; I changed these properties:
      - base directory: `semantic/`
      - output directories:

```javascript
        "packaged": "./../dist/semantic/",
        "uncompressed": "./../dist/semantic/components/",
        "compressed": "./../dist/semantic/components/",
        "themes": "./../dist/semantic/themes/"
```

8.  modified package.json to use npm scripts to automate tasks (`&&` operator means second task runs after first completes; `&` means both tasks run concurrently):

```javascript
    "build": "webpack",
    "build-all": "gulp build && webpack",
    "watch": "webpack --watch & gulp watch",
    "serve": "npm run watch & live-server"
```

- `build-all` invokes `gulp build` for semantic-ui and `webpack` command to bundle js
- `build` invokes only `webpack` command to bundle js
- _Note_ about `webpack`: Can optionally add a `--config <filename>` to load a different config file when necessary (say, for production time)
- `watch` invokes `webpack --watch` to track JS changes and `gulp watch` to track css changes
- `serve` invokes `npm run watch` and `live-server`

## Steps for downstream dev

**Prerequisites:**

1.  if not already installed, install Nodejs, then globally install live-server and gulp: `npm i live-server gulp -g`

**New project set-up:**

1.  run `git clone https://dgtlmkt.git.beanstalkapp.com/jsdevtemplate.git project-name`
1.  run `cd project-name && rm -rf .git && git init`
2.  in `package.json` change `name`, `description`, `author`, `version` and `license` properties to reflect your project.
3.  run `npm install`
4.  if there are no hiccups in installation, you'll end up at a _semantic-ui_ set-up prompt. Choose the `Custom` option. Use the defaults for most things, but be sure the base directory is `semantic/` and set the output directories to what is shown below:
    ```javascript
    Where should we output a packaged version?: "./../dist/semantic/",
    Where should we output compressed components?: "./../dist/semantic/components/",
    Where should we output uncompressed components?: "./../dist/semantic/components/",
    "themes": "./../dist/semantic/themes/"
    ```
5.  from the resulting `/semantic` directory, move `gulpfile.js` and `/tasks` directory into the root of `project-name`
6.  edit `semantic.json` to make the following edits:
    1. set `autoInstall` property to `true`
    1. set `themes` to `./../dist/semantic/themes`
    1. ensure that `packaged`, `uncompressed` and `compressed` all start with `./../`

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
              "packaged": "./../dist/semantic/",
              "uncompressed": "./../dist/semantic/components/",
              "compressed": "./../dist/semantic/components/",
              "themes": "./../dist/themes/"
            },
            "clean": "dist/"
          },
          "permission": false,
          "autoInstall": true,
          "rtl": false,
          "version": "2.3.2"
        }
        ```
7.  run `npm run build-all` to compile initial project files
8.  run `npm run serve` to set up watchers on semantic and webpack files, and to launch a development server and view project in browser. Whenever you save changes to your project files, they should be automatically re-compiled and the browser will refresh for you. Nice!
