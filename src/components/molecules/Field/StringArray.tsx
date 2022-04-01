import { useEffect, useState } from "react";

import { BaseField, BaseFieldProps } from "./Base";
import { Button } from "@/components/atoms";

import { useForm } from "@/hooks";

import styles from "./StringArray.module.scss";
import { XIcon } from "@/icons";

export function StringArrayField(
  props: Omit<BaseFieldProps<string[]>, "children">
) {
  const { name, value, editable = true, maxLength } = props;

  const { form, update } = useForm();
  const strings: string[] = form[name] ?? value ?? [];

  useEffect(() => {
    if (value) {
      update({
        [name]: value,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!value]);

  const [text, setText] = useState("");
  const add = () => {
    if (!text) {
      return;
    }

    update({ [name]: [...strings, text] });
    setText("");
  };

  const remove = (index: number) => {
    update({ [name]: (form[name] as string[]).filter((_, i) => i !== index) });
  };

  return (
    <BaseField {...props}>
      {editable ? (
        <div className={styles.wrapper}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              name={name}
              value={text}
              maxLength={maxLength}
              placeholder="추가할 검색어를 입력해주세요"
              onChange={(e) => setText(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  add();
                }
              }}
            />
            <Button onClick={add}>추가</Button>
          </div>
          <ul className={styles.list}>
            {strings.map((v, i) => (
              <li key={`${v}_${i}`} className={styles.item}>
                {v}
                <XIcon className={styles.remove} onClick={() => remove(i)} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        value?.join(", ") ?? "-"
      )}
    </BaseField>
  );
}
