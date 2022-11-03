import { Link } from "react-router-dom";
import { Deck } from "../../../Interfaces/deck.interface";
import DeckPreview from "./DeckPreview/DeckPreview";

interface DecksListProps {
  decks: Array<Deck>;
}

const DecksList = ({ decks }: DecksListProps) => {
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
