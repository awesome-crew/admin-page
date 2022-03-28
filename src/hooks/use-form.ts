import { formState } from "@/store/form";
import { useRecoilState } from "recoil";

export const useForm = () => {
  const [form, setForm] = useRecoilState(formState);

  const update = (input: Record<string, unknown>) => {
    setForm({
      ...form,
      ...input,
    });
  };

  return { form, update };
};
