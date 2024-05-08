import { Filter } from "../../utils/types";
import FilterToolbar from "../common/filters/FilterToolbar";

export const CharacterList = () => {
  const filters: Filter[] = [
    {
      field: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter name...",
      onChange: () => console.log("Name filter"),
    },
    {
      field: "species",
      label: "Species",
      type: "select",
      placeholder: "Select species...",
      options: [
        { label: "Alive", value: "alive" },
        { label: "Dead", value: "dead" },
        { label: "unknown", value: "unknown" },
      ],
      onChange: () => console.log("Species filter"),
    },
    {
      field: "status",
      label: "Status",
      type: "select",
      placeholder: "Select status...",
      options: [
        { label: "Alive", value: "alive" },
        { label: "Dead", value: "dead" },
        { label: "unknown", value: "unknown" },
      ],
      onChange: () => console.log("Status filter"),
    },
    {
      field: "gender",
      label: "Gender",
      type: "select",
      placeholder: "Select gender...",
      options: [
        { label: "Female", value: "female" },
        { label: "Male", value: "male" },
        { label: "Genderless", value: "genderless" },
        { label: "unknown", value: "unknown" },
      ],
      onChange: () => console.log("Status filter"),
    },
  ];
  return (
    <>
      <FilterToolbar filters={filters} includeSearch />
    </>
  );
};
