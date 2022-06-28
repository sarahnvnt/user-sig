import React, { useState } from "react";
import "./galeri.scss";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Galeri = ({ images }) => {
  const [model, setModel] = useState(false);
  const [img, setImg] = useState("");

  const getImg = (imgSrc) => {
    setImg(imgSrc);
    setModel(true);
  };

  return (
    <>
      <div className={model ? "model open" : "model"}>
        <img src={img} alt="" />
        <CloseRoundedIcon onClick={() => setModel(false)} />
      </div>
      <div className="Galeri">
        {images.map((img) => (
          <div className="gambar" onClick={() => getImg(img)}>
            <img src={img} alt="" />
          </div>
        ))}
      </div>
    </>
  );
};

export default Galeri;
