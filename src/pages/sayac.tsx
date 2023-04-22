import React from "react";

function Sayac() {
  return (
    <div className="container">
      <h1 className="row justify-content-center">Seçim Sayacı</h1>
      <div className="row timer">
        <div className="gun col-3">gun</div>
        <div className="saat col-3">saat</div>
        <div className="dakika col-3">dakika</div>
        <div className="saniye col-3">saniye</div>
      </div>
    </div>
  );
}

export default Sayac;
