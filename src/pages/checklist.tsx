import { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import CheckList from "../assets/data/Checklist.json";
import ChecklistItem from "../components/checklistItem";

export default function Checklist() {
  const [lastChecked, setLastChecked] = useState(0);

  useEffect(() => {
    const checkId = Number(localStorage.getItem("checkId"));
    if (checkId) {
      setLastChecked(checkId);
    }
  }, []);
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
              localStorage.setItem("checkId", number.toString());
            }}
          ></ChecklistItem>
        ))}
      </tbody>
    </Table>
  );
}
