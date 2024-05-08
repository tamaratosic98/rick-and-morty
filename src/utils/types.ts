type FilterType = "text" | "select";
type FilterSelectOption = {
  label: string;
  value: string;
};
export type Filter = {
  field: string;
  label: string;
  type: FilterType;
  options?: Array<FilterSelectOption>;
  placeholder?: string;
  onChange?: () => void;
};

export type FilterToolbarProps = {
  filters: Array<Filter>;
  includeSearch?: boolean;
  onSearch?: () => void;
  searchPlaceholder?: string;
  searchLoading?: boolean;
};
