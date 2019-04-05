// your custom js for this project goes here
/* master javascript file for contacts.gulfstream.aero */

const uuid = require("uuid/v4");
// comment above if you will not need UUID generation

const marked = require("marked");
// comment above if you won't be translating .md files
// into html

const stringify = require("json-stable-stringify");
// comment above if you will not need to render objects
// into strings in a deep and uniform way (good for comparing
// complex objects for true equality)

import {
    getURLparams,
    sortObject,
    scroll,
    addCommas,
    isTypeOf,
    isValidJson,
    play,
} from "./helper";
// helper functions; comment out any you don't need

//  1. getURLparams: parse incoming params on this apps URL
//  2. sortObject: sort an array of objects by a passed in key: sortObject(array,key,type,sort) (default type=alpha and sort=asc)
//  3. scroll: scroll to passed in jQuery object: scroll($("[data-section='header']"))
//  4. addCommas: returns comma-separated number string from number string or number value passed in: addCommas("132112") or addCommas(132112) returns "132,112"
//  5. isTypeOf: returns true object type string from input value: isTypeOf([1,2,3]) returns "array"; isTypeOf({a:1,b:2}) returns "object"
//  6. isValidJson: primitive check on passed in data; returns true (is parsable JSON) or false(with console logged error)
//  7. play: plays sound based on property passed in: play("error"): will play randmon error sound in "error" array in "sounds" object

console.log(isTypeOf({ a: 1, b: 2 }));

const api = "https://api.gulfstream.aero";

let soundsOn = false;

let appSection,
    globalMessage,
    helpPanel,
    loginButton,
    loginButtonVisibleLabel,
    loginButtonHiddenLabel,
    modal,
    modalHeader,
    modalContent,
    modalActions,
    modalNegative,
    modalPositive,
    player,
    soundButton;
let gacUser = {};
let sounds = {};
let loadingIcon = `<i class="notched circle loading icon"></i>`;

$(() => {
    // post-load scripting

    /* some important DOM elements */
    appSection = $("[data-section='app section']").hide();
    helpPanel = $("[data-section='help section']");
    loginButton = $("[data-button='login button']");
    loginButtonVisibleLabel = $("[data-label='login visible label']");
    loginButtonHiddenLabel = $("[data-label='login hidden label']");
    globalMessage = $("[data-message='global area']");
    modal = $("[data-modal='confirmation modal']");
    modalHeader = modal.find(".header");
    modalContent = modal.find(".content");
    modalActions = modal.find(".actions");
    modalNegative = $("[data-button='modal negative button']");
    modalPositive = $("[data-button='modal positive button']");
    soundButton = $("[data-button='sounds']");
    player = $("[data-audio='sound effects']");

    sounds = {
        success: ["woohoo.wav", "homerlaugh1.wav"],
        error: [
            "doh.wav",
            "bart-laugh.wav",
            "marge-hmm.wav",
            "burns-laugh.wav",
            "nelson.wav",
        ],
        event: ["maggie.wav"],
        logoff: ["byebye.mp3"],
        chipmunk: ["chipmunk.mp3"],
        longEvent: ["757.wav"],
        alert: ["marge-hmm.wav"],
        bell: ["service-bell.mp3"],
        get: key => {
            let path = "https://s3.amazonaws.com/gac-sounds/";
            if (sounds[key].length > 1) {
                return `${path}${
                    sounds[key][Math.floor(Math.random() * sounds[key].length)]
                }`;
            }
            return `${path}${sounds[key][0]}`;
        },
    };

    // some frequently accessed DOM elements

    loginButton.off().on("click", login);
    // add click handler to login button

    soundButton.hide().on("click", function() {
        if (soundsOn) {
            play();
            soundsOn = false;
            $(this)
                .find("i")
                .removeClass("up")
                .addClass("off");
        } else {
            soundsOn = true;
            play("success");
            $(this)
                .find("i")
                .removeClass("off")
                .addClass("up");
        }
    });
    // click handler for sound effects button

    fetch("readme.md")
        .then(response => response.text())
        .then(text => helpPanel.html(marked(text)));
    // pull in readme and run through 'marked' package to create a nice
    // help file in the help tab.

    /*  kick off authentication */
    const params = getURLparams();

    // are there parameters in the URL? page load likely came from SAML login redirect
    if (params.sid) {
        // is there an sid parameter?
        $.get(`${api}/session?sid=${params.sid}`).done(response => {
            if (response.success) {
                localStorage.setItem("gacSession", params.sid);
                history.replaceState({}, "", "/");

                gacUser = response.data;
                adminCheck(gacUser);
                // check if user is registered with this application
            } else {
                history.replaceState({}, "", "/");
                globalMessage
                    .removeClass("info negative warning positive")
                    .addClass("warning")
                    .html(
                        "This application could not determine if you are logged in. Please try again."
                    );
            }
            // no session found; remove SID from URL and message user
        });
    } else {
        // no SID parameter
        if (localStorage.gacSession) {
            // there is a session so there has been a login, but is it current?
            $.get(`${api}/session?sid=${localStorage.gacSession}`).done(
                response => {
                    if (response.success) {
                        // if session comes back successfully, user is currently logged in

                        gacUser = response.data;
                        adminCheck(gacUser);
                        // find out if they are registered to use app, and render app
                    } else {
                        // no current session
                        localStorage.clear();
                        globalMessage
                            .removeClass("info negative warning positive")
                            .addClass("warning")
                            .html(
                                "The application could not log you in or the current session has expired. Please log in."
                            );
                        loginButtonVisibleLabel.html(
                            `<i class="large sign-in icon"></i>`
                        );
                        loginButtonHiddenLabel.html("Log in");
                    }
                }
            );
        } else {
            globalMessage
                .html(
                    `<p style="text-align: right">Welcome. Please log in using your Gulfstream credentials. <i class="right angle icon"></i></p>`
                )
                .removeClass("info negative warning positive")
                .addClass("info");
        }
    }
}); // end page ready function wrapper

