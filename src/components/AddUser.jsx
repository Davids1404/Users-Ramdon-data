import React, { useState } from "react";
import "../styles/AddUser.css";

const AddUser = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = "https://reqres.in/api/users";
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, surname, email, picture }),
      });
      const newUser = {
        id: props.id,
        first_name: name,
        last_name: surname,
        email,
        avatar: picture, //API NO DEJA SUBIR FOTOS LAS BLOQUEA
      };
      props.addUser(newUser);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addUser"
      >
        Add User
      </button>
      <div
        className="modal fade"
        id="addUser"
        tabIndex="-1"
        aria-labelledby="addModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addModalLabel">
                Add new user
              </h1>
              <button
                type="button"
                className="btn-close btn btn-outline-secondary"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="input-group input-group-sm mb-2">
                  <span className="input-group-text">Name</span>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="insert name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="input-group input-group-sm mb-2">
                  <span className="input-group-text">Surname</span>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="insert surname"
                    value={surname}
                    onChange={(event) => setSurname(event.target.value)}
                  />
                </div>
                <div className="input-group input-group-sm mb-2">
                  <span className="input-group-text">@example.com</span>
                  <input
                    className="form-control"
                    type="email"
                    placeholder=" insert email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="input-group input-group-sm mb-2">
                  <input
                    type="file"
                    className="form-control"
                    value={picture}
                    onChange={(event) => setPicture(event.target.value)}
                  />
                </div>
                <button className="btn btn-outline-success" type="submit">
                  Add User
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
