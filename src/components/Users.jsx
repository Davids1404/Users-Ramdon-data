import React, { useEffect, useState } from "react";
import AddUser from "./AddUser";
import EditUser from "./EditUser";



const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const FetchUsers = async () => {
    try {
      const url = "https://reqres.in/api/users?page=2";
      const response = await fetch(url);
      const { data } = await response.json();
      const results = data;
      setUsers(results);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const editUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const removeUsers = (id) => {
    const tempUsers = users.filter((user) => user.id !== id);
    setUsers(tempUsers);
  };

  let FilteredUsers = [];
  if (!search) {
    FilteredUsers = users;
  } else {
    FilteredUsers = users.filter((user) =>
      user.first_name.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    FetchUsers();
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      <div className="input-group input-group-sm  mb-3">
        <span className="input-group-text">
          <i className="bi bi-search"></i>
        </span>
        <input
          className="form-control"
          type="text"
          value={search}
          onChange={handleInputChange}
        />
      </div>

      <div>
        {FilteredUsers.map((user) => (
          <table className="table table-bordered border-primary" key={user.id}>
            <thead>
              <tr key={user.id}>
                <th className="table-primary border-primary">Name</th>
                <th className="table-primary border-primary">Surname</th>
                <th className="table-primary border-primary">Email</th>
                <th className="table-primary border-primary">Picture</th>
                <th className="table-primary border-primary">Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table-secondary border-secondary">
                  {user.first_name}
                </td>
                <td className="table-secondary border-secondary">
                  {user.last_name}
                </td>
                <td className="table-secondary border-secondary">
                  {user.email}
                </td>
                <td className="table-secondary border-secondary">
                  <img src={user.avatar} alt="images" />
                </td>
                <td className="table-secondary border-secondary">
                    <EditUser editUser={editUser} user={user} />
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => removeUsers(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
      <AddUser addUser={addUser}></AddUser>
    </div>
  );
};

export default Users;
