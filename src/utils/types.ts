import { Character } from "../models/character";

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
  onChange: (value: string) => void;
};

export interface FilterToolbarProps {
  filters: Array<Filter>;
  includeSearch?: boolean;
  applyAllHandler: (filters: Partial<Character>) => void;
  onSearch: (query: string) => void;
  searchPlaceholder?: string;
  searchLoading?: boolean;
}

export interface FilterDrawerProps extends FilterToolbarProps {
  onCloseDrawer: () => void;
  open: boolean;
  applyAllHandler: (filters: Partial<Character>) => void;
}
