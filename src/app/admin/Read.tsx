"use client";
import { Button, Table } from "semantic-ui-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { PersonConfig } from "../../Classes/Interfaces";

export default function Read() {
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
  return (
    <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Location</Table.HeaderCell>
            <Table.HeaderCell>Team</Table.HeaderCell>
            <Table.HeaderCell>Checkbox</Table.HeaderCell>
            <Table.HeaderCell> Update</Table.HeaderCell>
            <Table.HeaderCell> Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data: PersonConfig) => {
            return (
              <Table.Row key={data.id}>
                <Table.Cell>{data.name}</Table.Cell>
                <Table.Cell>{data.location}</Table.Cell>
                <Table.Cell>{data.team}</Table.Cell>
                <Table.Cell>
                  {data.checkbox ? "Checked" : "Unchecked"}{" "}
                </Table.Cell>

                {/* UpdateFunktion */}

                <Table.Cell>
                  <Button onClick={() => setData(data)}>Update</Button>
                </Table.Cell>

                {/* Delete Funktion */}

                <Table.Cell>
                  <Button onClick={() => onDelete(data.id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
