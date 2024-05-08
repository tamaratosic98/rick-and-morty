import { FilterOutlined } from "@ant-design/icons";
import { Button, Drawer, Flex, FloatButton, Input } from "antd";
import { useState } from "react";
import { FilterToolbarProps } from "../../../utils/types";
import FilterItem from "./FilterItem";
import "./filterToolbar.css";

const { Search } = Input;

const FilterToolbar = (props: FilterToolbarProps) => {
  const { filters, includeSearch, onSearch, searchPlaceholder, searchLoading } =
    props;
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
            allowClear
            loading={searchLoading}
            style={{ maxWidth: "300px", minWidth: "150px" }}
            size="large"
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
      <Drawer title="Choose filters" onClose={onCloseDrawerHandler} open={open}>
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
            <FilterItem filter={filter} isMobile key={filter.field} />
          ))}
          <Button block size="large">
            Apply
          </Button>
        </Flex>
      </Drawer>
    </>
  );
};

export default FilterToolbar;
