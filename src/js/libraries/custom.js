// your custom js for this project goes here
/* master javascript file for contacts.gulfstream.aero */

const uuid = require("uuid/v4");
// comment above if you will not need UUID generation

const {portfolioData} = require("./portfolio");
const { resumeData } = require("./resume");
const { my } = require("./header");

import {
    sortObject,
} from "./helper";
// helper functions; comment out any you don't need

let header, portfolio, resume;
let loadingIcon = `<i class="notched circle loading icon"></i>`;

$(() => {
    // post-load scripting

    $(".menu .item").tab();
    // initialize tabs

    /* some important DOM elements */
    header = $("[data-section='header']");
    portfolio = $("[data-section='portfolio section']");
    resume = $("[data-section='resume section']");

    /* build header */
    header.html(`<h1>${my.name}</h1>
    <p><a href="${my.data.github}" target="_blank"><i class="inverted github icon"></i></a>
    <a href="${my.data.linkedin}" target="_blank"><i class="inverted linkedin icon"></i></a>
    <a href="${my.data.twitter}" target="_blank"><i class="inverted twitter icon"></i></a>
    <a href="${my.data.facebook}" target="_blank"><i class="inverted facebook icon"></i></a>
    <a href="${my.data.web}" target="_blank"><i class="inverted globe icon"></i></a>
    <a href="mailto:${my.data.email}" target="_blank"><i class="inverted envelope icon"></i></a>
    </p>
    <p>Homebase: ${my.data.address}</p>
    <p><a href="tel:${my.data.phone}"><i class="inverted mobile alternate icon"></i></a> <a href="tel:${my.data.phone}">${my.data.phone}</a></p>`);

    /* build portfolio */
    portfolioData.forEach(item=>{
        portfolio.append(`<div class="card">
        <div class="image">
            <img src="assets/img/${item.image}">
        </div>
        <div class="content">
            <a href="${item.url}" class="header">${item.name}</a>
            <div class="meta">
            <span>${item.tech}</span>
            </div>
            <div class="description">
            ${item.desc}
            </div>
        </div>
        </div>`)
    });

    /* build resume */

    resume.append(resumeData);
}); // end page ready function wrapper

