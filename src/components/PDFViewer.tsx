import { Button } from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  link: string;
}
export default function PDFViewer(props: PDFViewerProps) {
  const [isBelge, setIsBelge] = useState(true);
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Button
          variant={isBelge ? "filled" : "outline"}
          style={{ marginRight: "10px" }}
          onClick={() => {
            setIsBelge(true);
          }}
        >
          Dosya
        </Button>
        <Button
          variant={!isBelge ? "filled" : "outline"}
          style={{ marginRight: "10px" }}
          onClick={() => {
            setIsBelge(false);
          }}
        >
          Metin
        </Button>
        <Button
          variant="light"
          onClick={() => {
            setIsBelge(false);
          }}
        >
          <Link href={props.link} target="_blank" download>
            İndir
          </Link>
        </Button>
      </div>

      <Document className="pdf-container" file={props.link}>
        <Page
          pageNumber={1}
          renderMode={isBelge ? "canvas" : "none"}
          renderTextLayer={!isBelge}
          renderAnnotationLayer={false}
        />
      </Document>
    </>
  );
}
