"use client";
import axios from "axios";
import React, { useState } from "react";
import { BsTools } from "react-icons/bs";
import "../Styles/modalcreate.css";
import { GlobalApiUrl, GlobalFirstMarker } from "@/app/Components/Helperman";

export default function CreateModal() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [team, setTeam] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const postData = () => {
    axios
      .post(GlobalApiUrl, {
        name,
        location,
        team,
        checkbox,
        markerCoords: [GlobalFirstMarker],
      })
      .then(() => {
        window.location.reload();
      });
  };
  return (
    <>
      <button onClick={toggleModal} className="box box2">
        <i className="fancylogo">
          <BsTools />
        </i>
        <span className="text">Define a Person</span>
        <span className="number">Create</span>
      </button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="createmodal-content">
            <button className="close-modal-2" onClick={toggleModal}>
              Close Window
            </button>
            <div className="create-form">
              <label></label>
              <input
                className="placeholdingcolor"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label></label>
              <input
                className="placeholdingcolor"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <label></label>
              <input
                className="placeholdingcolor"
                placeholder="Team"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
              />
              <button
                className="button-primary"
                onClick={postData}
                type="button"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
