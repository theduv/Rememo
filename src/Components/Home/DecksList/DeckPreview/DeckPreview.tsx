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
        className="w-72 flex text-2xl items-center justify-between bg-slate-600 text-white rounded-2xl space-x-4 px-4 py-2.5"
      >
        <div className="truncate">{deck.name}</div>
        <div className="flex items-center space-x-2 text-base">
          <Book height={20} width={20} />
          <h1 className="text-2xl ">{deck.cards.length}</h1>
        </div>
      </button>
      <ReactTooltip />
    </Link>
  );
};

export default DeckPreview;
