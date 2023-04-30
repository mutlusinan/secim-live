import { Checkbox } from "@mantine/core";

interface ChecklistItem {
  id: number;
  checkId: number;
  item: string;
  checkItem: Function;
}

export default function ChecklistItem(props: ChecklistItem) {
  const checkFn = (e: any) => {
    if (e.target.checked) {
      props.checkItem(props.id);
    } else {
      props.checkItem(props.id - 1);
    }
  };

  const checked = props.checkId >= props.id;
  const readyToCheck = props.id - props.checkId > 1;

  return (
    <tr key={props.id}>
      <td>{props.id}</td>
      <td>
        <Checkbox
          disabled={readyToCheck}
          checked={checked}
          className={"checklist-item" + (checked ? " checked" : "")}
          key={props.id}
          label={props.item}
          onChange={checkFn}
        />
      </td>
    </tr>
  );
}
