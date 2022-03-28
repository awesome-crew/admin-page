import { useEffect, useState } from "react";

import { api } from "@/services";

export const useDetailData = <Model>(
  modelName: string,
  pk: string | number
) => {
  const [data, setData] = useState<Model>();

  const fetch = async () => {
    const res = await api.get<Model>(`/${modelName}s/${pk}`);
    setData(res);
  };

  useEffect(() => {
    if (!modelName || !pk) {
      return;
    }

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelName, pk]);

  return data;
};
