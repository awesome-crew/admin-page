import { useEffect, useState } from "react";

import { api } from "@/services";

import { PAGE_SIZE } from "./constants";

export const useListData = <Model>(modelName: string) => {
  const [data, setData] = useState<Model[]>();

  const fetch = async () => {
    const params = new URLSearchParams(location.search);
    if (!params.get("offset")) {
      params.set("offset", "0");
    }
    if (!params.get("limit")) {
      params.set("limit", PAGE_SIZE.toString());
    }

    const res = await api.get<Model[]>(`/${modelName}s?${params.toString()}`);
    setData(res);
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data;
};
