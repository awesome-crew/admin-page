import { useState, useEffect } from "react";

import { SearchIcon } from "@/icons";

import styles from "./SearchBar.module.scss";

export default function SearchBar({ field }: { field: string }) {
  const [text, setText] = useState("");

  const queryName = `${field}Like`;

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get(queryName);

    if (query != null) {
      setText(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const search = () => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set(queryName, text);
    location.search = urlParams.toString();
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
      />
      <button onClick={search}>
        <SearchIcon />
      </button>
    </div>
  );
}
