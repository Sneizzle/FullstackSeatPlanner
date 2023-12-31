"use client";
import { Fragment, useState } from "react";
import "./Styles/Modal.css";
// import MyMap from "./MyMap";
import { peopleState, personState } from "@/recoil/atoms";
import axios from "axios";
import { AiFillEdit } from "react-icons/Ai";
import { useRecoilState } from "recoil";
import { PersonConfig } from "./Interface/Interfaces";
import MyMap from "./MyMap";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import {
  GlobalApiUrl,
  GlobalApiUrlWithId,
  GlobalFirstMarker,
} from "../Components/Helperman";
interface ModalProps {
  handleUpdate: () => void; // Specify the type for handleUpdate
}

export default function Modal({ handleUpdate }: ModalProps) {
  const [person, setPerson] = useRecoilState(personState);
  const [people, setPeople] = useRecoilState(peopleState);
  const [modal, setModal] = useState(false);
  const [addMarkerMode, setAddMarkerMode] = useState(false);

  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/admin/MyMap"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  const toggleAddMarkerMode = () => {
    setAddMarkerMode((prevState) => !prevState);
  };

  const IsButtonDisabled = (listPerson: PersonConfig) => {
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
    if (undefined === person || person.markercoords.length < 2) {
      toggleAddMarkerMode();
      setPerson(undefined);
      return;
    }
    axios
      .put(GlobalApiUrlWithId(person.id), {
        ...person,
        checkbox: true,
      })
      .then(() => {
        axios.get(GlobalApiUrl).then((getData) => {
          setPeople(getData.data);
        });
      });
    toggleAddMarkerMode();
    setPerson(undefined);
  };
  const unassignSeat = (person: PersonConfig) => {
    axios
      .put(GlobalApiUrlWithId(person.id), {
        ...person,
        markercoords: [GlobalFirstMarker],
        checkbox: false,
      })
      .then(() => {
        axios.get(GlobalApiUrl).then((getData) => {
          setPeople(getData.data);
        });
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
                <Map
                  addMarkerMode={addMarkerMode}
                  defineSeat2={defineSeat2}
                />{" "}
              </div>
              <div className="controls">
                <div className="button-container"></div>
                <div className="table-container">
                  <div className="grid">
                    <span>Name</span>

                    <span>Seat</span>
                    <span>Actions</span>

                    {people.map((person) => {
                      return (
                        <Fragment key={person.id}>
                          <span>{person.name}</span>
                          <span>
                            {person.checkbox ? "Assigned" : "Unknown"}
                          </span>
                          <span>
                            {IsActiveButton(person) ? (
                              <button
                                className="saveButton"
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
                                <span>Draw</span>
                                <i className="fancyLogo">
                                  <AiFillEdit />{" "}
                                </i>
                              </button>
                            )}
                            {person.checkbox && !addMarkerMode && (
                              <button
                                className="action-button-delete"
                                onClick={() => unassignSeat(person)}
                              >
                                Delete Route
                              </button>
                            )}
                          </span>
                        </Fragment>
                      );
                    })}
                  </div>
                </div>{" "}
              </div>
              <button className="close-modal" onClick={toggleModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
