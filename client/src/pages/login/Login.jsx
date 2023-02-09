import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login, currentUser } = useContext(AuthContext);

  useEffect(()=> {
    if(currentUser) { 
      navigate("/", {replace: true});
    }
  }, [currentUser])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
    } catch (err) {
      setErr(err?.message);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>YugaSocial.</h1>
          <p>
            Manual Sharding Sucks.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
