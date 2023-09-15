"use client";

import axios from "axios";
import "./Home.css";
import Background from "./Background";
import SearchBar from "../Components/SearchBar";
import { useEffect, useState } from "react";
import { PersonConfig } from "./admin2/Interfaces";

function Home() {
  const [message, setMessage] = useState("");

  const [updated, setUpdated] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [APIData, setAPIData] = useState<PersonConfig[]>([]);

  const sendProps = () => {
    const trimmedMessage = message.trim();

    if (trimmedMessage === "") {
      setErrorMessage("Please enter a name");
    } else {
      const matchingItem = APIData.find((item) => item.name === trimmedMessage);
      if (matchingItem) {
        localStorage.setItem("searchedName", trimmedMessage);
        window.location.href = "/FindPerson";
      } else {
        setErrorMessage("Please enter a proper name");
      }
    }
  };

  useEffect(() => {
    axios
      .get(`https://64ccd9752eafdcdc851a5daf.mockapi.io/SPData`)
      .then((response) => {
        setAPIData(response.data);
      });
  }, []);

  return (
    <body>
      <div className="background-image">
        <Background></Background>
        <header>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </header>
        <section className="images-section"></section>
        <section className="bottom-section">
          <div className="input-container">
            <h1>Who are you looking for?</h1>
            <SearchBar
              data={APIData}
              onItemSelect={(item) => {
                localStorage.setItem("searchedName", item.name);
                window.location.href = "/FindPerson";
              }}
            />
            <button id="submit-icon" onClick={sendProps}>
              {/* ➢ */}
            </button>{" "}
          </div>
        </section>
      </div>
      <div className="admin-login">
        <a href="/admin2">Admin Login </a>
      </div>
    </body>
  );
}

export default Home;
