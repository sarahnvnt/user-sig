import React, { useEffect, useState } from "react";
import "./petaritus.scss";
import MyMap from "../../MyMap/MyMap";
import Navbar from "../../Navbar/Navbar";
import List from "../../List/List";

const PetaRitus = () => {
  const [province, setProvince] = useState("");
  return (
    <>
      <Navbar />
      <div className="petaRitus">
        <List province={province} setProvince={setProvince} />
        <MyMap setProvince={setProvince} />
      </div>
    </>
  );
};

export default PetaRitus;
