"use client";
import React, { Component, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  useMapEvents,
  ImageOverlay,
  LayerGroup,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { CRS } from "leaflet";
import L from "leaflet";
import Image from "next/image";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { peopleState, personState } from "@/recoil/atoms";
import { memo } from "react";
import LayerGroups from "./LayerGroups";
const MyMap = ({ addMarkerMode, defineSeat }) => {
  const height = Math.min(window.visualViewport?.height as number, 1511);
  const width = height / (1511 / 1069);
  const bounds = [
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
          defineSeat={defineSeat}
        />
      </MapContainer>
    </div>
  );
};
function LeafLetAdminComponent({ addMarkerMode, defineSeat }) {
  const person = useRecoilValue(personState);
  const [people, setPeople] = useRecoilState(peopleState);
  const saveMarkers = (newMarkerCoords) => {
    const data = [...people];
    const current = data.findIndex((entry) => entry.id === person.id);
    const newData = {
      ...data[current],
      markerCoords: newMarkerCoords,
      checkbox: true,
    };

    data[current] = newData;
    setPeople(data);
  };
  const map = useMapEvents({
    click: (e) => {
      console.log(addMarkerMode);
      if (!addMarkerMode || !person) return;
      const { lat, lng } = e.latlng;
      // L.marker([lat, lng]).addTo(map);

      axios
        .put(
          `https://64ccd9752eafdcdc851a5daf.mockapi.io/SPData/${person.id}`,
          {
            ...person,
            markerCoords: [lat, lng],
            checkbox: true,
          }
        )

        .then((response) => {
          defineSeat();
          saveMarkers([lat, lng]);

          console.log(response.data);
          // data til response.data
        });
    },
  });
  return null;
}

export default MyMap;
