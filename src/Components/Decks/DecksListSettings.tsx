import { Dispatch, SetStateAction } from "react";
import { Deck } from "../../Interfaces/deck.interface";
import DeckPreviewSettings from "./DeckPreviewSettings";

interface DecksListSettingsProps {
  decks: Array<Deck>;
  setDecks: Dispatch<SetStateAction<Array<Deck>>>;
}

const DecksListSettings = ({ decks, setDecks }: DecksListSettingsProps) => {
  return (
    <div className="flex flex-col space-y-2">
      {decks.map((deck: Deck) => (
        <DeckPreviewSettings deck={deck} setDecks={setDecks} />
      ))}
    </div>
  );
};

export default DecksListSettings;
