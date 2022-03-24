import { useEffect, useState } from "react";

import { api } from "@/services";

export const useListData = <Model>(modelName: string) => {
  const [data, setData] = useState<Model[]>([]);

  const fetch = async () => {
    const res = await api.get<Model[]>(`/${modelName}s${location.search}`);
    setData(res);
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data;
};
