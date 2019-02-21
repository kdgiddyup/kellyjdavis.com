# New project set-up

## Prerequisites

If not already installed, install Nodejs, then globally install live-server and gulp: `npm i live-server gulp -g`

## Installation

1.  Whatever you call it, cd into your "projects" directory and run `git clone ssh://git-codecommit.us-east-1.amazonaws.com/v1/repos/jsDevSetupTemplate project-name`

1.  Run `cd project-name && rm -rf .git && git init` to initialize with source control
1.  In `package.json` change `name`, `description`, `author`, `version` and `license` properties to reflect your project.
1.  Run `npm install`
1.  If there are no hiccups in installation, you'll end up at a _semantic-ui_ set-up prompt. Accept the defaults.
1.  From the `/semantic` directory in the project **root**, move `gulpfile.js` and `/tasks` directory into the root
1.  Run `npm run build-all` to compile initial project files; this will take some time
1.  Run `npm run serve` to set up watchers on semantic and webpack files, and to launch a development server and view project in browser. Whenever you save changes to your project files, they should auto-compile and the browser will refresh for you. Nice!

## Usage

-   Work in `<project name>/src/`

-   Open `<project name>/src/js/index.js` to configure analytics tags; you will also return to this file during your project's development to import necessary image, script, font and stylesheet files in order to make sure they're packed into the project bundle.js file.

-   You can use ES6 syntax in your javascripting, as the project uses the Babel transpiler. If you encounter transpile errors because you do not have a particular Babel plugin, you can install it using `npm i <plugin name> -save-dev`, then add the necessary reference in `<project name>/.babelrc` file. Let a maintainer of this repo know if you do this, and the plugin can be added to the repo for future users.
-   Add images to `<project name>/src/img/`; they **must be imported in `<project name>/src/js/index.js`** (take a look at this file to see how this is done) in order for Webpack to move them into the `/dist/assets/img` directory. Reference them in your html at `/assets/img/<image file name>`.
-   Add scripts to `<project name>/src/js/libraries` (then **import them** on `<project name>/src/js/index.js` and reference them in html at `/assets/js/<script file name>`); or add functions to `<project name>/src/js/index.js`
-   Add fonts to `<project name>/src/fonts` if necessary (then **import them** in `<project name>/src/js/index.js` and reference them in html at `/assets/fonts/<font file name>`), or add CDN imports to index.html (Our `Horizon` font is imported in index.html already)
-   There is a jquery "ready" function set up for you on `<project name>/src/js/index.js` to add any javascript needed after page loads.
-   Add additional html pages in `<project name>/src/` if necessary, but if you do so, **you must import them** in `<project name>/src/js/index.js`. They can be referenced in html using relative paths from the project root: `/page2.html`
-   Add CSS stylesheets to `<project name>/src/css/` if necessary, but if you do, **you must import them** in `<project name>/src/js/index.js`.
-   Add or update global styles in `<project name>/semantic/src/site/globals/site.overrides`. You can add new CSS variables in `<project name>/semantic/src/site/globals/site.variables`
