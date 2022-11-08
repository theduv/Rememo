import clsx from "clsx";
import React, { Dispatch, SetStateAction } from "react";
import { Search } from "react-feather";
import useSettingsStore from "../../../stores/settings";

interface SearchCardBarProps {
  valueSearch: string;
  setValueSearch: Dispatch<SetStateAction<string>>;
}

const SearchCardBar = ({ valueSearch, setValueSearch }: SearchCardBarProps) => {
  const settings = useSettingsStore((state: any) => state.settings);
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(e.target.value);
  };

  return (
    <div className="flex space-x-4 items-center justify-center">
      <input
        placeholder="Search for a card"
        className={clsx("rounded-lg  py-2 px-4", {
          "bg-gray-700 placeholder:text-gray-300": settings.darkMode,
          "bg-gray-200": settings.darkMode === false,
        })}
        value={valueSearch}
        onChange={onChangeSearch}
      />
      <Search className={clsx({ "text-white": settings.darkMode })} />
    </div>
  );
};

export default SearchCardBar;
