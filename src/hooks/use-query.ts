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
    const res = { ...query, ...input };

    Object.keys(input).forEach((key) => {
      if (key === null) {
        delete res[key];
      }
    });

    location.search = _query2Search(query);
  };

  const _query2Search = (input: Query) => {
    return Object.entries(input).reduce((res, [key, value]) => {
      if (!Array.isArray(value)) {
        return res.concat(`${key}=${value.toString()}`);
      }

      return res.concat(value.map((v) => `${key}[]=${v}`).join("&"));
    }, "?");
  };

  return { query, set };
};
