import React from "react";
import Navbar from "../../Navbar/Navbar";
//import Footer from "../Footer/Footer.js";
import Content from "../../Content/Content";
import "./home.scss";

const Home = () => {
  // // const nilai = [1, 2, 3, 4, 5];

  // // let total = 0;

  // // for (var i = 0; i < nilai.length; i++) {
  // //   total += nilai[i];
  // // }

  // // const hasil = total / nilai.length;

  // // console.log("rata-rata:", hasil);

  // const nilai = [1, 2, 3, 4, 5];

  // const average = (nilai) => {
  //   let total = 0;
  //   for (var i = 0; i < nilai.length; i++) {
  //     total += nilai[i];
  //   }
  //   const hasil = total / nilai.length;
  //   return hasil;
  // };
  // console.log("rata-rata:", average(nilai));

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
