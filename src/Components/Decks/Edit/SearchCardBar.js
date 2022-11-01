import { Search } from "react-feather";

const SearchCardBar = ({ valueSearch, setValueSearch }) => {
  const onChangeSearch = (e) => {
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
