import { Link } from "react-router-dom";

const DeckPreview = ({ deck }) => {
  return (
    <Link to={`/deck/${deck.id}`}>
      <button className="bg-gray-600 text-white text-4xl rounded-lg px-4 py-2">
        {deck.name}
      </button>
    </Link>
  );
};

export default DeckPreview;
