"use client";
import LeafLetMapComponent from "@/app/Components/LeafLetMapComponent";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PersonConfig } from "../admin/Interface/Interfaces";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const isPerson = (person: unknown): person is PersonConfig[] => {
  return true;
};
const FindPerson = () => {
  const [personData, setPersonData] = useState<PersonConfig | null>(null);
  const [searched, setSearched] = useState<string | null>(null);
  //redirects user to frontpage
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 60000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    const searchedName = localStorage.getItem("searchedName");
    setSearched(searchedName);
  }, []);
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/Components/LeafLetMapComponent"), {
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
    <div>{personData && <Map coordinates={personData.markerCoords}></Map>}</div>
  );
};

export default FindPerson;
