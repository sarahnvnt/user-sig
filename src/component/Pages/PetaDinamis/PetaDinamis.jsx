import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import "./petadinamis.scss";
import { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { useEffect, useState } from "react";
import { publicRequest } from "../../../requestMethods";

const PetaDinamis = () => {
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState("");
  const [nilai, setNilai] = useState("");
  const [inputValue, setInputValue] = useState(0.8);
  const [calc, setCalc] = useState({});
  const [step, setStep] = useState(1);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const totalData = await publicRequest.get(`/cultures/count`);
        const provinceData = await publicRequest.get(`/provinces`);

        setProvinces(mergeProvincesTotal(provinceData.data, totalData.data));
      } catch (err) {}
    };
    getAllData();
  }, []);

  const getCalc = async (inputValue) => {
    try {
      const calcData = await publicRequest.get(
        `/cultures/calculatemanual?ref=${inputValue}`
      );
      setCalc(calcData.data);
    } catch (err) {}
  };

  const findId = (val, totalData) => {
    let temp = totalData.filter((item) => item._id === val);
    return temp[0];
  };

  const mergeProvincesTotal = (val, totalData) => {
    const test = val?.map((province) => {
      const totalTemp = findId(province._id, totalData);

      return {
        ...province,
        geojson: {
          ...province.geojson,
          properties: {
            ...province.geojson.properties,
            provinceId: totalTemp?._id || "",
            total: totalTemp?.count || 0, // total jumlah budaya pada provinsinya
          },
        },
      };
    });
    return test;
  };

  const countryStyle = {
    color: "black",
    weight: 1, // ketebalan peta
    fillOpacity: 2, //buat warna makin cerah
  };

  const onEachCountry = (country, layer) => {
    if (country.properties.total) {
      if (country.properties.total >= calc.high) {
        //batas atas
        layer.options.fillColor = "green";
      } else if (country.properties.total <= calc.low) {
        // warna layer batas bawah
        layer.options.fillColor = "red";
      } else {
        layer.options.fillColor = "yellow";
      }
    }

    layer.on("click", function (e) {
      setProvince(country.properties.provinceId);
    });
    layer.on("mouseover", function (e) {
      e.target.setStyle({
        fillOpacity: 0.5,
      });
    });
    layer.on("mouseout", function (e) {
      e.target.setStyle({
        fillOpacity: 2,
      });
    });
  };

  const showMap = () => {
    setStep(2);
    setNilai(inputValue);
    getCalc(inputValue);
  };

  return (
    <div className="dynamic">
      {step === 1 && (
        <div className="nilai-container">
          <form>
            <div className="form-input">
              <label htmlFor="">Masukkan Nilai Acuan (n)</label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <button onClick={showMap}>Lihat Peta</button>
          </form>
        </div>
      )}

      {step === 2 && (
        <>
          <MapContainer
            center={[-0.789275, 117.921326]} //center petanya
            zoom={5}
            scrollWheelZoom={true}
            style={{ height: "100%", zIndex: 1 }}
          >
            {provinces.length > 0 && calc.high && (
              <>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON
                  style={countryStyle}
                  data={provinces.map((map) => map.geojson)} //Setiap prov memiliki gjson yang gjsonnya aja
                  onEachFeature={onEachCountry} //pada tiap feature maka fungsi oneach feature akan jalan
                />
              </>
            )}
            {provinces.map((data) => (
              <Marker
                position={[data.lat, data.long]} // marker pada setiap provinsi
                icon={
                  new Icon({
                    iconUrl: markerIconPng,
                    iconSize: [18, 31],
                    iconAnchor: [10, 31],
                  })
                }
                eventHandlers={{
                  click: (e) => {
                    setProvince(data.geojson.properties.provinceId); // will print 'FooBar' in console
                  },
                }}
              >
                <Popup>
                  <div className="info">
                    <b>{data.name}</b>
                    <p>{"Jumlah Ritus : " + data.geojson.properties.total}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          {calc.high && (
            <div className="keterangan">
              <div className="tittle">Keterangan</div>
              <div className="colorInfo">
                <div className="color" style={{ background: "green" }}></div>
                <div>{" > " + Math.floor(calc.high) + " (Jumlah Tinggi)"}</div>
              </div>
              <div className="colorInfo">
                <div className="color" style={{ background: "yellow" }}></div>
                <div>
                  {Math.floor(calc.low) +
                    " - " +
                    Math.floor(calc.high) +
                    " (Jumlah Sedang)"}
                </div>
              </div>
              <div className="colorInfo">
                <div className="color" style={{ background: "red" }}></div>
                <div>{" < " + Math.floor(calc.low) + " (Jumlah Sedikit)"}</div>
              </div>
              <div className="infoProv">
                Provinsi Ritus tinggi : {calc.highProvince}
              </div>
              <div className="infoProv">
                Provinsi Ritus sedang : {calc.midProvince}
              </div>
              <div className="infoProv">
                Provinsi Ritus sedikit : {calc.lowProvince}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PetaDinamis;
