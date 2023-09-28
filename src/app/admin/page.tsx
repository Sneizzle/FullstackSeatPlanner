"use client";
import { useEffect } from "react";
import { BsFillPeopleFill, BsSpeedometer } from "react-icons/bs";
import "../admin/Styles/admin.css";
import { peopleState } from "@/recoil/atoms";
import axios from "axios";
import { useRecoilState } from "recoil";
import { HandleUpdateFunction } from "./Interface/Interfaces";
import Modal from "./Modal";
import CreateModal from "./Components/admincreate";
import UpdateModal from "./Components/adminupdate";
import ReturnButton from "./returnButton";
import { GlobalApiUrl, GlobalApiUrlWithId } from "../Components/Helperman";

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
    axios.delete(GlobalApiUrlWithId(id)).then(() => {
      getData();
    });
  };
  const getData = () => {
    axios.get(GlobalApiUrl).then((getData) => {
      setPeople(getData.data);
    });
  };

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
                  {data.name.length > 12
                    ? data.name.substring(0, 12) + "..."
                    : data.name}
                </span>
              ))}
            </div>
            <div className="data location">
              <span className="data-title">Location</span>
              {people.map((data) => (
                <span className="data-list" key={data.id}>
                  {data.location.length > 12
                    ? data.location.substring(0, 12) + "..."
                    : data.location}
                </span>
              ))}
            </div>
            <div className="data team">
              <span className="data-title">Team</span>
              {people.map((data) => (
                <span className="data-list" key={data.id}>
                  {data.team !== undefined && data.team.length > 12
                    ? data.team.substring(0, 12) + "..."
                    : data.team}
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
                    Delete {data.id}
                    {data.name.length > 12
                      ? data.name.substring(0, 12) + "..."
                      : data.name}{" "}
                    ☒
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
