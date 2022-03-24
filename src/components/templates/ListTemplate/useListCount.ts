import { useEffect, useState } from "react";

import { api } from "@/services";

export const useListCount = (modelName: string) => {
  const [data, setData] = useState<number>(0);

  const fetch = async () => {
    const params = new URLSearchParams(location.search);

    const res = await api.get<number>(
      `/${modelName}s/count?${params.toString()}`
    );
    setData(res);
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data;
};
