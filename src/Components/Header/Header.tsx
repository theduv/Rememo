import { Book, Settings } from "react-feather";
import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <div className="flex items-center bg-gray-600 text-white px-4 py-5 mb-12">
      <div className="flex space-x-12 items-center flex-1 mr-auto">
        <Link to="/">
          <h1 className="text-5xl">ɘЯmemo</h1>
        </Link>
        <div className="flex space-x-4 items-center">
          <Link to="/decks">
            <Book height={33} width={33} />
          </Link>
          <Link to="/settings">
            <Settings height={33} width={33} />
          </Link>
        </div>
      </div>
      <div>
        <h1 className="text-4xl flex-1">{title}</h1>
      </div>
      <div className="flex-1 justify-end flex">
        <div className="rounded-lg bg-gray-900 py-2 px-4 cursor-pointer ">
          Save changes
        </div>
      </div>
    </div>
  );
};

export default Header;
