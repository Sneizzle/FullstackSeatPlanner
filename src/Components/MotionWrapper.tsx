import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.polyline.snakeanim";
import { useRecoilState } from "recoil";
import { personState } from "@/recoil/atoms";
import { ConvertPointToCoord } from "./Helperman";
import { LatLngTuple } from "leaflet";
import "leaflet";
import { useEffect, useState } from "react";

// const [person] = useRecoilState(personState);

const MotionWrapper = ({ coordinates, height, width }) => {
  const Map = useMap();

  useEffect(() => {
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

    function snake() {
      route.snakeIn();
    }

    route.on("snakestart snake snakeend", function (ev) {
      console.log(ev.type);
    });

    setTimeout(snake, 1);
  }, [Map, coordinates, height, width]);

  return null;
};

export default MotionWrapper;
