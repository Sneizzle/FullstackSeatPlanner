import { Marker, ImageOverlay, MapContainer, Polyline } from "react-leaflet";
import Image from "next/image";
import { CRS, LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";

const LeafLetMapComponent = ({ coordinates }) => {
  const height: number = Math.min(
    window.visualViewport?.height as number,
    1511
  );
  const width: number = height / (1511 / 1069);
  const bounds = [
    [0, 0],
    [height, width],
  ];

  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null);
  const [trailCoordinates, setTrailCoordinates] = useState<LatLng[]>([]);
  const [routeFinished, setRouteFinished] = useState(false);

  // handle marker movement
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < coordinates.length) {
        setMarkerPosition(coordinates[currentIndex]);
        currentIndex++;
      } else {
        currentIndex = 0;
        setRouteFinished(true); // Mark the route as finished
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [coordinates]);

  // Handle trail coords
  useEffect(() => {
    if (markerPosition && !routeFinished) {
      // Only update trail while the route is not finished
      setTrailCoordinates((prevCoordinates) => [
        ...prevCoordinates,
        markerPosition,
      ]);
    }
  }, [markerPosition, routeFinished]);

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

      <Polyline positions={[]} color="blue" weight={2} />

      {markerPosition && <Marker position={markerPosition}></Marker>}

      {/* Create a visible trail */}
      <Polyline positions={trailCoordinates} color="red" weight={2} />
    </MapContainer>
  );
};

export default LeafLetMapComponent;
