import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar: FC = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    setLoader(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      setLoader(false);
      navigate("/");
    }, 2000);
  };
  return (
    <>
      <div className="header justify-spacebetween align-center">
        <div className="empty"></div>
        <div className="heading">My Notes</div>
        <div className="logout center">
          <button onClick={handleLogout}>
            {loader ? <div className="button-loader"></div> : "Logout"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
