/* -------------------------------
            IMPORTS
   Only import what you need
   to cut down on bundle weight;
   Think of these imports as being
   imported "into" the bundle.js file
   which is automatically created
   and placed in the public 'assets'
   directory
---------------------------------- */

/*------------  
    Fonts 
-------------*/
// import "./../fonts/themify/font.css";
// const calibri = require("./../fonts/calibri/font.css");
// const icomoon-font = require("./../fonts/icomoon/font.css");
// const icomoon-icons = require("./../fonts/icomoon/icon.css");
// const raleway = require("./../fonts/raleway/font.css");
// const usb = require("./../fonts/usb/font.css");

/*----------------------------------
    Semantic-UI css, js and fonts 
-----------------------------------*/
import "./../../semantic/dist/semantic.min.css";
import "./../../semantic/dist/semantic.min.js";
import "./../../semantic/dist/themes/default/assets/fonts/outline-icons.woff";
import "./../../semantic/dist/themes/default/assets/fonts/outline-icons.woff2";
import "./../../semantic/dist/themes/default/assets/fonts/outline-icons.ttf";
import "./../../semantic/dist/themes/default/assets/fonts/outline-icons.eot";
import "./../../semantic/dist/themes/default/assets/fonts/outline-icons.svg";
import "./../../semantic/dist/themes/default/assets/fonts/outline-icons.woff";
import "./../../semantic/dist/themes/default/assets/fonts/brand-icons.woff2";
import "./../../semantic/dist/themes/default/assets/fonts/brand-icons.ttf";
import "./../../semantic/dist/themes/default/assets/fonts/brand-icons.eot";
import "./../../semantic/dist/themes/default/assets/fonts/brand-icons.svg";
import "./../../semantic/dist/themes/default/assets/fonts/icons.woff";
import "./../../semantic/dist/themes/default/assets/fonts/icons.woff2";
import "./../../semantic/dist/themes/default/assets/fonts/icons.ttf";
import "./../../semantic/dist/themes/default/assets/fonts/icons.eot";
import "./../../semantic/dist/themes/default/assets/fonts/icons.svg";

/*------------------------ 
    JS library imports 
-------------------------*/
import "./libraries/jquery-3.3.2.min";
import "./libraries/jquery.ui-1.10.3";

const getURLparams = require("./libraries/getURLparams");

/*------------- 
    Images 
---------------*/
const favicon = require("./../img/favicon.ico");

/*---------
    HTML
----------*/
import "./../index.html";

$(() => {
  // after page load, do:

  $(".container").prepend('<div data-display="page title">Hello, world!</div>');
}); // end doc ready function
