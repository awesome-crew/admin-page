export type FilterInputProps<Value> = {
  name: string;
  value: Value | null;
  onChange: (value: Value) => void;
};