/*************************
 * App-related functions *
 *************************/

const login = () => {
    location.href = `${api}/login?RelayState=${location.href}`;
};

const logout = () => {
    $.get(`${api}/logout?sid=${localStorage.gacSession}`).done(response => {
        globalMessage
            .removeClass("info warning negative positive")
            .addClass("info")
            .html(response.data);
        play("logoff");
        localStorage.clear();
        gacUser = {};
        // reset user data

        loginButton.off().on("click", login);
        // update login button click handler

        loginButton
            .find("i")
            .removeClass("sign-out")
            .addClass("sign-in");
        loginButton.find(".hidden.content").html("Log in");
        appSection.html("");
        // update interface
    });
};

const adminCheck = user => {
    globalMessage
        .removeClass("info negative warning positive")
        .addClass("positive")
        .html(`Welcome, ${user.firstname}!`);
    loginButtonVisibleLabel.html(`<i class="large sign-out icon"></i>`);
    loginButtonHiddenLabel.html("Log out");
    // update interface

    loginButton.off().on("click", logout);
    // attach logout function to login button

    if (!user.access || !user.access.support) {
        play("error");
        globalMessage
            .html(
                "You are logged in, but not registered to use this application. Please request access from a Digital Marketing team member."
            )
            .removeClass("info negative warning positive")
            .addClass("warning");
    } else {
        play("success");
        appSection.show();
        renderApp();
        // kickoff app build with this authorized user
    }
};

const renderApp = () => {
    soundButton.show();
    // reveal sound button

    $(".menu .item").tab();
    // initialize tabs

    appSection.html(`<div class="ui segment">
        Hello, World!
    </div>`);
};
// end renderApp function

/* ******************************************************
 *   some design patterns for common helpful operations  *
 ******************************************************* */

/* reduce array to its unique elements: */

// myArray = myArray.filter(
//     (value, index, self) => self.indexOf(value) === index
// );

/* common Data Service API calls */

/* dynamoDb list (scan) operation:  */

