"use client";
import React, { useState, useEffect, Fragment } from "react";
import "./Modal.css";
import { BsTools } from "react-icons/bs";
// import MyMap from "./MyMap";
import { Button, Table } from "semantic-ui-react";
import Read from "./Read";
import axios from "axios";
import { peopleState, personState } from "@/recoil/atoms";
import { useRecoilState } from "recoil";
import { PersonConfig } from "./Interfaces";
import MyMap from "./MyMap";
import { AiFillEdit } from "react-icons/Ai";

export default function Modal() {
  const [person, setPerson] = useRecoilState(personState);
  const [people, setPeople] = useRecoilState(peopleState);
  const [modal, setModal] = useState(false);
  const [addMarkerMode, setAddMarkerMode] = useState(false);

  const toggleAddMarkerMode = () => {
    setAddMarkerMode((prevState) => !prevState);
  };

  const IsButtonDisabled = (listPerson) => {
    console.log(person?.id, "tekst til og finde den");
    return person?.id !== undefined && listPerson.id !== person?.id;
  };

  const defineSeat = (person: PersonConfig) => {
    toggleAddMarkerMode();
    setPerson(person);
  };
  const defineSeat2 = (person: PersonConfig) => {
    setPerson(person);
  };

  const IsActiveButton = (listPerson) => {
    return addMarkerMode && listPerson.id === person.id;
  };

  const SaveRoute = () => {
    axios.put(
      `https://64ccd9752eafdcdc851a5daf.mockapi.io/SPData/${person.id}`,
      {
        ...person,
        checkbox: true,
      }
    );
    toggleAddMarkerMode();
    setPerson({});
  };

  const unassignSeat = (id) => {
    axios
      .put(`https://64ccd9752eafdcdc851a5daf.mockapi.io/SPData/${id}`, {
        markerCoords: [],
        checkbox: false,
      })
      .then((response) => {
        setPeople((prevState) => {
          const index = prevState.findIndex((data) => data.id === id);
          const newState = [...prevState];
          newState[index] = response.data;
          return newState;
        });
        setPerson({});
        console.log(response.data);
      });
  };
  useEffect(() => {
    axios
      .get(`https://64ccd9752eafdcdc851a5daf.mockapi.io/SPData`)
      .then((response) => {
        setPeople(response.data);
        console.log(response.data);
      });
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };

  const ToggleRoute = () => {
    console.log("filer route here");
  };

  return (
    <>
      <button onClick={toggleModal} className="box box3">
        <i className="fancylogo">
          <AiFillEdit />
        </i>
        <span className="text">Define a Route</span>
        <span className="number">Draw</span>
      </button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div className="mapcomp">
              {" "}
              <MyMap
                addMarkerMode={addMarkerMode}
                defineSeat2={defineSeat2}
              />{" "}
            </div>
            <div className="controls">
              <div className="button-container"></div>
            </div>
            <div className="table-container">
              {/* <table className="marker-table">
                <thead>
                  <tr>
                    <th>Marker</th>
                    <th>Position</th>
                    <th>Actions</th>
                  </tr>
                </thead>
              </table> */}
              <div className="grid">
                <span>Name</span>
                <span>Team</span>
                <span>Seat</span>
                <span>Actions</span>
                <span>Marker Position</span>
                {people.map((person) => {
                  return (
                    <Fragment key={person.id}>
                      <span>{person.name}</span>
                      <span>{person.team}</span>
                      <span>{person.checkbox ? "Assigned" : "Unknown"}</span>
                      <span>
                        {/* toggle drawing mode button */}

                        {IsActiveButton(person) ? (
                          <button className="save-button" onClick={SaveRoute}>
                            Save Button
                          </button>
                        ) : (
                          <button
                            onClick={() => defineSeat(person)}
                            disabled={IsButtonDisabled(person)}
                          >
                            Create Button{" "}
                          </button>
                        )}

                        {/* remove seat button */}
                        {person.checkbox && (
                          <button
                            onClick={() => unassignSeat(person.id)}
                            disabled={IsButtonDisabled(person)}
                          >
                            Delete Route
                          </button>
                        )}
                      </span>
                      <span>
                        {person.markerCoords?.map((positions) => {
                          return positions
                            .map((position) => position.toFixed(0))
                            .join(", ");
                        })}
                      </span>
                    </Fragment>
                  );
                })}

                {/* <Table singleLine>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Team</Table.HeaderCell>
                      <Table.HeaderCell>Seated</Table.HeaderCell>
                      <Table.HeaderCell> Actions</Table.HeaderCell>
                      <Table.HeaderCell> Marker Position</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {people.map((person) => {
                      return (
                        <Table.Row key={person.id}>
                          <Table.Cell>{person.name}</Table.Cell>
                          <Table.Cell>{person.team}</Table.Cell>
                          <Table.Cell>
                            {person.checkbox ? (
                              "Assigned"
                            ) : (
                              <button onClick={() => defineSeat(person)}>
                                {assignSeatMode
                                  ? "Place a Marker"
                                  : "Unassigned"}
                              </button>
                            )}
                          </Table.Cell>
                          <Table.Cell>
                            <button> Show Person Route</button>
                            {person.checkbox && (
                              <button onClick={() => unassignSeat(person.id)}>
                                Remove Seat
                              </button>
                            )}
                          </Table.Cell>
                          <Table.Cell>
                            {person.markerCoords?.map((positions) =>
                              positions
                                .map((position) => position.toFixed(0))
                                .join(", ")
                            )}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table> */}
              </div>
            </div>
            <button className="close-modal" onClick={toggleModal}>
              Close Window
            </button>
          </div>
        </div>
      )}
    </>
  );
}
