import React, { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface login {
  email: string;
  password: string;
}

const Login: FC = () => {
  const [data, setData] = useState<login>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [loader, setLoader] = useState<boolean>(false);

  const Post = (data: Object) => {
    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((resp) => {
      if (resp.status !== 200) {
        return;
      } else {
        navigate("/home");
        resp.json().then((result) => {
          localStorage.setItem("token", result.auth.token);
        });
      }
    });
  };

  const submit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (data.email) {
      if (data.password.length < 8) {
        return;
      } else {
        setLoader(true);
        setData({ ...data, email: "", password: "" });
        setTimeout(() => {
          Post(data);
          setLoader(false);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  });

  return (
    <>
      <div className="form-container center">
        <div className="form-content">
          <div className="heading">Login</div>
          <form onSubmit={submit}>
            <div className="inp-container">
              <input
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div className="inp-container">
              <input
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <div className="inp-container submit">
              <button>
                {loader ? <div className="button-loader"></div> : "Submit"}
              </button>
            </div>
          </form>
          <div className="linkTo">
            Don't have an Account?<Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
