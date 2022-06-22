import React from "react";
import Navbar from "../../Navbar/Navbar";
//import Footer from "../Footer/Footer.js";
import Content from "../../Content/Content";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <h1 style={{ textAlign: "center" }}>Sistem Informasi Geografis</h1>
      <Content />
    </div>
  );
};

export default Home;
