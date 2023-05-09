import Image from "next/image";
import MenuItems from "../assets/data/MenuItems.json";
import ovo from "../assets/img/ovo.png";
import tg from "../assets/img/tg.png";

export default function Home() {
  return (
    <div className="main-container">
      <div className="row">
        {MenuItems.map((item, i) => {
          return (
            <div key={i} className="col-12 col-md-6">
              <a href={item.link}>
                <button style={{ width: "90%" }} className="main-buttons">
                  {item.label}
                </button>
              </a>
            </div>
          );
        })}
      </div>
      <div className="row d-flex justify-content-center gonullu my-5">
        <div className="col-12">
          <p style={{ fontSize: "30px" }}>
            Müşahit olmak için geç kalmış değilsin!
          </p>
        </div>
        <div className="col-12 col-md-6">
          <a target="_blank" href="https://oyveotesi.org/kayit/">
            <img src={ovo.src} title="Oy ve Ötesi" alt="Oy ve Ötesi" />
          </a>
        </div>
        <div className="col-12 col-md-6">
          <a target="_blank" href="https://kayit.turkiyegonulluleri.org/">
            <img
              src={tg.src}
              title="Türkiye Gönüllüleri"
              alt="Türkiye Gönüllüleri"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
