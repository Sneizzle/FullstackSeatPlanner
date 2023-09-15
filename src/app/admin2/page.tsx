"use client";
import { Fragment, useEffect, useState } from "react";
import "./admin2.css";
import { BsTools } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/Ai";
import { AiFillEdit } from "react-icons/Ai";
import { BsSpeedometer, BsFillPeopleFill } from "react-icons/bs";
import Read from "../admin/Read";
import axios from "axios";
import Modal from "./Modal";
import CreateModal from "./admin2create";
import { PersonConfig } from "./Interfaces";
import ReturnButton from "./returnButton";
import { useRouter } from "next/router";
import UpdateModal from "./admin2update";
import { TfiReload } from "react-icons/tfi";
import { useRecoilState } from "recoil";
import { peopleState } from "@/recoil/atoms";
type HandleUpdateFunction = () => void;
function Admin() {
  const [people, setPeople] = useRecoilState(peopleState);
  // const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const handleUpdate: HandleUpdateFunction = () => {
    getData();
  };

  const onDelete = (id: number) => {
    axios
      .delete(`https://64ccd9752eafdcdc851a5daf.mockapi.io/SPData/${id}`)
      .then(() => {
        getData();
      });
  };
  const getData = () => {
    axios
      .get(`https://64ccd9752eafdcdc851a5daf.mockapi.io/SPData/`)
      .then((getData) => {
        setPeople(getData.data);
      });
  };
  // // useEffect(() => {
  // Read({ onDataLoaded });
  // // }, []);

  return (
    <div className="content-container">
      <div className="dash-content">
        <div className="overview">
          <div className="title">
            <i className="fancylogo">
              <BsSpeedometer />
            </i>
            <span className="text">DashBoard</span>
          </div>
        </div>

        <div className="boxes">
          <ReturnButton />
          <CreateModal />

          <Modal handleUpdate={handleUpdate} />
        </div>
        <div className="activity">
          <div className="title">
            <i>
              <BsFillPeopleFill />
            </i>
            <div className="text">
              <div>Members Overview</div>
            </div>
          </div>
          <div className="activity-data">
            <div className="data names">
              <span className="data-title">Name</span>
              {people.map((data) => (
                <span className="data-list" key={data.id}>
                  {data.name}
                </span>
              ))}
            </div>
            <div className="data location">
              <span className="data-title">Location</span>
              {people.map((data) => (
                <span className="data-list" key={data.id}>
                  {data.location}
                </span>
              ))}
            </div>
            <div className="data team">
              <span className="data-title">Team</span>
              {people.map((data) => (
                <span className="data-list" key={data.id}>
                  {data.team}
                </span>
              ))}
            </div>
            <div className="data seated">
              <span className="data-title">Route?</span>
              {people.map((data) => (
                <span
                  className={`data-list ${
                    data.checkbox ? "data-list-no" : "data-list-yes"
                  }`}
                  key={data.id}
                >
                  {data.checkbox ? "✓" : "X"}
                </span>
              ))}
            </div>
            <div className="data update">
              <span className="data-title">Update Info</span>
              {people.map((data) => (
                <span className="data-list" key={data.id}>
                  <UpdateModal data={data} onUpdate={handleUpdate} />
                </span>
              ))}
            </div>
            <div className="data delete">
              <span className="data-title">Delete Profile </span>
              {people.map((data) => (
                <span className="data-list" key={data.id}>
                  <button
                    style={{ color: "red" }}
                    onClick={() => onDelete(data.id)}
                  >
                    Delete {data.name} ☒
                  </button>
                </span>
              ))}
            </div>
          </div>
          {/* <button
            onClick={handleUpdate}
            style={{
              display: "flex",
              alignItems: "center",
              color: "blue",
              position: "absolute",
              top: "450px",
              left: "1280px",
            }}
          >
            Refresh Data<TfiReload></TfiReload>
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Admin;
