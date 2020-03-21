export function isCoordinatesInView(coordinates, mapBounds) {
  const { ne, sw } = mapBounds;
  const { lat: neLat, lng: neLng } = ne;
  const { lat: swLat, lng: swLng } = sw;

  return (
    coordinates[0] < neLat &&
    coordinates[0] > swLat &&
    coordinates[1] < neLng &&
    coordinates[1] > swLng
  );
}
