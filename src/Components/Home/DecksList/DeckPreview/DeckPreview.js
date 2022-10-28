import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

const DeckPreview = ({ deck }) => {
  return (
    <Link to={`/deck/${deck.id}`}>
      <button
        data-tip={deck.name}
        className="w-64 overflow-hidden bg-gray-600 text-white text-4xl rounded-lg px-4 py-2"
      >
        {deck.name}
      </button>
      <ReactTooltip />
    </Link>
  );
};

export default DeckPreview;
