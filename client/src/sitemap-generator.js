import {
  sitemapBuilder as buildSitemap,
  paramsApplier as applyParams,
} from "react-router-sitemap"; // import applyParams for paths pattern
import path from "path"; // add path which will be needed for file write
import fs from "fs"; // import file system object
import axios from "axios";
import { getCityCoordinates } from "./containers/getCityCoordinates";
const locations = ["leeds", "clapham"];

// use your website root address here. Optimally you can
// include dev and production enviorenments with variable
const hostname = "https://hapihour.io";
const routes = ["/", "/faq", "/map/:location", "/details/:id"];

// define our destination folder and sitemap file name
const dest = path.resolve("./public", "sitemap.xml");

const getBarsForSiteMap = async () => {
  const placeIds = [];
  const newJwt = await axios.get("https://hapihour.io/api/jwt");

  for (const location of locations) {
    const [lat, long] = getCityCoordinates(location);
    const values = await axios.get("https://hapihour.io/api/locations", {
      params: { long: long, lat: lat, miles: 10 },
      headers: { Authorization: "jwt " + newJwt.data },
    });
    values.data.map((value) => {
      placeIds.push(value.place_id);
    });
  }
  return placeIds;
};

const generateSiteMap = async () => {
  // Retrieve the post titles array ['post-title-1', 'post-title-2', ...]
  const barsIds = await getBarsForSiteMap();

  // Replace :slug with post titles
  const config = {
    "/map/:location": [{ location: locations }],
    "/details/:id": [{ id: barsIds }],
  };

  // Merge our route paths with config pattern
  const paths = applyParams(routes, config);

  // Generate sitemap and return Sitemap instance
  // paste new paths constant with hostname
  const sitemap = buildSitemap(hostname, paths);

  // write sitemap.xml file in /public folder
  // Access the sitemap content by converting it with .toString() method
  fs.writeFileSync(dest, sitemap.toString());
};

generateSiteMap();
