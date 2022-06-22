import React from "react";
import Navbar from "../../Navbar/Navbar";
//import Footer from "../Footer/Footer.js";
import Desc from "../../Desc/Desc";
import "./detail.scss";

const Detail = () => {
  return (
    <div className="home">
      <Navbar />
      <h1>Upacara Tawur Kesanga Yogyakarta </h1>
      <h4> Pencatatan - Data Ritus 2015 </h4>
      <Desc />
    </div>
  );
};

export default Detail;
