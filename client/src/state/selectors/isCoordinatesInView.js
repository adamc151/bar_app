export function isCoordinatesInView(coordinates, mapBounds) {
  console.log("brooo mapBounds", mapBounds);
  const { ne, sw } = mapBounds;
  const { lat: neLat, lng: neLng } = ne;
  const { lat: swLat, lng: swLng } = sw;

  console.log("brooo coordinates", coordinates);


  return (
    coordinates[0] < neLat &&
    coordinates[0] > swLat &&
    coordinates[1] < neLng &&
    coordinates[1] > swLng
  );
}

export function getBoundsAtLatLngWithZoom(map, center, zoom) {
  var p = map.getProjection();
  if (!p) {
    return null;
  }

  console.log("yooomap", map.getBounds().getNorthEast().lat());

  var el = map.getDiv();
  var zf = Math.pow(2, zoom) * 2;
  var dw = (el.clientWidth | 0) / zf;
  var dh = (el.clientHeight | 0) / zf;
  var cpx = p.fromLatLngToPoint(center);
  return window.google.maps.LatLngBounds(
    p.fromPointToLatLng(window.google.maps.Point(cpx.x - dw, cpx.y + dh)),
    p.fromPointToLatLng(window.google.maps.Point(cpx.x + dw, cpx.y - dh))
  );
}
