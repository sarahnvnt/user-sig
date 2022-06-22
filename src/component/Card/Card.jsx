import React from "react";
import "./card.scss";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Card = ({ culture }) => {
  return (
    <div className="detail">
      <div className="item">
        <img
          className="img"
          src={
            culture.img ===
              "https://warisanbudaya.kemdikbud.go.id/dashboard/media/photos/" ||
            !culture.img
              ? "https://dpwfkdtjabar.com/assets/images/artikel/no-image.png"
              : culture.img
          }
          alt=""
        />
        <div className="detailCategory">
          <div className="title">{culture.name}</div>
          {/* <p className="desc">{culture.desc}</p> */}
        </div>
        <div className="info">
          <div className="detailCat">
            <CalendarTodayIcon className="icon" />
            {culture.year ? culture.year : "-"}
          </div>
          <div className="detailCat">
            <LocationOnIcon className="icon" />
            {culture.province.name ? culture.province.name : "-"}
          </div>

          <div className="bottom">
            <a className="buttonRead" href={`/detail/${culture._id}`}>
              Lihat Deskripsi
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
