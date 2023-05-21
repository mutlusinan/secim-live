import React from "react";
import PDFViewer from "@/components/PDFViewer";
import { Button, Drawer, TextInput, Accordion } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import DilekceList from "../assets/data/Dilekceler.json";
import SSS from "../assets/data/SSS.json";
import Link from "next/link";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";

export default function Dilekceler() {
  const [file, setFile] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const filteredDilekce = DilekceList.filter((dilekce) =>
    (dilekce.text + " " + dilekce.tags).toLowerCase().includes(search)
  );
  const filteredSSS = SSS.filter((soru) =>
    (soru.question + " " + soru.answer + " " + soru.tags)
      .toLowerCase()
      .includes(search)
  );
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h1>Sık Sorulan Sorular ve Dilekçeler</h1>
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
      <Accordion transitionDuration={300} className="mb-4">
        {filteredSSS.map((soru) => (
          <Accordion.Item key={soru.tag} value={soru.tag}>
            <Accordion.Control>{soru.question}</Accordion.Control>
            <Accordion.Panel className="accordion-panel">
              <ReactMarkdown
                components={{
                  p: React.Fragment,
                }}
                rehypePlugins={[rehypeRaw]}
              >
                {soru.answer}
              </ReactMarkdown>
              <br />
              <br />
              <Button
                style={{ width: "100%" }}
                variant="outline"
                onClick={() => {
                  setFile("/dilekce/135.pdf");
                  setPage(soru.page ?? 1);
                  open();
                }}
              >
                İlgili yeri göster
              </Button>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
      {filteredDilekce.map((dilekce) => (
        <div key={dilekce.id} className="col-12 mt-2 mb-1 dilekce-button">
          <Button
            style={{ width: "100%" }}
            variant="outline"
            onClick={() => {
              setPage(1);
              setFile(dilekce.link);
              open();
            }}
          >
            {dilekce.text}
          </Button>
        </div>
      ))}

      {filteredDilekce.length === 0 && filteredSSS.length === 0 && (
        <p style={{ color: "gray" }}>
          Sonuç bulunamadı. Lütfen başka şekilde aratmayı deneyin.
        </p>
      )}

      <Drawer opened={opened} onClose={close} position="right" size="100%">
        <p className="pdf-viewer-mobile-show" style={{ textAlign: "center" }}>
          Mobil cihazlarda yatay konumda kullanılması önerilir.
        </p>
        <PDFViewer link={file} close={close} pageNumber={page} />
      </Drawer>
    </div>
  );
}
