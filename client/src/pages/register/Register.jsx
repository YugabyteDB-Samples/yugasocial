import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);
  const { currentUser, setCurrentUser} = useContext(AuthContext)

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate()

  useEffect(() => {
    if(currentUser) navigate("/")
  }, [currentUser])

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await makeRequest.post("/auth/register", inputs);
      setCurrentUser(res.data);
    } catch (err) {
      setErr(JSON.stringify(err.response.data));
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>YugaSocial.</h1>
          <p>
            Distribute the Love.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <button onClick={handleClick}>Register</button>
            <div style={{maxWidth: "300px",overflowWrap: "break-word"}}>{err && err}</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
