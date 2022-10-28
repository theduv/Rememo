import DeckPreviewSettings from "./DeckPreviewSettings";

const DecksListSettings = ({ decks, setDecks }) => {
  return (
    <div className="flex flex-col space-y-2">
      {decks.map((deck) => (
        <DeckPreviewSettings deck={deck} setDecks={setDecks} />
      ))}
    </div>
  );
};

export default DecksListSettings;
