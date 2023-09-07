"use client";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { useState } from "react";
import axios from "axios";

// import { useNavigate } from "react-router";

export default function Create() {
  // let history = useHistory();
  // const navigation = useNavigate();

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
    <div>
      <Form className="create-form">
        <Form.Field>
          <label>Name</label>
          <input
            className="placeholdingcolor"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Location</label>
          <input
            className="placeholdingcolor"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Team</label>
          <input
            className="placeholdingcolor"
            placeholder="Team"
            onChange={(e) => setTeam(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <Checkbox
            label="This checkbox needs to be removed"
            onChange={() => setCheckbox(!checkbox)}
          />
        </Form.Field>

        <Button onClick={postData} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
