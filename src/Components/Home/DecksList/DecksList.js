import DeckPreview from "./DeckPreview/DeckPreview";

const DecksList = ({ decks }) => {
  return (
    <div className="grid grid-cols-4 gap-y-6 items-center justify-center">
      {decks.map((deck) => (
        <DeckPreview deck={deck} />
      ))}
    </div>
  );
};

export default DecksList;
