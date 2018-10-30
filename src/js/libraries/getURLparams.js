/**
 * JavaScript Get URL Parameter
 * modified from @src https://www.kevinleary.net/javascript-get-url-parameters/
 * @param String prop The specific URL parameter you want to retreive the value for
 * @return String|Object If prop is provided a string value is returned, otherwise an object of all properties is returned
 */
const getURLparams = prop => {
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
};

module.exports = getURLparams;
