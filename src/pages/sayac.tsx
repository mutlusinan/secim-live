import React from "react";

function Sayac() {
  const currentDate = new Date().getTime();
  const date = new Date("2023-05-14 08:00:00 GMT+0300").getTime();
  const dateFinish = new Date("2023-05-14 17:00:00 GMT+0300").getTime();
  const dateSecond = new Date("2023-05-28 08:00:00 GMT+0300").getTime();
  const dateSecondFinish = new Date("2023-05-28 17:00:00 GMT+0300").getTime();

  return (
    <div className="container">
      <h1 className="row justify-content-center">Seçim Sayacı</h1>
      <h2 className="row justify-content-center">
        {date > currentDate
          ? "Seçime kalan süre:"
          : currentDate > date && dateFinish > currentDate
          ? "İlk turun bitmesine:"
          : currentDate > dateFinish && dateSecond > currentDate
          ? "İkinci tura kalırsa eğer:"
          : currentDate > dateSecond && dateSecondFinish > currentDate
          ? "İkinci turun bitmesine:"
          : "2023 Genel Seçim süreci sona erdi."}
      </h2>

      {dateSecondFinish > currentDate && (
        <div className="row timer">
          <div className="gun col-3">gün</div>
          <div className="saat col-3">saat</div>
          <div className="dakika col-3">dakika</div>
          <div className="saniye col-3">saniye</div>
        </div>
      )}
    </div>
  );
}

export default Sayac;
