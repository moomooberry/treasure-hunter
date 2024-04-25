import { Loader } from "@googlemaps/js-api-loader";

const googleMapLoader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  version: "weekly",
  libraries: ["places"],
});

export default googleMapLoader;
