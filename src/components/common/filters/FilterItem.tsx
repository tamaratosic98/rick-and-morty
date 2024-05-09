import { useDebounce } from "@uidotdev/usehooks";
import { Input, Select } from "antd";
import { useEffect, useState } from "react";
import { Character } from "../../../models/character";
import { Filter } from "../../../utils/types";

const FilterItem = ({
  filter,
  isMobile,
  setFilters,
}: {
  filter: Filter;
  isMobile?: boolean;
  setFilters?: (filters: Partial<Character>) => void;
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
    switch (filter.type) {
      case "select":
        if (isMobile) {
          setValue(event);
          setFilters?.({ [filter.field]: event });
        } else {
          filter.onChange(event);
        }
        break;
      default:
        setValue(event.target?.value);
        if (isMobile) {
          setFilters?.({ [filter.field]: event.target?.value });
        }
        break;
    }
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
            onChange={handleChange}
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
