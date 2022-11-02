import { Star, XCircle } from "react-feather";
const fs = window.require("fs");

const CardsList = ({ cards, setCards, deckData, valueSearch }) => {
  const onClickDelete = (card) => {
    const data = fs.readFileSync("src/data/decks.json", "utf8");
    const parsedData = JSON.parse(data);
    const targetDeck = parsedData.find((deck) => deck.id === deckData.id);
    const targetCards = targetDeck.cards;
    const newCards = targetCards.filter(
      (curCard) => curCard.front !== card.front && curCard.back !== card.back
    );
    targetDeck.cards = newCards;
    targetDeck.numberOfCards--;
    setCards(newCards);
    fs.writeFileSync("src/data/decks.json", JSON.stringify(parsedData));
  };

  const onClickFav = (card) => {
    const data = fs.readFileSync("src/data/decks.json", "utf8");
    const parsedData = JSON.parse(data);
    const targetDeck = parsedData.find((deck) => deck.id === deckData.id);
    const targetCards = targetDeck.cards;
    const targetCard = targetCards.find(
      (curCard) => curCard.front === card.front && curCard.back === card.back
    );
    console.log(targetCard.front);
    targetCard.fav = !!!targetCard.fav;
    setCards(targetCards);
    fs.writeFileSync("src/data/decks.json", JSON.stringify(parsedData));
  };

  return (
    <div className="flex items-center justify-center mt-8 max-w-1/4 overflow-y-auto h-1/2">
      <div className="grid grid-cols-4 gap-y-4 items-center w-2/3">
        <h1 className="py-2 px-4 italic text-lg rounded-lg font-bold">Front</h1>
        <h1 className="py-2 px-4 italic text-lg rounded-lg font-bold">Back</h1>
        <div></div>
        <div></div>
        {cards
          .filter(
            (card) =>
              card.front.toLowerCase().includes(valueSearch.toLowerCase()) ||
              card.back.toLowerCase().includes(valueSearch.toLowerCase())
          )
          .map((card) => (
            <>
              <div className="py-1 px-3 rounded-lg">{card.front}</div>
              <div className="py-1 px-3 rounded-lg">{card.back}</div>
              <div
                className="text-gray-500 cursor-pointer"
                onClick={() => onClickDelete(card)}
              >
                <XCircle />
              </div>
              <div className="cursor-pointer" onClick={() => onClickFav(card)}>
                <Star fill={card.fav ? "orange" : "white"} color="orange" />
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default CardsList;
