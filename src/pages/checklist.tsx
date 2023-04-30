import { Table } from "@mantine/core";
import CheckList from "../assets/data/Checklist.json";
import ChecklistItem from "../components/checklistItem";
import { useLocalStorage, useScrollIntoView } from "@mantine/hooks";
import { useEffect } from "react";

export default function Checklist() {
  const [lastChecked, setLastChecked] = useLocalStorage({
    key: "checkId",
    defaultValue: 0,
  });

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLTableRowElement>({
    duration: 0,
  });

  useEffect(() => scrollIntoView({ alignment: "center" }), [scrollIntoView]);

  return (
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
              setLastChecked(number);
            }}
            ref={targetRef}
          />
        ))}
      </tbody>
    </Table>
  );
}
