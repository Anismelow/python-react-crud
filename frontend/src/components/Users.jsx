import React, { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL;

function Users() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [editing, setEditing] = useState(false);

  const [id, setId] = useState("");

  const [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editing) {
      const res = await fetch(`${API}/users`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await res.json();
      console.log(data);
    } else {
      const res = await fetch(`${API}/users/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await res.json();
      console.log(data);
      setEditing(false)
      setId("")
    }

    await getUsers();

    setname("");
    setEmail("");
    setPassword("");
  };

  // mostrar usuarios

  const getUsers = async () => {
    const res = await fetch(`${API}/users`);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  // eliminar usuarios

  const deleteUser = async (id) => {
    const userResponse = window.confirm("Estas seguro de querer eliminarlo ");
    if (userResponse == true) {
      const res = await fetch(`${API}/users/${id}`, {
        method: "DELETE",
      });
      await getUsers();
    }
  };

  //editar usuarios
  const editUser = async (id) => {
    const res = await fetch(`${API}/user/${id}`);
    const data = await res.json();

    setEditing(true);
    setId(id);

    setname(data.name);
    setEmail(data.email);
    setPassword(data.password);
  };

  return (
    <div
      className="d-flex justify-content-evenly col-12"
      style={{
        margin: "10rem 0",
        border: "2px solid black",
        borderRadius: "10px",
        padding: "10rem",
      }}
    >
      <div className="col-3 me-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group  ">
            <input
              type="text"
              placeholder="nombre de usuario"
              value={name}
              className="form-control mt-2"
              autoFocus
              onChange={(e) => setname(e.target.value)}
            />
            <input
              type="email"
              placeholder="email"
              value={email}
              className="form-control mt-2"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="contraseña"
              value={password}
              className="form-control mt-2"
              autoFocus
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary mt-2">{editing ? 'update' : 'create' }</button>
        </form>
      </div>

      <div className="col">
        <table className="table table-striped ">
          <thead>
            <tr className="">
              <th>nombre</th>
              <th>email</th>
              <th>password</th>
              <th>operations</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, id) => (
              <tr key={id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <button
                    onClick={() => editUser(user._id)}
                    className="btn text-bg-secondary"
                   > edit
                  </button>

                  <button
                    className="btn text-bg-danger"
                    onClick={() => deleteUser(user._id)}
                  >
                    {" "}
                    eliminar{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
