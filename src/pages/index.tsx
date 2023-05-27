import MenuItems from "../assets/data/MenuItems.json";
// import ovo from "../assets/img/ovo.png";
// import tg from "../assets/img/tg.png";
// import io from "../assets/img/secim_gonullu_io.png";
import { Button } from "@mantine/core";
import Link from "next/link";

export default function Home() {
  return (
    <div className="main-container">
      <p>
        <b>secim.live</b>, seçimlerde görev alan kişilerin işlerine yarayacak
        araçların, belgelerin ve bilgierin bir araya getirildiği bir
        platformdur.
        <br />
        Devlet kurumları ve güvenilir sivil toplum kuruluşları tarafından
        üretilmiş veya yaygınlaştırılmış olan bilgi ve belgelerin kullanılmasına
        dikkat eder.
      </p>
      <div className="row">
        {MenuItems.map((item, i) => {
          return (
            <div key={i} className="col-12 col-md-6">
              <Link href={item.link}>
                <Button
                  style={{
                    width: "90%",
                    marginBottom: "15px",
                    fontSize: "16px",
                  }}
                  variant="outline"
                >
                  {item.label}
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
      {/* {<div className="row d-flex justify-content-center gonullu my-4">
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
        <div className="col-12">
          <a target="_blank" href="https://secim.gonullu.io/">
            <img
              src={io.src}
              style={{ padding: 0 }}
              title="secim.gonullu.io"
              alt="secim.gonullu.io"
            />
          </a>
        </div>
      </div>} */}
    </div>
  );
}
