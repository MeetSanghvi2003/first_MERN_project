import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../state/hooks";
import { userRegister } from "../../state/UserSlice";
interface register {
  name: string;
  email: string;
  password: string;
}
const Register: FC = () => {
  const [data, setData] = useState<register>({
    name: "",
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const submit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (data.email && data.name) {
      if (data.password.length < 8) {
        return;
      } else {
        setLoader(true);
        setData({ ...data, email: "", password: "", name: "" });
        setTimeout(() => {
          dispatch(userRegister(data));
          setLoader(false);
        }, 3000);
      }
    }
  };

  return (
    <>
      <div className="form-container center">
        <div className="form-content">
          <div className="heading">Registration</div>
          <form onSubmit={submit}>
            <div className="inp-container">
              <input
                type="text"
                placeholder="Name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            <div className="inp-container">
              <input
                type="text"
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
            Already have an Account?<Link to="/">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
