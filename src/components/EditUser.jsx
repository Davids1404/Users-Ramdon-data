import React, { useState } from "react";
import axios from "axios";

const EditUser = ({ editUser, user }) => {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    avatar: user.picture //API NO DEJA SUBIR FOTOS LAS BLOQUEA
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `https://reqres.in/api/users/${user.id}`,
        formData
      );
      editUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary mb-2"
        data-bs-toggle="modal"
        data-bs-target="#editUser"
      >
        Edit User
      </button>
      <div
        className="modal fade"
        id="editUser"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editModalLabel">
                Edit user
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
                    type="text"
                    className="form-control"
                    placeholder="Enter first name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-group input-group-sm mb-2">
                <span className="input-group-text">Surname</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter last name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-group input-group-sm mb-2">
                  <span className="input-group-text">@example.com</span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-group input-group-sm mb-2">
                  <input
                    type="file"
                    className="form-control"
                    value={formData.avatar}
                    onChange={handleInputChange}
                  />
                <button type="submit" className="btn btn-outline-success">
                  Update
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
