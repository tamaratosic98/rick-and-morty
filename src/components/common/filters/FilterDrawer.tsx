import { Button, Drawer, Flex } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { Character } from "../../../models/character";
import { FilterDrawerProps } from "../../../utils/types";
import FilterItem from "./FilterItem";

export const FilterDrawer = ({
  filters,
  includeSearch,
  onSearch,
  searchLoading,
  searchPlaceholder,
  onCloseDrawer,
  open,
  applyAllHandler,
}: FilterDrawerProps) => {
  const [appliedFilters, setAppliedFilters] = useState<Partial<Character>>({});

  const applyFiltersHandler = () => {
    applyAllHandler(appliedFilters);
    onCloseDrawer();
  };

  const handleSetAppliedFilters = (filters: Partial<Character>) => {
    setAppliedFilters({ ...appliedFilters, ...filters });
  };

  return (
    <Drawer title="Choose filters" onClose={onCloseDrawer} open={open}>
      <Flex align="center" className="p-2" gap="large" vertical wrap>
        {includeSearch && (
          <Search
            placeholder={searchPlaceholder || "Search..."}
            onSearch={onSearch}
            allowClear
            loading={searchLoading}
            style={{ width: "100%" }}
            size="large"
          />
        )}
        {filters.map((filter) => (
          <FilterItem
            filter={filter}
            key={filter.field}
            isMobile={true}
            setFilters={handleSetAppliedFilters}
          />
        ))}
        <Button block size="large" onClick={applyFiltersHandler}>
          Apply
        </Button>
      </Flex>
    </Drawer>
  );
};
