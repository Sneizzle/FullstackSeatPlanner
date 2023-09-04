"use client";

import axios from "axios";
import "./Home.css";
import Background from "./Background";
import SearchBar from "../Components/SearchBar";
import { useEffect, useState } from "react";
import { PersonConfig } from "./admin/Interfaces";

function Home() {
  // const inputElement = document.querySelector("input");

  const [message, setMessage] = useState("");

  const [updated, setUpdated] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // 👇 Get input value
      setUpdated(message);
    }
  };

  const FindPerson = (person) => {
    console.log("hey");
  };

  const [APIData, setAPIData] = useState<PersonConfig[]>([]);
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
            <SearchBar data={APIData}></SearchBar>
            <button onClick={FindPerson} id="submit-icon">
              ➢
            </button>
          </div>
        </section>
      </div>
      <div className="admin-login">
        <a href="/admin">Admin Login</a>
      </div>
    </body>
  );
}

export default Home;
