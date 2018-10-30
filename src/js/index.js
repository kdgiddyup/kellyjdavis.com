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
import favicon from "./../img/favicon.ico";

/*---------
    HTML
----------*/
import "./../index.html";

$(() => {
  // after page load, do:

  $("link[rel='shortcut icon']").attr("href", favicon);
  // update favicon

  /*********************************
   * Configure analytics tags here *
   *********************************/

  const siteUrl = "";
  // what will this site's URL be?
  // No analytics tagging will be applied if this is left blank

  const hotjarId = "";
  // what is this site's Hotjar analytics ID?
  // No hotjar tag will be applied if this is left blank

  const googleId = "";
  // what is this site's Google Analtyics ID?
  // No Google Analytics tag will be applied if this is left blank

  if (siteUrl) {
    if (hotjarId) {
      $("head").append(`<!-- Hotjar Tracking Code for ${siteUrl} -->
  <script>
  (function (h, o, t, j, a, r) {
      h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
      h._hjSettings = { hjid: ${hotjarId}, hjsv: 6 };
      a = o.getElementsByTagName('head')[0];
      r = o.createElement('script'); r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
  })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
</script>`);
    }
    // if hotjar ID is given, add hotjar tag

    if (googleId) {
      $("head")
        .append(`<!-- Global site tag (gtag.js) for ${siteUrl} - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${
        variants[variant].analytics.google
      }"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());

  gtag('config', '${variants[variant].analytics.google}');
</script>`);
    }
    // if Google Analytics ID is given, add Google Analytics tag
  }
  // if analytics are configured, append them to the <head> tag

  /******************************
   * Site scripting starts here *
   ******************************/
  $(".container").prepend('<div data-display="page title">Hello, world!</div>');
}); // end doc ready function
