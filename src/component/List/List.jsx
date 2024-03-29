import "./list.scss";
import React, { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SelectFilter from "../Selectfilter/Selectfilter";
import Card from "../Card/Card";
import { publicRequest } from "../../requestMethods";
import { tahun } from "../../utils/naming";
import CircularProgress from "@mui/material/CircularProgress";

const List = ({ province, setProvince }) => {
  const [year, setYear] = useState("");
  const [inputSearch, setInputSearch] = useState(""); // menyimpan dan mengubah set input pada seacrh
  const [list, setList] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cultures, setCultures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllProvinces = async () => {
      try {
        const res = await publicRequest.get(`/provinces`); // mengambil data list provinsi dengan get
        setProvinces(res.data);
      } catch (err) {}
    };
    getAllProvinces();
  }, []);

  useEffect(() => {
    const getAllCultures = async () => {
      setIsLoading(true);
      try {
        const res = await publicRequest.get(`/cultures`); // mengambil data list culture dengan get
        setList(res.data);
        setCultures(res.data);
        if (res) {
          setIsLoading(false);
        }
      } catch (err) {}
    };
    getAllCultures();
  }, []);

  const years = [
    {
      id: 1,
      label: 2018,
      value: 2018,
    },
    {
      id: 2,
      label: 2019,
      value: 2019,
    },
  ];

  const reset = () => {
    setProvince("");
    setYear("");
  };

  useEffect(() => {
    //untuk effect / filter pada peta
    const applyFilters = () => {
      let updatedList = cultures;

      if (year) {
        updatedList = updatedList.filter((item) => item.year === year);
      }
      if (province) {
        updatedList = updatedList.filter(
          (item) => item.province._id === province
        );
      }
      if (inputSearch) {
        updatedList = updatedList.filter(
          (item) =>
            item.name.toLowerCase().search(inputSearch.toLowerCase().trim()) !==
            -1
        );
      }

      setList(updatedList);
    };
    applyFilters();
  }, [year, province, inputSearch, cultures, isLoading]);

  return (
    <div className="list">
      <div className="top">
        <div className="searchmap">
          <input
            type="text"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            placeholder="Cari Data Ritus"
          />
          <SearchOutlinedIcon className="icon" />
        </div>
        <div className="filter">
          <SelectFilter
            options={provinces}
            label="Province"
            value={province}
            setValue={setProvince}
          />
          <SelectFilter
            options={tahun(2010, 2021)}
            label="Year"
            value={year}
            setValue={setYear}
          />

          <button className="Breset" onClick={reset}>
            Reset
          </button>
          {/* <SelectFilter answer={answer} setAnswer={setAnswer} /> */}
        </div>
      </div>
      <div className="card-container">
        {isLoading ? (
          <CircularProgress color="primary" size="2rem" thickness={5} />
        ) : (
          list.map((culture) => <Card culture={culture} />)
        )}
      </div>
    </div>
  );
};

export default List;
