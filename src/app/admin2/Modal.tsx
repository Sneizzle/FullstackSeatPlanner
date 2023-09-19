"use client";
import { Fragment, useState } from "react";
import "./Modal.css";
// import MyMap from "./MyMap";
import { peopleState, personState } from "@/recoil/atoms";
import axios from "axios";
import { AiFillEdit } from "react-icons/Ai";
import { useRecoilState } from "recoil";
import { PersonConfig } from "./Interfaces";
import MyMap from "./MyMap";
interface ModalProps {
  handleUpdate: () => void; // Specify the type for handleUpdate
}

export default function Modal({ handleUpdate }: ModalProps) {
  const [person, setPerson] = useRecoilState(personState);
  const [people, setPeople] = useRecoilState(peopleState);
  const [modal, setModal] = useState(false);
  const [addMarkerMode, setAddMarkerMode] = useState(false);

  const toggleAddMarkerMode = () => {
    setAddMarkerMode((prevState) => !prevState);
  };

  const IsButtonDisabled = (listPerson: PersonConfig) => {
    // console.log(person?.id, "tekst til og finde den");
    return person?.id !== undefined && listPerson.id !== person?.id;
  };

  const defineSeat = (person: PersonConfig) => {
    toggleAddMarkerMode();
    setPerson(person);
  };
  const defineSeat2 = (person: PersonConfig) => {
    setPerson(person);
  };

  const IsActiveButton = (listPerson: PersonConfig) => {
    return addMarkerMode && listPerson.id === person?.id;
  };

  const SaveRoute = () => {
    axios.put(
      `https://64ccd9752eafdcdc851a5daf.mockapi.io/SPData/${person?.id}`,
      {
        ...person,
        checkbox: true,
      }
    );
    toggleAddMarkerMode();
    setPerson(undefined);
  };

  const unassignSeat = (id: number) => {
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
        // const initialPerson:PersonConfig = {
        //   markerCoords: [[]],
        //   id: 0,
        //   location: "",
        //   team: "",
        //   name: "",
        //   checkbox: false,
        // };
        setPerson(undefined);
      });
  };

  const toggleModal = () => {
    setModal(!modal);

    handleUpdate();
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
        <div className="ipad-fit">
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
                <div className="table-container">
                  <div className="grid">
                    <span>Name</span>
                    {/* <span>Team</span> */}
                    <span>Seat</span>
                    <span>Actions</span>
                    {/* <span>Marker Position</span> */}
                    {people.map((person) => {
                      return (
                        <Fragment key={person.id}>
                          <span>{person.name}</span>
                          {/* <span>{person.team}</span> */}
                          <span>
                            {person.checkbox ? "Assigned" : "Unknown"}
                          </span>
                          <span>
                            {/* toggle drawing mode button */}

                            {IsActiveButton(person) ? (
                              <button
                                className="action-button"
                                onClick={SaveRoute}
                              >
                                Save Button
                              </button>
                            ) : (
                              <button
                                className="action-button"
                                onClick={() => defineSeat(person)}
                                disabled={IsButtonDisabled(person)}
                              >
                                Define Route{" "}
                              </button>
                            )}

                            {/* remove seat button */}
                            {person.checkbox && (
                              <button
                                className="action-button"
                                onClick={() => unassignSeat(person.id)}
                                disabled={IsButtonDisabled(person)}
                              >
                                Delete Route
                              </button>
                            )}
                          </span>
                          {/* note the marker position in table */}
                          {/* <span>
                            {person.markerCoords?.map((positions) => {
                              return positions
                                .map((position) => position.toFixed(0))
                                .join(", ");
                            })}
                          </span> */}
                        </Fragment>
                      );
                    })}
                  </div>
                </div>{" "}
              </div>
              <button className="close-modal" onClick={toggleModal}>
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
