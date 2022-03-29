import { useEffect, useState } from "react";

import { api } from "@/services";

export const useData = <Data>(url: string) => {
  const [data, setData] = useState<Data>();

  const fetch = async () => {
    const res = await api.get<Data>(url);
    setData(res);
  };

  useEffect(() => {
    if (!url) {
      return;
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return data;
};
