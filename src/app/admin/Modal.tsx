"use client";
import React, { useState, useEffect } from "react";
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

export default function Modal() {
  const [person, setPerson] = useRecoilState(personState);
  const [people, setPeople] = useRecoilState(peopleState);
  const [modal, setModal] = useState(false);
  const [addMarkerMode, setAddMarkerMode] = useState(false);
  const [assignSeatMode, setAssignSeatMode] = useState(false);
  const toggleAssignSeatMode = () => {
    setAssignSeatMode((prevState) => !prevState);
  };
  const toggleAddMarkerMode = () => {
    setAddMarkerMode((prevState) => !prevState);
  };
  const defineSeat = (person: PersonConfig) => {
    toggleAssignSeatMode();
    toggleAddMarkerMode();
    setPerson(person);
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

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Edit Map <BsTools />
      </button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div className="mapcomp">
              {" "}
              <MyMap
                addMarkerMode={addMarkerMode}
                defineSeat={defineSeat}
              />{" "}
            </div>
            <div className="controls">
              <div className="button-container"></div>
            </div>
            <div className="table-container">
              <table className="marker-table">
                <thead>
                  <tr>
                    <th>Marker</th>
                    <th>Position</th>
                    <th>Actions</th>
                  </tr>
                </thead>
              </table>
              <div>
                <Table singleLine>
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
                            {person.checkbox && (
                              <button onClick={() => unassignSeat(person.id)}>
                                Remove Seat
                              </button>
                            )}
                          </Table.Cell>
                          <Table.Cell>
                            {person.markerCoords
                              .map((position) => position.toFixed(0))
                              .join(", ")}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
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
