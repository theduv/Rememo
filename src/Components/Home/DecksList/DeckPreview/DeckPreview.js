import { Book } from "react-feather";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

const DeckPreview = ({ deck }) => {
  return (
    <Link to={`/deck/${deck.id}`}>
      <button
        data-tip={deck.name}
        className="w-64 flex items-center justify-between overflow-ellipsis bg-gray-600 text-white text-2xl rounded-lg px-4 py-2"
      >
        {deck.name}
        <div className="flex items-center space-x-2 text-base">
          <Book height={20} width={20} />
          <h1>{deck.numberOfCards}</h1>
        </div>
      </button>
      <ReactTooltip />
    </Link>
  );
};

export default DeckPreview;
