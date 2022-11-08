import { Book } from "react-feather";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { Deck } from "../../../../Interfaces/deck.interface";

interface DeckPreviewProps {
  deck: Deck;
}

const DeckPreview = ({ deck }: DeckPreviewProps) => {
  return (
    <Link to={`/deck/${deck.id}`}>
      <button
        data-tip={deck.name}
        className="w-96 flex text-4xl items-center justify-between overflow-ellipsis bg-gray-600 text-white rounded-lg px-4 py-2"
      >
        {deck.name}
        <div className="flex items-center space-x-2 text-base">
          <Book height={30} width={30} />
          <h1 className="text-4xl">{deck.numberOfCards}</h1>
        </div>
      </button>
      <ReactTooltip />
    </Link>
  );
};

export default DeckPreview;
