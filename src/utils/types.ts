import { Character } from '../modules/character/character.types';

type FilterType = 'text' | 'select';

type FilterSelectOption = {
  label: string;
  value: string;
};

export type Filter = {
  field: string;
  label: string;
  type: FilterType;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: Array<FilterSelectOption>;
};

export interface FilterToolbarProps {
  filters: Array<Filter>;
  applyAllHandler: (filters: Partial<Character>) => void;
  onSearch: (query: string) => void;
  includeSearch?: boolean;
  searchLoading?: boolean;
  searchPlaceholder?: string;
}

export interface FilterDrawerProps extends FilterToolbarProps {
  open: boolean;
  onCloseDrawer: () => void;
}

export type GetResponse<T> = {
  results: T;
  pages: number;
  total: number;
};
