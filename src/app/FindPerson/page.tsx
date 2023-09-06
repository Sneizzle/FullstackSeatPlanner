"use client";
import LeafLetMapComponent from "@/Components/LeafLetMapComponent";
import axios from "axios";
import React, { useEffect, useState } from "react";

const FindPerson = () => {
  const searchedName = localStorage.getItem("searchedName");
  const [personData, setPersonData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://64ccd9752eafdcdc851a5daf.mockapi.io/SPData`)
      .then((response) => {
        const matchingPerson = response.data.find(
          (person) => person.name === searchedName
        );

        if (matchingPerson) {
          // If the person is found, set their data in the state
          setPersonData(matchingPerson);
        }
      });
  }, [searchedName]);

  return (
    <div>
      <p>You searched for: {searchedName}</p>
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
      )}
      {personData && (
        <LeafLetMapComponent
          coordinates={personData.markerCoords}
        ></LeafLetMapComponent>
      )}
    </div>
  );
};

export default FindPerson;
