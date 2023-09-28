import { useMap } from "react-leaflet";
import L from "leaflet";
import { ConvertPointToCoord } from "./Helperman";
import React, { useEffect } from "react";
import { PersonConfig } from "@/app/admin/Interface/Interfaces";
import "leaflet.polyline.snakeanim";
import "leaflet";
interface propsForCoordinates {
  coordinates: PersonConfig["markercoords"];
  height: number;
  width: number;
}
const MotionWrapper: React.FC<propsForCoordinates> = ({
  coordinates,
  height,
  width,
}) => {
  const Map = useMap();
  useEffect(() => {
    // Check if coordinates is an array before mapping over it
    if (!Array.isArray(coordinates)) {
      return;
    }

    const scaledCoordinates = coordinates.map((coord) => {
      const scaled = ConvertPointToCoord(coord, [height, width]);
      return L.latLng(scaled[0], scaled[1]);
    });
    const layers = [];
    for (let i = 0; i < scaledCoordinates.length - 1; i++) {
      layers.push(L.marker(scaledCoordinates[i], { opacity: 0 }));
      layers.push(L.polyline([scaledCoordinates[i], scaledCoordinates[i + 1]]));
    }
    layers.push(L.marker(scaledCoordinates[scaledCoordinates.length - 1]));

    const route = L.layerGroup(layers, { snakingPause: 1 });

    Map.addLayer(route);

    route.snakeIn();

    //  setTimeout(snake, 1);
  }, [Map, coordinates, height, width]);

  return null;
};
export default MotionWrapper;
