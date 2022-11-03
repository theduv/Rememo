import React, { Dispatch, SetStateAction } from "react";
import { Search } from "react-feather";

interface SearchCardBarProps {
  valueSearch: string;
  setValueSearch: Dispatch<SetStateAction<string>>;
}

const SearchCardBar = ({ valueSearch, setValueSearch }: SearchCardBarProps) => {
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(e.target.value);
  };

  return (
    <div className="flex space-x-4 items-center justify-center">
      <input
        placeholder="Search for a card"
        className="rounded-lg bg-gray-200 py-2 px-4"
        value={valueSearch}
        onChange={onChangeSearch}
      />
      <Search />
    </div>
  );
};

export default SearchCardBar;
