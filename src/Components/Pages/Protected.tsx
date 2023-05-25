import React, { FC, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

type props = {
  Component: React.FC;
};

const Protected: FC<props> = ({ Component }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  });

  return (
    <>
      <Navbar />
      <Component />
    </>
  );
};

export default Protected;
