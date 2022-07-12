import React from "react";
import "./card.scss";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Card = ({ culture }) => {
  return (
    <div className="card">
      <div className="item">
        <img
          className="img"
          src={
            culture.img ===
              "https://warisanbudaya.kemdikbud.go.id/dashboard/media/photos/" ||
            !culture.img
              ? "https://www.kushi-hyoutan.jp/wp-content/themes/keni8-child/images/no-image.jpg"
              : culture.img
          }
          alt=""
        />
        <div className="kategori">
          <div className="title">{culture.name}</div>
          {/* <p className="desc">{culture.desc}</p> */}
        </div>
        <div className="info">
          <div className="detailket">
            <TodayRoundedIcon className="icon" />
            {culture.year ? culture.year : "-"}
          </div>
          <div className="detailket">
            <LocationOnIcon className="icon" />
            {culture.province.name ? culture.province.name : "-"}
          </div>
          <div className="detailket">
            <AppRegistrationRoundedIcon className="icon" />
            {culture.reg_num ? culture.reg_num : "-"}
          </div>
          {/* <div className="detailket">
            <AppRegistrationRoundedIcon className="icon" />
            {culture.type ? culture.type : "-"}
          </div> */}

          <div className="bottom">
            <a className="buttonDesc" href={`/DataRitus/${culture._id}`}>
              Lihat Deskripsi
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
