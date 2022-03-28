import { useEffect, useState } from "react";

type QueryValue = string | boolean | number | number[];
type Query = { [key: string]: QueryValue };
export const useQuery = () => {
  const [query, setQuery] = useState<Query>();

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    if (typeof window === "undefined") {
      return;
    }
    const urlParams = new URLSearchParams(location.search);
    const obj: Query = {};
    urlParams.forEach((value, key) => {
      obj[key] = value;
    });
    setQuery(obj);
  };

  const set = (input: Query) => {
    const res = { ...input };

    Object.keys(res).forEach((key) => {
      if (res[key] === null) {
        delete res[key];
      }
    });

    location.search = _query2Search(res);
  };

  const _query2Search = (input: Query) => {
    return (
      "?" +
      Object.entries(input)
        .map(([key, value]) => {
          if (!Array.isArray(value)) {
            return `${key}=${value.toString()}`;
          }

          return value.map((v) => `${key}[]=${v}`).join("&");
        })
        .join("&")
    );
  };

  return { query, set };
};
