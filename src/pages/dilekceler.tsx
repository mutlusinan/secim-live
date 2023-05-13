import PDFViewer from "@/components/PDFViewer";
import { Button, Drawer, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import DilekceList from "../assets/data/Dilekceler.json";
export default function Dilekceler() {
  const [file, setFile] = useState("");
  const [search, setSearch] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h1>Dilekçeler</h1>
      <TextInput
        style={{ marginBottom: "20px" }}
        placeholder="Ör: Müşahit"
        label="Arama"
        onChange={(e: any) => setSearch(e.target.value.toLowerCase())}
      />
      {DilekceList.filter((dilekce) =>
        (dilekce.text +" "+dilekce.tags).toLowerCase().includes(search)
      ).map((dilekce) => (
        <div key={dilekce.id} className="col-12 mb-1">
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

      <Drawer opened={opened} onClose={close} position="right" size="100%">
        <PDFViewer link={file} />
      </Drawer>
    </div>
  );
}
