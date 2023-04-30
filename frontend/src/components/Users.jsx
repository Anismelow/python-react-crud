import React, { useState } from "react";
import axios from "axios";


// const API = process.env.URI_URL

function Users() {
  const [userName, setUsername] = useState("");
  const [site, setSite] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.post()
  }; 
// console.log(API)
  return (
  
      <div className="row  " >
        <div className="col-md-4 border">
          <form onSubmit={handleSubmit}>
            <div className="form-group  ">
              <input
                type="text"
                placeholder="sitio web"
                value={site}
                className="form-control mt-2"
                autoFocus
                onChange={e => setSite(e.target.value)}
              />
              <input
                type="text"
                placeholder="nombre de usuario"
                value={userName}
                className="form-control mt-2"
                autoFocus
                onChange={e => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="email"
                value={email}
                className="form-control mt-2"
                autoFocus
                onChange={e => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="contraseña"
                value={password}
                className="form-control mt-2"
                autoFocus
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-primary mt-2">Create</button>
          </form>
        </div>
        <div className="col-md-8"></div>
      </div>
   
  );
}

export default Users;
