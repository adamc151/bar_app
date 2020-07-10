const keys = require("../keys");
const HH_HEADER = keys.hhHeader;

export const isRouteAdmin = () => {
  var req = new XMLHttpRequest();
  req.open("GET", document.location, false);
  req.send(null);
  var headers = req.getAllResponseHeaders().toLowerCase();

  var arr = headers.split("\r\n");
  headers = arr.reduce(function(acc, current, i) {
    var parts = current.split(": ");
    acc[parts[0]] = parts[1];
    return acc;
  }, {});

  return headers.hh_header === HH_HEADER ? true : false;
};
