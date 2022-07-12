import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar.jsx";
//import Footer from "../Footer/Footer.js";
import Datatable from "../../Datatable/Datatable.jsx";
//import React, { useEffect, useState } from "react";
//import Ritus from "../DataRitus/Ritus";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SelectFilter from "../../Selectfilter/Selectfilter";
//import provinces from "../../../data/Indonesia.json";
// import ritus from "../../../data/ritus.json";
import { publicRequest } from "../../../requestMethods.js";
import CircularProgress from "@mui/material/CircularProgress";
import { tahun } from "../../../utils/naming.js";
import "./dataritus.scss";

const DataRitus = () => {
  const [province, setProvince] = useState("");
  const [year, setYear] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [type, setType] = useState("");
  const [list, setList] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cultures, setCultures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(cultures);

  useEffect(() => {
    const getAllProvinces = async () => {
      try {
        const res = await publicRequest.get(`/provinces`);
        setProvinces(res.data);
      } catch (err) {}
    };
    getAllProvinces();
  }, []);

  useEffect(() => {
    const getAllCultures = async () => {
      setIsLoading(true);
      try {
        const res = await publicRequest.get(`/cultures`);
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
  // const type = ["Pencatatan", "Penetapan"];
  // const type = [
  //   {
  //   id :"1"
  //   label: "Pencatatan"
  //   },
  //   {
  //   id :"2"
  //   label: "Penetapan"
  //   },
  //   ]

  const reset = () => {
    setProvince("");
    setYear("");
    // setType("");
  };

  useEffect(() => {
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
      // if (type) {
      //   updatedList = updatedList.filter((item) => item.type === type);
      // }
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
  }, [year, province, inputSearch]);

  const provinceColumns = [
    // { field: "_id", headerName: "ID", minWidth: 100, flex: 1 },
    {
      field: "reg_num",
      headerName: "No. Regist",
      minWidth: 100,
      flex: 1,

      renderCell: (params) => {
        return params.row.reg_num || "-";
      },
    },
    // {
    //   field: "type",
    //   headerName: "Type",
    //   minWidth: 100,
    //   flex: 1,

    //   renderCell: (params) => {
    //     return params.row.type || "-";
    //   },
    // },
    {
      field: "year",
      headerName: "Tahun",
      minWidth: 50,
      flex: 1,
      renderCell: (params) => {
        return params.row.year || "-";
      },
    },

    {
      field: "name",
      headerName: "Nama Ritus",
      minWidth: 150,
      flex: 1,

      renderCell: (params) => {
        return params.row.name;
      },
    },
    {
      field: "province",
      headerName: "Provinsi",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return params.row?.province?.name;
      },
    },

    {
      field: "desc",
      headerName: "Deskripsi",
      minWidth: 250,
      flex: 1,
      renderCell: (params) => {
        return params.row.desc || "-";
      },
    },
  ];

  return (
    <div className="dataritus">
      <Navbar />
      <div className="list">
        <div className="top">
          <div className="searchritus">
            <input
              type="text"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              placeholder="Cari Nama Ritus..."
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
            {/* <SelectFilter
              options={type}
              label="Type"
              value={type}
              setValue={setType}
            /> */}

            <button className="Buttonreset" onClick={reset}>
              Reset
            </button>
            {/* <SelectFilter answer={answer} setAnswer={setAnswer} /> */}
          </div>
        </div>
      </div>
      <Datatable list={list} columns={provinceColumns} />
    </div>
  );
};

export default DataRitus;
