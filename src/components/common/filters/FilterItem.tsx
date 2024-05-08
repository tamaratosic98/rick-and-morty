import { useDebounce } from "@uidotdev/usehooks";
import { Input, Select } from "antd";
import { useEffect, useState } from "react";
import { Filter } from "../../../utils/types";

const FilterItem = ({
  filter,
  isMobile,
}: {
  filter: Filter;
  isMobile?: boolean;
}) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const fn = async () => {
      if (debouncedValue && !isMobile) {
        filter.onChange(debouncedValue);
      }
    };

    !isMobile && fn();
  }, [debouncedValue]);

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const renderFilterItem = () => {
    switch (filter.type) {
      case "text":
        return (
          <Input
            type={filter.type}
            value={value}
            key={filter.field}
            placeholder={filter.placeholder || "Search..."}
            onChange={handleChange}
            onPressEnter={(event) =>
              filter.onChange((event.target as any).value)
            }
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
            key={filter.field}
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

  return renderFilterItem();
};

export default FilterItem;
