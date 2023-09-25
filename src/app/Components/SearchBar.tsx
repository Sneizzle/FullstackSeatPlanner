"use client";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { PersonConfig } from "@/app/admin/Interface/Interfaces";

function SearchBar({
  data,
  onItemSelect,
}: {
  data: PersonConfig[];
  onItemSelect: (item: PersonConfig) => void;
}) {
  const handleOnSearch = (string: string, results: PersonConfig[]) => {};
  const handleOnHover = (result: PersonConfig) => {};
  const handleOnSelect = (item: PersonConfig) => {
    onItemSelect(item);
  };
  const handleOnFocus = () => {};
  const formatResult = (item: PersonConfig) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          name: {item.name}
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          team: {item.team}
        </span>
      </>
    );
  };
  return (
    <div style={{ width: 370 }}>
      <ReactSearchAutocomplete
        items={data}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        autoFocus
        formatResult={formatResult}
        showIcon={false}
        showClear={false}
        placeholder="Write name here"
      />
    </div>
  );
}
export default SearchBar;
