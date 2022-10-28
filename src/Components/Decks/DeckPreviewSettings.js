import { XCircle } from "react-feather";
import { Link } from "react-router-dom";
const fs = window.require("fs");

const DeckPreviewSettings = ({ deck, setDecks }) => {
  const onClickCross = () => {
    const data = fs.readFileSync("src/data/decks.json", "utf8");
    const parsedData = JSON.parse(data);

    const indexDeck = parsedData.map((deck) => deck.id).indexOf(deck.id);
    parsedData.splice(indexDeck, 1);
    fs.writeFileSync("src/data/decks.json", JSON.stringify(parsedData));
    setDecks(parsedData);
  };

  return (
    <div className="grid grid-cols-3 gap-3 items-center">
      <Link to={`/decks/edit/${deck.id}`}>
        <h1 className="text-blue-400 italic font-bold cursor-pointer">
          {deck.name}
        </h1>
      </Link>
      <h1 className="text-sm">
        {deck.numberOfCards} card{deck.numberOfCards > 1 ? "s" : ""}
      </h1>
      <XCircle
        className="text-gray-400 cursor-pointer"
        onClick={onClickCross}
      />
    </div>
  );
};

export default DeckPreviewSettings;
