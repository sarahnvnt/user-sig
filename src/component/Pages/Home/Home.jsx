import React from "react";
import Navbar from "../../Navbar/Navbar";
//import Footer from "../Footer/Footer.js";
import Content from "../../Content/Content";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <h1 style={{ textAlign: "center" }}>
        Sistem Informasi Geografis Ritus di Indonesia
      </h1>
      <Content />
    </div>
  );
};

export default Home;
