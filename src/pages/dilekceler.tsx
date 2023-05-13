import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Document, Page } from "react-pdf";

export default function Dilekceler() {
  const [file, setFile] = useState<any>();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div
      className="container"
      style={{ textAlign: "center", marginTop: "100px" }}
    >
      <h1>Dilekçeler</h1>
      <h3 style={{ fontWeight: 700 }}>Yapım Aşamasında</h3>
      <h4>
        Seçim günü ve sonrasında işinize yarayacak dilekçeler seçimden önce
        burada yer alacaklar.
      </h4>
      <Button variant="outline" onClick={open}>
        Yeni Parti Ekle +
      </Button>

      <Drawer opened={opened} onClose={close} position="right" size="100%">
        <iframe
          className="dilekce-container"
          src={"/dilekce/D1.pdf"}
          height="100%"
          width="100%"
        />
      </Drawer>
    </div>
  );
}