// $.ajax({
//     url: `${api}/ddb?operation=list&table=${tablename}`,
//     beforeSend: request => {
//         request.setRequestHeader("x-access-token", gacUser.token);
//     },
// })
//     .done(res => {
//         if (res.success) {
//             play("success");
//             globalMessage
//                 .removeClass("info negative warning positive")
//                 .addClass("positive")
//                 .html(`Success message here`);
//             console.log(res.data);
//         } else {
//             console.log(res);
//             play("error");
//             globalMessage
//                 .removeClass("info negative warning positive")
//                 .addClass("negative")
//                 .html(res.data);
//         }
//     })
//     .fail(err => {
//         console.log(err);
//         play("error");
//         globalMessage
//             .removeClass("info negative warning positive")
//             .addClass("negative")
//             .html(
//                 err.responseJSON ? err.responseJSON.message : err.responseText
//             );
//     });

/* dynamoDb batchWrite (deletions and batch create/update puts): */
// limited to 25 items per request

// let updateRequests = [];
// if (removals.length) {
//     removals.forEach(removal => {
//         updateRequests.push({
//             DeleteRequest: {
//                 Key: {
//                     id: removal,
//                 },
//             },
//         });
//     });
// }
// // handle deletions, if any

// if (altered.length) {
//     altered.forEach(item => {
//         updateRequests.push({
//             PutRequest: {
//                 Item: item,
//             },
//         });
//     });
// }
// // handle updates

// let params = {
//     operation: "batchWrite",
//     tableName: "table name",
//     contactType: type,
//     payload: {
//         RequestItems: {
//             "table name": updateRequests,
//         },
//     },
// };

// $.ajax({
//     method: "POST",
//     url: `${api}/ddb`,
//     data: JSON.stringify(params),
//     beforeSend: request => {
//         request.setRequestHeader("x-access-token", gacUser.token);
//         request.setRequestHeader("Content-Type", "application/json");
//     },
// })
//     .done(res => {
//         if (res.success) {
//             play("success");
//             globalMessage
//                 .removeClass("info negative warning positive")
//                 .addClass("positive")
//                 .html(`Success message`);
//             console.log(res.data);
//         } else {
//             console.log(res);
//             play("error");
//             globalMessage
//                 .removeClass("info negative warning positive")
//                 .addClass("negative")
//                 .html(res.data);
//         }
//     })
//     .fail(err => {
//         console.log(err);
//         play("error");
//         globalMessage
//             .removeClass("info negative warning positive")
//             .addClass("negative")
//             .html(
//                 err.responseJSON ? err.responseJSON.message : err.responseText
//             );
//     });

/* s3 document update: */

// let params = {
//     bucket: s3bucket,
//     key: key /* ie, filename */,
//     payload: data /* typically would be JSON */,
// };

// $.ajax({
//     method: "POST",
//     url: `${api}/s3/rest/of/api/path`,
//     data: JSON.stringify(params),
//     beforeSend: request => {
//         request.setRequestHeader("x-access-token", gacUser.token);
//         request.setRequestHeader("Content-Type", "application/json");
//     },
// })
//     .done(res => {
//         if (res.success) {
//             play("success");
//             globalMessage
//                 .removeClass("info negative warning positive")
//                 .addClass("positive")
//                 .html(`Update success message`);
//             console.log(res.data);
//         } else {
//             console.log(res);
//             play("error");
//             globalMessage
//                 .removeClass("info negative warning positive")
//                 .addClass("negative")
//                 .html(res.data);
//         }
//     })
//     .fail(err => {
//         console.log(err);
//         play("error");
//         globalMessage
//             .removeClass("info negative warning positive")
//             .addClass("negative")
//             .html(
//                 err.responseJSON ? err.responseJSON.message : err.responseText
//             );
//     });

/* timed filter input */

// waits for input to stop for 1 second before
// embarking on filter operation
// "inputTimer" should be declared up top as a global variable

// searchInput.on("input", function() {
//     clearTimeout(inputTimer);
//     // if additional input arrives within 1 second,
//     // clear any existing timeouts from previous input
//     // to prevent search from firing

//     let input = $(this)
//         .val()
//         .trim();
//     if (input != " " && input.length) {
//         let hits = [];
//         inputTimer = setTimeout(() => {
//             // check input value against data source
//             // to populate hits with matched data

//             if (!hits.length) {
//                 play("alert");
//             } else {
//                 play("event");
//             }

//             // update UI with results
//                 }, inputTime);
//     } else {
//         // update UI to show zero results
//     }
// });
// end search button click handler
