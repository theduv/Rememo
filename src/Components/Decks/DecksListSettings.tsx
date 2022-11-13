import { Deck } from "../../Interfaces/deck.interface";
import useDecksStore from "../../stores/decks";
import DeckPreviewSettings from "./DeckPreviewSettings";

const DecksListSettings = () => {
  const decks = useDecksStore((state: any) => state.decks);

  return (
    <div className="flex flex-col space-y-2">
      {decks.map((deck: Deck) => (
        <DeckPreviewSettings key={deck.id} deck={deck} />
      ))}
    </div>
  );
};

export default DecksListSettings;
