import { Dispatch, SetStateAction } from "react";
import { Deck } from "../../Interfaces/deck.interface";
import useDecksStore from "../../stores/decks";
import DeckPreviewSettings from "./DeckPreviewSettings";

interface DecksListSettingsProps {}

const DecksListSettings = ({}: DecksListSettingsProps) => {
  const decks = useDecksStore((state: any) => state.decks);

  return (
    <div className="flex flex-col space-y-2">
      {decks.map((deck: Deck) => (
        <DeckPreviewSettings deck={deck} />
      ))}
    </div>
  );
};

export default DecksListSettings;
