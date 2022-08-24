import React from "react";
//import Navbar from './components/Navbar';
//import Content from './components/Pages/Content';
//import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./component/Pages/Home/Home";
import DataRitus from "./component/Pages/DataRitus/DataRitus";
import PetaRitus from "./component/Pages/PetaRitus/PetaRitus";
import Detail from "./component/Pages/Detail/Detail";
import PetaDinamis from "./component/Pages/PetaDinamis/PetaDinamis";
//import Budaya from "./components/Pages/Budaya";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="Home" element={<Home />} />
            <Route path="PetaRitus" element={<PetaRitus />} />
            <Route path="dynamic" element={<PetaDinamis />} />
            <Route path="DataRitus">
              <Route index element={<DataRitus />} />
              <Route path=":cultureId" element={<Detail />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
