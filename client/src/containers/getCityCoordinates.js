//random figures added so refreshing page without moving map works :/
export const getCityCoordinates = (city) => {
  switch (city) {
    case "leeds":
      return [53.8 + Math.random() / 10000, -1.545];
    case "london":
      return [51.5074 + Math.random() / 10000, -0.12];
    case "clapham":
      return [51.46 + Math.random() / 10000, -0.155];
    default:
      return [53.8 + Math.random() / 10000, -1.545];
  }
};
