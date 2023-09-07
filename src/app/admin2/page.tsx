"use client";
import { Fragment, useEffect, useState } from "react";
import "../admin2/admin2.css";
import { BsTools } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/Ai";
import { AiFillEdit } from "react-icons/Ai";
import { BsSpeedometer, BsFillPeopleFill } from "react-icons/bs";
import Read from "../admin/Read";
import axios from "axios";
import Modal from "../admin/Modal";

function Admin() {
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://64ccd9752eafdcdc851a5daf.mockapi.io/SPData`)
      .then((response) => {
        setAPIData(response.data);
        console.log(response.data);
        // data til response.data
      });
  }, []);

  const setData = (data: PersonConfig) => {
    const { id, name, location, team, checkbox } = data;
    localStorage.setItem("ID", id.toString());
    localStorage.setItem("Name", name);
    localStorage.setItem("Location", location);
    if (team !== undefined) {
      localStorage.setItem("Team", team);
    }
    localStorage.setItem("Checkbox Value", checkbox.valueOf.toString());
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
        setAPIData(getData.data);
      });
  };
  // // useEffect(() => {
  // Read({ onDataLoaded });
  // // }, []);

  return (
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
        <div className="box box1">
          <i className="fancylogo">
            <AiOutlineHome />
          </i>
          <span className="text">Return to Frontpage</span>
          <span className="number">Home</span>
        </div>
        <div className="box box2">
          <i className="fancylogo">
            <BsTools />
          </i>
          <span className="text">Add a Person</span>
          <span className="number">Create</span>
        </div>
        <Modal></Modal>
      </div>
      <div className="activity">
        <div className="title">
          <i>
            <BsFillPeopleFill />
          </i>
          <span className="text">Recent Activity</span>
        </div>
        <div className="activity-data">
          <div className="data names">
            <span className="data-title">Name</span>
            {APIData.map((data) => (
              <span className="data-list" key={data.id}>
                {data.name}
              </span>
            ))}
          </div>
          <div className="data location">
            <span className="data-title">Location</span>
            {APIData.map((data) => (
              <span className="data-list" key={data.id}>
                {data.location}
              </span>
            ))}
          </div>
          <div className="data team">
            <span className="data-title">Team</span>
            {APIData.map((data) => (
              <span className="data-list" key={data.id}>
                {data.team}
              </span>
            ))}
          </div>
          <div className="data seated">
            <span className="data-title">Has a Seat?</span>
            {APIData.map((data) => (
              <span className="data-list" key={data.id}>
                {data.checkbox ? "yes" : "no"}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Admin;
