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
  const handleOnSearch = (string: string, results: PersonConfig[]) => {
    console.log(string, results);
    console.log("this is handle on search ting");
  };

  const handleOnHover = (result: PersonConfig) => {
    console.log(result);
  };

  const handleOnSelect = (item: PersonConfig) => {
    onItemSelect(item);
  };
  const handleOnFocus = () => {
    console.log("Focused");
  };
  const formatResult = (item: PersonConfig) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          id: {item.id}
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          name: {item.name}
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          location: {item.location}
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
