/* *******************
 *  Helper functions *
 ******************* */
const sounds = {
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

export function getURLparams(prop) {
    /**
     * JavaScript Get URL Parameter
     * modified from @src https://www.kevinleary.net/javascript-get-url-parameters/
     * @param String prop The specific URL parameter you want to retreive the value for
     * @return String|Object If prop is provided a string value is returned, otherwise an object of all properties is returned
     */
    var params = {};
    var search = decodeURIComponent(
        window.location.href.slice(window.location.href.indexOf("?") + 1)
    );
    var definitions = search.split("&");

    definitions.forEach(function(val, key) {
        var parts = val.split("=", 2);
        if (parts[1] === undefined) {
            params = false;
        } else {
            params[parts[0]] = parts[1];
        }
    });
    return prop && prop in params ? params[prop] : params;
}
export function sortObject(arr, key, type, sort = "asc") {
    arr.sort((a, b) => {
        let aVal = type === "number" ? Number(a[key]) : a[key];
        let bVal = type === "number" ? Number(b[key]) : b[key];
        // establish a and b values based on value type
        if (sort === "desc") {
            if (aVal > bVal) {
                return -1;
            } else if (aVal < bVal) {
                return 1;
            }
            return 0;
        } else {
            if (aVal > bVal) {
                return 1;
            } else if (aVal < bVal) {
                return -1;
            }
            return 0;
        }
    });
    return arr;
}
export function scroll(selector) {
    let offset = selector.length ? selector.offset().top : 100;
    $("html, body").animate(
        {
            scrollTop: offset - 50,
        },
        500
    );
}
export function addCommas(value) {
    value += "";
    value = value.replace(/,/g, "");
    let x = value.split(".");
    let x1 = x[0];
    let x2 = x.length > 1 ? "." + x[1] : "";
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "," + "$2");
    }
    return x1 + x2;
}
export function isTypeOf(obj) {
    return Object.prototype.toString
        .call(obj)
        .slice(8, -1)
        .toLowerCase();
}
export function isValidJson(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
export function play(player, soundsOn, sound, start, stop) {
    player[0].pause();
    if (sound && soundsOn) {
        player[0].src = `${sounds.get(sound)}#t=${start},${stop}`;
        player[0].play();
        // load sound effect and play it
        // 'play' method operates on dom element directly,
        // not jQuery selector, hence the [0]
        return;
    }
    return false;
}
