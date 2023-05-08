import { Table, Modal } from "@mantine/core";
import CheckList from "../assets/data/Checklist.json";
import ChecklistItem from "../components/checklistItem";
import {
  useLocalStorage,
  useScrollIntoView,
  useDisclosure,
} from "@mantine/hooks";
import { useEffect, useState } from "react";

export default function SecimGunu() {
  const [lastChecked, setLastChecked] = useLocalStorage({
    key: "checkId",
    defaultValue: 0,
  });

  const [opened, { open, close }] = useDisclosure(false);
  const [atlananSayi, setAtlananSayi] = useState(0);

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLTableRowElement>({
    duration: 0,
  });

  useEffect(() => scrollIntoView({ alignment: "center" }), [scrollIntoView]);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Sıralama">
        <p>Bazı adımları atlıyorsunuz. Devam etmek istiyor musunuz?</p>
        <button
          className="modal-btn"
          onClick={() => {
            close();
            setLastChecked(atlananSayi);
          }}
        >
          Evet
        </button>
        <button className="modal-btn" onClick={close}>
          Hayır
        </button>
      </Modal>
      <p>
        Bu liste Türkiye Barolar Birliği&lsquo;nin
        <b> &quot;Müşahitler İçin Hukuk Rehberi&quot; </b>
        adlı dökümanından alınmıştır. Müşahitlerin işine yarayabileceği gibi
        <b> sandık kurulu üyelerinin/başkanlarının</b> ve
        <b> kendi sandığının oy sayımında </b>
        bulunacak kişilerin yardımcısı olacaktır.
      </p>
      <Table striped>
        <thead>
          <tr>
            <th>Sıra</th>
            <th>Madde</th>
          </tr>
        </thead>

        <tbody>
          {CheckList.secimgunu.map((item) => (
            <ChecklistItem
              key={item.id}
              id={item.id}
              item={item.item}
              checkId={lastChecked}
              checkItem={(number: number) => {
                if (number - lastChecked > 1) {
                  setAtlananSayi(number);
                  open();
                } else {
                  setLastChecked(number);
                }
              }}
              ref={targetRef}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
}
