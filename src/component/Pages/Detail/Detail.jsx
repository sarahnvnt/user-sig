import React, { useEffect, useState } from "react";
import "./detail.scss";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Navbar from "../../Navbar/Navbar";
import Galeri from "../../Galeri/Galeri";
import { publicRequest } from "../../../requestMethods";
import { useLocation } from "react-router-dom";

const Detail = () => {
  const [value, setValue] = useState(0);
  const [culture, setCulture] = useState({});
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  // console.log(culture);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const photos = [
    "https://www.99.co/blog/indonesia/wp-content/uploads/2020/11/egrang.jpg",
    "https://www.99.co/blog/indonesia/wp-content/uploads/2020/11/egrang.jpg",
    "https://www.99.co/blog/indonesia/wp-content/uploads/2020/11/egrang.jpg",
  ];
  // const videos = [
  //   "https://www.youtube.com/embed/D4jq5Bd9bTA",
  //   "https://www.youtube.com/embed/D4jq5Bd9bTA",
  //   "https://www.youtube.com/embed/D4jq5Bd9bTA",
  // ];

  useEffect(() => {
    const getAllCultures = async () => {
      try {
        const res = await publicRequest.get(`/cultures/find/${id}`);
        setCulture(res.data);
      } catch (err) {}
    };
    getAllCultures();
  }, []);

  return (
    <div className="Detail">
      <Navbar />
      {/* <div className="stripe"></div> */}
      <div className="Detail-container">
        <div className="judul">
          <h1>{culture?.name}</h1>
          {/* <div className="regnum">
            <span>Nomor Registrasi :</span>
            <span> {culture?.reg_num || "-"}</span>
          </div> */}
          <div className="info-top">
            <div className="infodetail">
              <CalendarTodayIcon className="icon" />
              {culture?.year || "-"}
            </div>
            <div className="infodetail">
              <LocationOnIcon className="icon" />
              {culture?.province?.name || "-"}
            </div>
            <div className="infodetail">{"No. " + culture?.reg_num || "-"}</div>
            {/* <div className="infodetail">
              Tipe:
              {" " + culture?.type || "-"}
            </div> */}
          </div>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Deskripsi" />
              <Tab label="Foto" />
              {/* <Tab label="Video" /> */}
            </Tabs>
          </Box>
        </div>

        <div className="tabContainer">
          {value === 0 ? (
            <div className="desc">
              <div className="imgContainer">
                <img
                  src={
                    culture.img ===
                      "https://warisanbudaya.kemdikbud.go.id/dashboard/media/photos/" ||
                    !culture.img
                      ? "https://dpwfkdtjabar.com/assets/images/artikel/no-image.png"
                      : culture.img
                  }
                  alt=""
                />
                {/* </div> */}
              </div>
              <p>{culture.desc || "Belum ada deskripsi tentang Ritus ini"}</p>
              {/* </div> */}
            </div>
          ) : value === 1 ? (
            culture.imgs.length > 0 ? (
              <Galeri images={culture.imgs} />
            ) : (
              "Belum ada foto-foto tentang Ritus ini"
            )
          ) : (
            <div className="">
              {/* {culture.videos.length > 0
                ? culture?.videos.map((video) => (
                    <iframe width="320" height="215" src={video}></iframe>
                  ))
                : "Belum ada video tentang Ritus ini"} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
