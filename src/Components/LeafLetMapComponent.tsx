import { Marker, ImageOverlay, MapContainer, Polyline } from "react-leaflet";
import Image from "next/image";
import { CRS, LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import { PersonConfig } from "@/app/admin2/Interfaces";
import { ConvertPointToCoord } from "./Helperman";
import MotionWrapper from "./MotionWrapper";

interface propsForCoordinates {
  coordinates: PersonConfig["markerCoords"];
}

const LeafLetMapComponent = ({ coordinates }: propsForCoordinates) => {
  const height: number = Math.min(
    window.visualViewport?.height as number,
    1511
  );
  const width: number = height / (1511 / 1069);
  const bounds: L.LatLngBoundsExpression = [
    [0, 0],
    [height, width],
  ];

  // const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null);
  // const [trailCoordinates, setTrailCoordinates] = useState<LatLng[]>([]);
  // const [routeFinished, setRouteFinished] = useState(false);

  // // handle marker movement
  // useEffect(() => {
  //   let currentIndex = 0;
  //   const interval = setInterval(() => {
  //     if (currentIndex < coordinates.length) {
  //       // setMarkerPosition(coordinates[currentIndex]);

  //       const Coords = ConvertPointToCoord(coordinates[currentIndex], [
  //         height,
  //         width,
  //       ]);
  //       setMarkerPosition(new LatLng(Coords[0], Coords[1]));
  //       currentIndex++;
  //     } else {
  //       currentIndex = 0;
  //       setRouteFinished(true); // Mark the route as finished
  //       clearInterval(interval);
  //     }
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [coordinates]);

  // // Handle trail coords
  // useEffect(() => {
  //   if (markerPosition && !routeFinished) {
  //     // Only update trail while the route is not finished
  //     setTrailCoordinates((prevCoordinates) => [
  //       ...prevCoordinates,
  //       markerPosition,
  //     ]);
  //   }
  // }, [markerPosition, routeFinished]);

  return (
    <MapContainer
      attributionControl={false}
      doubleClickZoom={false}
      scrollWheelZoom={false}
      zoomControl={false}
      dragging={false}
      crs={CRS.Simple}
      bounds={bounds}
      style={{ height, width }}
    >
      <ImageOverlay bounds={bounds} url="/officepicture.png" />
      <MotionWrapper
        coordinates={coordinates}
        height={height}
        width={width}
      ></MotionWrapper>
    </MapContainer>
  );
};

export default LeafLetMapComponent;
