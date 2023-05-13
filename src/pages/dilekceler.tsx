import PDFViewer from "@/components/PDFViewer";
import { Button, Drawer, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import DilekceList from "../assets/data/Dilekceler.json";
import Link from "next/link";
export default function Dilekceler() {
  const [file, setFile] = useState("");
  const [search, setSearch] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const filtered = DilekceList.filter((dilekce) =>
    (dilekce.text + " " + dilekce.tags).toLowerCase().includes(search)
  );
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h1>Dilekçeler</h1>
      <p style={{ textAlign: "left" }}>
        Bu sayfadaki dilekçeler Oy ve Ötesi&lsquo;nin{" "}
        <Link target="_blank" href="https://oyveotesi.org/egitim-seti/">
          <b>eğitim setinden</b>
        </Link>{" "}
        ve Türkiye Barolar Birliği&lsquo;nin{" "}
        <Link
          target="_blank"
          href="https://d.barobirlik.org.tr/2023/Musahitler-Icin-Hukuk-Rehberi/"
        >
          <b>&quot;Müşahitler İçin Hukuk Rehberi&quot;</b>
        </Link>{" "}
        adlı dökümanından alınmıştır. Müşahitlerin işine yarayabileceği gibi
        <b> sandık kurulu üyelerinin/başkanlarının</b> ve
        <b> kendi sandığının oy sayımında </b>
        bulunacak kişilerin yardımcısı olacaktır.
      </p>
      <TextInput
        style={{ marginBottom: "20px" }}
        placeholder="Ör: Müşahit"
        label="Arama"
        onChange={(e: any) => setSearch(e.target.value.toLowerCase())}
      />
      {filtered.map((dilekce) => (
        <div key={dilekce.id} className="col-12 mb-1 dilekce-button">
          <Button
            style={{ width: "100%" }}
            variant="outline"
            onClick={() => {
              setFile(dilekce.link);
              open();
            }}
          >
            {dilekce.id + "- " + dilekce.text}
          </Button>
        </div>
      ))}

      {filtered.length === 0 && (
        <p style={{ color: "gray" }}>
          Sonuç bulunamamıştır. Lütfen başka şekilde aratmayı deneyin.
        </p>
      )}

      <Drawer opened={opened} onClose={close} position="right" size="100%">
        <p className="pdf-viewer-mobile-show" style={{ textAlign: "center" }}>
          Mobil cihazlarda yatay konumda kullanılması önerilir.
        </p>
        <PDFViewer link={file} close={close} />
      </Drawer>
    </div>
  );
}
