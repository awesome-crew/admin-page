export type FilterInputProps<Value> = {
  label: string;
  value: Value | null;
  onChange: (value: Value) => void;
};
