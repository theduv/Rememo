import { CheckCircle, XCircle } from "react-feather";
const fs = window.require("fs");

const CardResults = ({
  onClickResult,
  clickedShow,
  deckData,
  cardData,
  setCurrentResults,
}) => {
  const onClickCorrect = () => {
    if (!clickedShow) return;

    setCurrentResults((oldResults) => ({
      ...oldResults,
      right: oldResults.right + 1,
    }));

    const data = fs.readFileSync("src/data/decks.json");
    const parsedDecks = JSON.parse(data);
    const targetDeck = parsedDecks.find((deck) => deck.id === deckData.id);
    const targetCard = targetDeck.cards.find((card) => card.id === cardData.id);
    targetCard.lastResult = "right";
    fs.writeFileSync("src/data/decks.json", JSON.stringify(parsedDecks));

    onClickResult();
  };

  const onClickIncorrect = () => {
    if (!clickedShow) return;

    setCurrentResults((oldResults) => ({
      ...oldResults,
      wrong: oldResults.wrong + 1,
    }));

    const data = fs.readFileSync("src/data/decks.json");
    const parsedDecks = JSON.parse(data);
    const targetDeck = parsedDecks.find((deck) => deck.id === deckData.id);
    const targetCard = targetDeck.cards.find((card) => card.id === cardData.id);
    targetCard.lastResult = "wrong";
    fs.writeFileSync("src/data/decks.json", JSON.stringify(parsedDecks));

    onClickResult();
  };

  return (
    <div className="flex space-x-12 justify-center">
      <XCircle
        onClick={onClickIncorrect}
        width={32}
        height={32}
        className="text-gray-500 cursor-pointer"
      />
      <CheckCircle
        onClick={onClickCorrect}
        width={32}
        height={32}
        className="text-gray-500 cursor-pointer"
      />
    </div>
  );
};

export default CardResults;
