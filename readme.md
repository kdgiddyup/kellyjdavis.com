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

**Prerequisites:** If not already installed, install Nodejs, then use npm to globally install live-server and gulp.

For general project set-up:

1.  create project directory
2.  copy package.json from this sample set-up into project root
3.  change project name in package.json to match project
4.  copy .babelrc file from this sample set-up into project root
5.  run `npm install`
6.  at semantic-ui set-up prompt, choose "Custom" option and assert that the base directory should be `semantic/` and the output directories should be as shown below under **Semantic UI output directories**
7.  from resulting /semantic directory, remove gulpfile.js and /tasks directory into project root
8.  edit semantic.json to set `autoInstall` property to `true`
9.  copy webpack.config.js from this sample set-up into project root
10. copy index.html from this sample set-up into dist
11. copy index.js from this sample set-up into src/js
12. run `npm run build-all`
13. run `npm run serve` to set up development server
    code in index.html and index.js

### Semantic UI output directories

```javascript
        "packaged": "./../dist/semantic/",
        "uncompressed": "./../dist/semantic/components/",
        "compressed": "./../dist/semantic/components/",
        "themes": "./../dist/semantic/themes/"
```

semantic.json should look like:

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
