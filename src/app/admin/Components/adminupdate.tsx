"use client";
import axios from "axios";
import "../Styles/modalcreate.css";
import { useEffect, useState } from "react";
import { HandleUpdateFunction, PersonConfig } from "../Interface/Interfaces";
import { GlobalApiUrlWithId } from "@/app/Components/Helperman";
interface propsUpdateModal {
  data: PersonConfig;
  onUpdate: HandleUpdateFunction;
}
export default function UpdateModal({ data, onUpdate }: propsUpdateModal) {
  const [modal, setModal] = useState(false);

  // Corrected toggle function name
  const toggleupdateModal = () => {
    setModal(!modal);
  };
  const [id, setID] = useState<number>(data.id);
  const [name, setName] = useState(data.name || "");
  const [location, setLocation] = useState(data.location || "");
  const [team, setTeam] = useState(data.team || "");
  const [checkbox, setCheckbox] = useState(false);

  const UpdateAPIData = () => {
    axios
      .put(GlobalApiUrlWithId(id), {
        ...data,
        name,
        location,
        team,
      })
      .then(() => {
        onUpdate();
        toggleupdateModal();
      });
  };
  return (
    <>
      <button style={{ color: "green" }} onClick={toggleupdateModal}>
        {" "}
        Edit{" "}
        {data.name.length > 12 ? data.name.substring(0, 12) + "..." : data.name}
      </button>
      {modal && (
        <div className={`modal ${modal ? "active" : ""}`}>
          <div onClick={toggleupdateModal} className="overlay"></div>
          <div className="createmodal-content">
            <button className="close-modal-2" onClick={toggleupdateModal}>
              Close Window
            </button>
            <div className="create-form">
              <label></label>
              <input
                className="placeholdingcolor"
                placeholder={data.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label></label>
              <input
                className="placeholdingcolor"
                placeholder={data.location}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <label></label>
              <input
                className="placeholdingcolor"
                placeholder={data.team}
                value={team}
                onChange={(e) => setTeam(e.target.value)}
              />
              <button
                onClick={UpdateAPIData}
                className="button-primary"
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
