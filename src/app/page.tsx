"use client";

import axios from "axios";
import "./Home.css";
import Background from "./Background";
import SearchBar from "../Components/SearchBar";
import { useEffect, useState } from "react";
import { PersonConfig } from "./admin/Interfaces";

function Home() {
  const [message, setMessage] = useState("");

  const [updated, setUpdated] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const [APIData, setAPIData] = useState<PersonConfig[]>([]);

  const sendProps = () => {
    localStorage.setItem("searchedName", message);

    window.location.href = "/FindPerson";
  };

  useEffect(() => {
    axios
      .get(`https://64ccd9752eafdcdc851a5daf.mockapi.io/SPData`)
      .then((response) => {
        setAPIData(response.data);
        console.log(response.data);
        // data til response.data
      });
  }, []);

  return (
    <body>
      <div className="background-image">
        <Background></Background>
        <header>
          <h1>Who are you looking for?</h1>
        </header>
        <section className="images-section"></section>
        <section className="bottom-section">
          <div className="input-container">
            <SearchBar
              data={APIData}
              onItemSelect={(item) => {
                localStorage.setItem("searchedName", item.name);
                window.location.href = "/FindPerson";
              }}
            />
            <button id="submit-icon">➢</button>{" "}
          </div>

          {/* <div className="input-container">
            <input
              type="text"
              placeholder="Search by name"
              onChange={handleChange}
              value={message}
            />
            <button id="submit-icon" onClick={sendProps}>
              ➢
            </button>
          </div>
           */}
        </section>
      </div>
      <div className="admin-login">
        <a href="/admin">Admin Login</a>
      </div>
    </body>
  );
}

export default Home;
