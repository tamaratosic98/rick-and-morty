import { FilterOutlined } from "@ant-design/icons";
import { Button, Drawer, Flex, FloatButton, Input, Select } from "antd";
import { useState } from "react";
import { Filter, FilterToolbarProps } from "../../../utils/types";
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

  const renderFilterItem = ({
    filter,
    isMobile,
  }: {
    filter: Filter;
    isMobile?: boolean;
  }) => {
    switch (filter.type) {
      case "text":
        return (
          <Input
            type="text"
            placeholder={filter.placeholder || "Search..."}
            onChange={filter.onChange}
            onPressEnter={filter.onChange}
            style={
              isMobile
                ? { width: "100%" }
                : { maxWidth: "300px", minWidth: "200px" }
            }
            size="large"
          />
        );
      case "select":
        return (
          <Select
            mode="multiple"
            placeholder={filter.placeholder || "Select..."}
            onChange={filter.onChange}
            options={filter.options}
            style={
              isMobile
                ? { width: "100%" }
                : { width: "300px", minWidth: "200px" }
            }
            size="large"
          />
        );
      default:
        return null;
    }
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
        {filters.map((filter) => renderFilterItem({ filter }))}
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
          {filters.map((filter) =>
            renderFilterItem({ filter, isMobile: true })
          )}
          <Button block size="large">
            Apply
          </Button>
        </Flex>
      </Drawer>
    </>
  );
};

export default FilterToolbar;
