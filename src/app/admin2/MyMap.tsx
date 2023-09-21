"use client";
import { peopleState, personState } from "@/recoil/atoms";
import L, { CRS } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { ImageOverlay, MapContainer, useMapEvents } from "react-leaflet";
import { useRecoilState } from "recoil";
import { PersonConfig } from "./Interfaces";
import LayerGroups from "./LayerGroups";
import "./map.css";
import { useMemo } from "react";
import dynamic from "next/dynamic";
interface myMapProps {
  addMarkerMode: boolean;
  defineSeat2: (_: PersonConfig) => void;
}
const MyMap = ({ addMarkerMode, defineSeat2 }: myMapProps) => {
  const height = Math.min(window.visualViewport?.height as number, 1511);
  const width = height / (1511 / 1069);
  const bounds: L.LatLngBoundsExpression = [
    [0, 0],
    [height, width],
  ];

  return (
    <div>
      <MapContainer
        className="map"
        attributionControl={false}
        crs={CRS.Simple}
        bounds={bounds}
        style={{ height, width }}
        //   dragging={false}
        maxBounds={bounds}
      >
        <ImageOverlay bounds={bounds} url="/officepicture.png" />
        <LayerGroups></LayerGroups>
        <LeafLetAdminComponent
          addMarkerMode={addMarkerMode}
          defineSeat2={defineSeat2}
        />
      </MapContainer>
    </div>
  );
};
function LeafLetAdminComponent({ addMarkerMode, defineSeat2 }: myMapProps) {
  const [people, setPeople] = useRecoilState(peopleState);
  const [person, setPerson] = useRecoilState(personState);

  const map = useMapEvents({
    click: (e) => {
      if (!addMarkerMode) return;
      const { lat, lng } = e.latlng;
      const arraything = [lat, lng];
      setPerson((prevState) => {
        if (undefined === prevState) {
          return prevState;
        }
        return {
          ...prevState,
          markerCoords: [...prevState.markerCoords, arraything],
        };
      });
      setPeople((prevState) => {
        const data = [...prevState];
        const current = data.findIndex((entry) => entry.id === person?.id);
        const newData = {
          ...data[current],
          markerCoords: [...data[current].markerCoords, [lat, lng]],
          checkbox: true,
        };
        data[current] = newData;
        return data;
      });
    },
  });
  return null;
}

export default MyMap;
