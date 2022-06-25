// import "select2";
import "core-js/stable";
import "regenerator-runtime/runtime";
import UIkit from "uikit";
UIkit.use(Icons);
import "./libraries/jquery.ui-1.10.3";
import "./libraries/header";
import "./libraries/portfolio";
import "./libraries/resume";
// library imports

// component imports

/*------------- 
Images 
---------------*/
import favicon from "./../img/favicon.ico";
import gulfstreamnews from "./../img/gulfstreamnews.png";
import issuuAPI from "./../img/issuuAPI.png";
import mugshots from "./../img/mugshots.png";
import BehindTheHotel from "./../img/BehindTheHotel.gif";
import matthewWind from "./../img/matthewWind.gif";
import foxHunting from "./../img/foxHunting.jpg";
import onthebus from "./../img/onthebus.gif";
import finn_splash2 from "./../img/finn_splash2.jpg";

import "./../index.html";
// html imports

// const uuid = require("uuid/v4");
// comment above if you will not need UUID generation

const { portfolioData } = require("./libraries/portfolio");
const { resumeData } = require("./libraries/resume");
const { my } = require("./libraries/header");

$(() => {
	// post-load scripting

	/* some important DOM elements */
	const nav = $("#nav");
	const portfolio = $("#portfolio");
	const resume = $("#resume");

	/* build header */
	nav.html(`<h1>${my.name}</h1>
    <p><a href="${my.data.github}" target="_blank"><span uk-icon="icon: github"></span></a>
    <a href="${my.data.linkedin}" target="_blank"><span uk-icon="icon: linkedin"></span></a>
    <a href="${my.data.twitter}" target="_blank"><span uk-icon="icon: twitter"></span></a>
    <a href="${my.data.facebook}" target="_blank"><span uk-icon="icon: facebook"></span></a>
    <a href="${my.data.web}" target="_blank"><span uk-icon="icon: world"></span></a>
    <a href="mailto:${my.data.email}" target="_blank"><span uk-icon="icon: mail"></span></a>
    </p>
    <p><a href="https://www.google.com/maps/place/Bluffton,+SC/@32.1997897,-80.9373685,12z/data=!4m5!3m4!1s0x88fb88a4565944a9:0x533443fc3989de46!8m2!3d32.2371465!4d-80.8603868" target="_blank"><span uk-icon="icon: location"></span>${my.data.address}</a></p>
    <p><a href="tel:${my.data.phone}"><span uk-icon="icon: phone"></span></a> <a href="tel:${my.data.phone}">${my.data.phone}</a></p>`);

	/* build portfolio */
	portfolioData.forEach(item => {
		portfolio.append(`<div class="uk-card uk-card-small uk-card-default uk-width-1-1 uk-width-1-4@s">
		<div class="uk-margin-top uk-padding-small">
		<img src="img/${item.image}">
		</div>
        <div class="uk-card-header">
			<h3 class="uk-card-title"><a href="${item.url}" target="_blank" class="header">${item.name}</a></h3>
        </div>
        <div class="uk-card-body content">
            
            <div class="meta">
            <span>${item.tech}</span>
            </div>
            <div class="description">
            ${item.desc}
            </div>
        </div>
        </div>`);
	});

	/* build resume */

	resume.append(resumeData);
}); // end page ready function wrapper
