import { Position } from "@src/types/position";

interface CalculateDistanceProps {
  mode?: "haversine" | "euclidean";
  referencePosition: Position;
  comparisonPosition: Position;
}

/**
 * @mode
 * - haversine: A method that takes into account the curve of the Earth
 * - euclidean: Simple planar distance calculation method  */

function calculateDistance({
  mode = "haversine",
  referencePosition,
  comparisonPosition,
}: CalculateDistanceProps) {
  if (mode === "haversine") {
    const R = 6371e3; // Earth Radius(m)

    const toRadians = (degree: number) => degree * (Math.PI / 180);

    const lat1 = toRadians(referencePosition.lat);
    const lat2 = toRadians(comparisonPosition.lat);

    const deltaLat = toRadians(comparisonPosition.lat - referencePosition.lat);
    const deltaLng = toRadians(comparisonPosition.lng - referencePosition.lng);

    const haversine =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2;

    const distance =
      2 * R * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));

    return distance;
  }

  if (mode === "euclidean") {
    const DISTANCE_PER_LATITUDE = 111000;

    const DISTANCE_PER_LONGITUDE =
      111000 * Math.cos((referencePosition.lat * Math.PI) / 180);

    const deltaLat =
      (comparisonPosition.lat - referencePosition.lat) * DISTANCE_PER_LATITUDE;
    const deltaLng =
      (comparisonPosition.lng - referencePosition.lng) * DISTANCE_PER_LONGITUDE;

    const distance = Math.sqrt(deltaLat ** 2 + deltaLng ** 2);
    return distance;
  }

  throw new Error("Invalid mode. Use 'haversine' or 'euclidean'.");
}

export default calculateDistance;
