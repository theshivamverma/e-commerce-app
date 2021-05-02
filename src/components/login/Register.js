import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth"

export default function Register() {
  const [name, setName] = useState("")    
  const [email, setEmail] = useState("")    
  const [username, setUsername] = useState("")    
  const [password, setPassword] = useState("")    
  const { login, registerUser } = useAuth()
  const navigate = useNavigate()
     
  login && navigate("/")

  return (
    <div className="login-container centered box-shadow-down p-2-1 border-round">
      <h1 className="font-size-l medium center">Store user registration</h1>
      <label className="inputgroup">
        <input className="input-textbox focus-blue" placeholder=" "  onChange={(e) => setName(e.target.value)} />
        <span className="input-label">Name</span>
      </label>
      <label className="inputgroup">
        <input className="input-textbox focus-blue" placeholder=" "  onChange={(e) => setEmail(e.target.value)} />
        <span className="input-label">Email</span>
      </label>
      <label className="inputgroup">
        <input className="input-textbox focus-blue" placeholder=" " onChange={(e) => setUsername(e.target.value)} />
        <span className="input-label">Username</span>
      </label>
      <label className="inputgroup">
        <input type="password" className="input-textbox focus-blue" placeholder=" " onChange={(e) => setPassword(e.target.value)} />
        <span className="input-label">Password</span>
      </label>
      <button className="btn btn-col btn-primary border-round btn-block" onClick={() => registerUser(name, email, username, password)}>
        Register
      </button>
      <p className="mt-1 center">
        Existing user then{" "}
        <Link to="/login">
          <span className="underline">Login</span>
        </Link>
      </p>
    </div>
  );
}
