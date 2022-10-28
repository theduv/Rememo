import { Book, Settings } from "react-feather";
import { Link } from "react-router-dom";

const Header = ({ title }) => {
  return (
    <div className="flex justify-between  items-center bg-gray-600 text-white px-4 py-2 mb-12">
      <div className="flex space-x-5 items-center">
        <Link to="/">
          <h1 className="text-3xl">ɘЯmemo</h1>
        </Link>
        <div className="flex space-x-4">
          <Link to="/decks">
            <Book />
          </Link>
          <Link to="/settings">
            <Settings />
          </Link>
        </div>
      </div>
      <div>
        <h1 className="text-xl">{title}</h1>
      </div>
      <div></div>
    </div>
  );
};

export default Header;
