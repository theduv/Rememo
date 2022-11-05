import { XCircle } from "react-feather";
import { Link } from "react-router-dom";
import { Deck } from "../../Interfaces/deck.interface";
import useDecksStore from "../../stores/decks";

interface DeckPreviewSettingsProps {
  deck: Deck;
}

const DeckPreviewSettings = ({ deck }: DeckPreviewSettingsProps) => {
  const decks = useDecksStore((state: any) => state.decks);
  const setDecks = useDecksStore((state: any) => state.setDecks);
  const setSomethingChanged = useDecksStore(
    (state: any) => state.setSomethingChanged
  );

  const onClickCross = () => {
    const newDecks = [...decks];
    const indexDeck = decks
      .map((deck: { id: number }) => deck.id)
      .indexOf(deck.id);
    newDecks.splice(indexDeck, 1);
    setDecks(newDecks);
    setSomethingChanged(true);
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
