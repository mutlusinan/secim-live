import React, { useState } from "react";
import DATA from "../assets/data/SecimSonucIl.json";
import { Select } from "@mantine/core";

export default function SecimSonuc() {
  interface SelectItem {
    value: string;
    label: string;
  }
  const [secilenSehir, setSecilenSehir] = useState("");
  const veri: SelectItem[] = DATA.aday_sayisi.map((il) => ({
    value: il.il_id,
    label: il.il_adi,
  }));

  const sehriniSec = (value: any) => {
    setSecilenSehir(value);
  };

  const secilenSehirSet = DATA.iller_parti.filter(
    (il) => il.il_id === secilenSehir
  );
  const sehirAdaySayisi = DATA.aday_sayisi.filter(
    (il) => il.il_id === secilenSehir
  )[0].bolge_mv_sayi;

  return (
    <div className="secim-sonuç">
      <h1>2018 Seçim Sonuçları - Yeni Sisteme Göre</h1>
      <Select
        label="Your favorite framework/library"
        placeholder="Pick one"
        data={veri}
        searchable
        onChange={sehriniSec}
      />
      {secilenSehirSet && secilenSehirSet.length > 0 && (
        <div className="oy-tablosu">
          <table>
            <tr>
              {Object.keys(secilenSehirSet[0]).map((a) => (
                <th key={a}>{a}</th>
              ))}
            </tr>
          </table>
        </div>
      )}
    </div>
  );
}
