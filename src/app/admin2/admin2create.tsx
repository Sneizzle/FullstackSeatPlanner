"use client";
import axios from "axios";
import React, { useState } from "react"; // Import React
import { BsTools } from "react-icons/bs";

import "./modalcreate.css";
import { Dialog, Transition } from "@headlessui/react";
export default function CreateModal() {
  const [modal, setModal] = useState(false);

  // Corrected toggle function name
  const toggleModal = () => {
    setModal(!modal);
  };

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [team, setTeam] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const postData = () => {
    axios
      .post("https://64ccd9752eafdcdc851a5daf.mockapi.io/SPData", {
        name,
        location,
        team,
        checkbox,
        markerCoords: [],
      })
      .then(() => {
        window.location.reload();
        // navigation("/admin");
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
        <div className={`modal ${modal ? "active" : ""}`}>
          <div onClick={toggleModal} className="overlay"></div>
          <div className="createmodal-content">
            <button className="close-modal" onClick={toggleModal}>
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
