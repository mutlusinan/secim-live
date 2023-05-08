import { Checkbox } from "@mantine/core";
import { forwardRef } from "react";

interface ChecklistItem {
  id: number;
  checkId: number;
  item: string;
  checkItem: Function;
}

function ChecklistItem(
  props: ChecklistItem,
  ref: React.LegacyRef<HTMLTableRowElement>
) {
  
  const checked = props.checkId >= props.id;
  const readyToCheck = props.id - props.checkId > 1;
  const nextCheck = props.id - props.checkId === 1;
  
  const checkFn = (e: any) => {
    if (e.target.checked) {
      props.checkItem(props.id);
    } else {
      props.checkItem(props.id - 1);
    }
  };
  return (
    <tr key={props.id} ref={nextCheck ? ref : undefined}>
      <td>{props.id}</td>
      <td>
        <Checkbox
          checked={checked}
          className={"checklist-item" + (checked ? " checked" : "") + (nextCheck ? " next" : "")}
          key={props.id}
          label={props.item}
          onChange={checkFn}
        />
      </td>
    </tr>
  );
}

export default forwardRef(ChecklistItem);
