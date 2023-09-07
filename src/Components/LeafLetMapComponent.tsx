import { ImageOverlay, MapContainer, Polyline } from "react-leaflet";
import Image from "next/image";
import { CRS } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

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

      <Polyline positions={coordinates} color="blue" weight={2} />
    </MapContainer>
  );
};

export default LeafLetMapComponent;
