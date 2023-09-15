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
import "./map.css";
import { PersonConfig } from "./Interfaces";
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
