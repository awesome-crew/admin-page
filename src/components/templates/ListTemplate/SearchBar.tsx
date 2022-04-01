import { useState, useEffect } from "react";

import { SearchIcon } from "@/icons";

import { useQuery } from "@/hooks";

import styles from "./SearchBar.module.scss";

export default function SearchBar({
  field,
  label,
}: {
  field: string;
  label?: string;
}) {
  const [text, setText] = useState("");

  const queryName = `${field}Include`;

  const { query, set } = useQuery();

  useEffect(() => {
    if (query && query[queryName] != null) {
      setText(query[queryName].toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query && !!query[queryName]]);

  const search = () => {
    set({
      ...query,
      [queryName]: text,
      offset: 0,
      limit: 20,
    });
  };

  return (
    <div className={styles.wrapper}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            search();
          }
        }}
        placeholder={label ? `${label}(으)로 검색` : ""}
      />
      <button onClick={search}>
        <SearchIcon />
      </button>
    </div>
  );
}
