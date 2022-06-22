import "./content.scss";
//import fotohome from "../../../public/Image/fotohome.png";

const Content = () => {
  return (
    <div className="ritus">
      <div className="left">
        <h1> Ritus </h1>
        <p>
          Ritus adalah tata cara pelaksanaan suatu upacara atau kegiatan menurut
          nilai-nilai tertentu, yang dilakukan secara terus menerus oleh
          kelompok masyarakat dan diwariskan kepada generasi berikutnya dengan
          berbagai macam perayaan, diantaranya berbagai hari raya, peringatan
          kelahiran, upacara pernikahan, upacara kematian, dan upacara
          kepercayaan dan perlengkapannya dalam melakukan ritus tersebut.
        </p>
        <a href="/PetaRitus">
          <button>Lihat Peta</button>
        </a>
        <a href="/DataRitus">
          <button>Lihat Data Ritus</button>
        </a>
      </div>
      <div className="right">
        <img src="https://www.tripbaligo.com/wp-content/uploads/2020/09/149-Converted.png"></img>
      </div>
    </div>
  );
};

export default Content;
