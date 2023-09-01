"use client";
import { useEffect, useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import { useRouter } from "next/navigation";
function UpdatePage() {
  const { push } = useRouter();

  const [id, setID] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [team, setTeam] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("ID");
    if (id !== null) setID(Number.parseInt(id, 10));

    const name = localStorage.getItem("Name");
    if (name !== null) setName(name);

    const location = localStorage.getItem("Location");
    if (location !== null) setLocation(location);

    const team = localStorage.getItem("Team");
    if (team !== null) setTeam(team);

    const checkbox = localStorage.getItem("Checkbox Value");
    if (checkbox !== null) setCheckbox(Boolean(checkbox));
  }, []);

  const UpdateAPIData = () => {
    axios
      .put(`https://64ccd9752eafdcdc851a5daf.mockapi.io/SPData/${id}`, {
        name,
        location,
        team,
        checkbox,
      })
      .then(() => {
        push("/admin");
      });
  };
  return (
    <div>
      <h1>This is the Update Page</h1>
      <div>
        <Form className="create-form">
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Location</label>
            <input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Team</label>
            <input
              placeholder="Team"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
            />
          </Form.Field>

          <Form.Field>
            <Checkbox
              label="I agree to the Terms and Conditions"
              checked={checkbox}
              onChange={() => setCheckbox(!checkbox)}
            />
          </Form.Field>

          <Button type="submit" onClick={UpdateAPIData}>
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default UpdatePage;
