"use client";
import "./Admin.css";
import Modal from "./Modal";
import Create from "./Create";
import Read from "./Read";
// import { Button } from "semantic-ui-react";

function Admin() {
  return (
    <div className="admin-container">
      <h2 className="main-header">
        Admin Operations <Modal ssr={false} />
      </h2>
      <div className="left-component">
        <div>
          <h2>Create Component</h2>
          <div>
            <Create> </Create>
          </div>
        </div>
      </div>
      <div className="right-component">
        <div>
          <h2>Read Component</h2>
          <div>
            <Read></Read>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Admin;
