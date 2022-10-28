import { Link } from "react-router-dom";
import DeckPreview from "./DeckPreview/DeckPreview";

const DecksList = ({ decks }) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      {decks.map((deck) => (
        <DeckPreview deck={deck} />
      ))}
    </div>
  );
};

export default DecksList;
