import React, { useState } from "react";
import "./navbar.scss";

const Navbar = () => {
  const navbarData = [
    {
      title: "Home",
      path: "/Home",
    },
    {
      title: "Data Ritus",
      path: "/DataRitus",
    },
    {
      title: "Peta",
      path: "/PetaRitus",
    },
  ];

  const [active, setActive] = useState(false);
  const navToggle = () => {
    setActive(!active);
  };

  return (
    <nav className={active ? "navbar active" : "navbar"}>
      <div className="logo">
        {/* <img src="../../../public/Logo.png" alt="" className="avatar" /> */}
        <a href="/">Ritus</a>
      </div>
      <ul className={active ? "menu active" : "menu"}>
        {navbarData.map((item, key) => (
          <li
            className="item"
            key={key}
            id={window.location.pathname === item.path ? "active" : ""}
          >
            <a href={item.path} className="link">
              {item.title}
            </a>
          </li>
        ))}
      </ul>

      <div
        onClick={navToggle}
        className={active ? "toggler toggle" : "toggler"}
      >
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};

export default Navbar;
