"use client";
import LeafLetMapComponent from "@/Components/LeafLetMapComponent";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PersonConfig } from "../admin2/Interfaces";
import { useMemo } from "react";
import dynamic from "next/dynamic";
const isPerson = (person: unknown): person is PersonConfig[] => {
  return true;
};

const FindPerson = () => {
  const [personData, setPersonData] = useState<PersonConfig | null>(null);
  const [searched, setSearched] = useState<string | null>(null);

  useEffect(() => {
    const searchedName = localStorage.getItem("searchedName");
    setSearched(searchedName);
  }, []);

  const Map = useMemo(
    () =>
      dynamic(() => import("@/Components/LeafLetMapComponent"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  useEffect(() => {
    if (null === searched) {
      return;
    }
    axios
      .get(`https://64ccd9752eafdcdc851a5daf.mockapi.io/SPData`)
      .then((response) => {
        if (isPerson(response.data)) {
          const matchingPerson = response.data.find(
            (person) => person.name === searched
          );

          if (matchingPerson) {
            // If the person is found, set their data in the state
            setPersonData(matchingPerson);
          }
        }
      });
  }, [searched]);

  return (
    <div>
      {/* <p>You searched for: {searchedName}</p>
      {personData && (
        <div>
          <p>Marker Coordinates:</p>
          <ul>
            {personData.markerCoords.map((coords, index) => (
              <li key={index}>
                Coord {index + 1}: [{coords.join(", ")}]
              </li>
            ))}
          </ul>
        </div>
      )} */}
      {personData && <Map coordinates={personData.markerCoords}></Map>}
    </div>
  );
};

export default FindPerson;
