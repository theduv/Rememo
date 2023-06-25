import clsx from "clsx";
import { Book, Settings } from "react-feather";
import { Link } from "react-router-dom";
import useSettingsStore from "../../stores/settings";
import SaveChanges from "./SaveChanges";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const settings = useSettingsStore((state: any) => state.settings);

  return (
    <div
      className={clsx(
        "flex items-center bg-gray-600 text-white px-4 py-5 mb-12 ",
        {
          "bg-gray-800": settings.theme === "defaultDark",
          "bg-gwen-black text-gwen-white": settings.theme === "gwen",
        }
      )}
    >
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
      <div className="flex-1 justify-end flex items-center space-x-2">
        <SaveChanges />
      </div>
    </div>
  );
};

export default Header;
