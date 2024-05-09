import { FilterOutlined } from "@ant-design/icons";
import { Flex, FloatButton, Input } from "antd";
import { useState } from "react";
import { FilterToolbarProps } from "../../../utils/types";
import { FilterDrawer } from "./FilterDrawer";
import FilterItem from "./FilterItem";
import "./filterToolbar.css";

const { Search } = Input;

const FilterToolbar = ({
  filters,
  includeSearch,
  onSearch,
  searchPlaceholder,
  searchLoading,
  applyAllHandler: applyAllFilters,
}: FilterToolbarProps) => {
  const [open, setOpen] = useState(false);

  const onCloseDrawerHandler = () => {
    setOpen(false);
  };

  const openDrawerHandler = () => {
    setOpen(true);
  };

  return (
    <>
      <Flex align="center" className="filter-toolbar p-2" gap="large" wrap>
        {includeSearch && (
          <Search
            placeholder={searchPlaceholder || "Search..."}
            onSearch={onSearch}
            loading={searchLoading}
            style={{ maxWidth: "300px", minWidth: "150px" }}
            size="large"
            allowClear
          />
        )}
        {filters.map((filter) => (
          <FilterItem filter={filter} key={filter.field} />
        ))}
      </Flex>
      <FloatButton
        className="mobile-filter-button"
        icon={<FilterOutlined />}
        shape="circle"
        onClick={openDrawerHandler}
      />
      <FilterDrawer
        includeSearch={includeSearch}
        onSearch={onSearch}
        searchPlaceholder={searchPlaceholder}
        searchLoading={searchLoading}
        filters={filters}
        open={open}
        onCloseDrawer={onCloseDrawerHandler}
        applyAllHandler={applyAllFilters}
      />
    </>
  );
};

export default FilterToolbar;
