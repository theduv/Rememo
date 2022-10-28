import { Link } from "react-router-dom";
import DeckPreview from "./DeckPreview/DeckPreview";

const DecksList = ({ decks }) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      {decks.length ? (
        decks.map((deck) => <DeckPreview deck={deck} />)
      ) : (
        <div>
          You didn't create a deck yet.{" "}
          <Link to="/decks" className="text-blue-400">
            Go create one!
          </Link>
        </div>
      )}
    </div>
  );
};

export default DecksList;
