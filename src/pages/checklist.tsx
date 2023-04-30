import { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import CheckList from "../assets/data/Checklist.json";
import ChecklistItem from "../components/checklistItem";
import { useLocalStorage } from "@mantine/hooks";

export default function Checklist() {
  const [lastChecked, setLastChecked] = useLocalStorage({
    key: "checkId",
    defaultValue: 0,
  });

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
          ></ChecklistItem>
        ))}
      </tbody>
    </Table>
  );
}
