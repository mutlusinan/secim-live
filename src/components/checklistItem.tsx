import { Checkbox } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { forwardRef, useEffect, useState } from "react";

interface ChecklistItem {
  id: number;
  checkId: number;
  item: string;
  checkItem: Function;
  irregular?: boolean;
}

function ChecklistItem(
  props: ChecklistItem,
  ref: React.LegacyRef<HTMLTableRowElement>
) {
  const [checkedItem, setCheckedItem] = useState(
    props.irregular ? !!props.checkId : false
  );
  useEffect(() => setCheckedItem(!!props.checkId), [props.checkId]);

  const checked = props.checkId >= props.id;
  const readyToCheck = props.id - props.checkId > 1;
  const nextCheck = props.id - props.checkId === 1;

  const checkFn = (e: any) => {
    if (props.irregular) {
      setCheckedItem(!checkedItem);
      props.checkItem(props.id);
    } else {
      if (e.target.checked) {
        props.checkItem(props.id);
      } else {
        props.checkItem(props.id - 1);
      }
    }
  };
  return (
    <tr key={props.id} ref={nextCheck ? ref : undefined}>
      <td>{props.id}</td>
      <td>
        <Checkbox
          checked={props.irregular ? checkedItem : checked}
          className={
            "checklist-item" +
            (checked ? " checked" : "") +
            (nextCheck ? " next" : "")
          }
          key={props.id}
          label={props.item}
          onChange={checkFn}
        />
      </td>
    </tr>
  );
}

export default forwardRef(ChecklistItem);
