import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Star, Trash } from "react-feather";
import { Card } from "../../../Interfaces/card.interface";
import { Deck } from "../../../Interfaces/deck.interface";
import GlobalModal from "../../Shareable/GlobalModal";
const fs = window.require("fs");

interface CardsListProps {
  cards: Array<Card>;
  setCards: Dispatch<SetStateAction<Array<Card>>>;
  deckData: Deck;
  valueSearch: string;
}

const CardsList = ({
  cards,
  setCards,
  deckData,
  valueSearch,
}: CardsListProps) => {
  const [openModal, setOpenModal] = useState(false);
  const deleteCard = useRef(false);
  const cardRef = useRef({ ...cards[0] });

  const onClickYesDelete = () => {
    deleteCard.current = true;
    handleCloseModal();
  };

  const onClickNoDelete = () => {
    setOpenModal(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    if (deleteCard.current === false) return;
    const data = fs.readFileSync("src/data/decks.json", "utf8");
    const parsedData = JSON.parse(data);
    const targetDeck = parsedData.find((deck: Deck) => deck.id === deckData.id);
    const targetCards = targetDeck.cards;
    const newCards = targetCards.filter(
      (curCard: { front: string; back: string; fav: boolean }) =>
        curCard.front !== cardRef.current.front &&
        curCard.back !== cardRef.current.back
    );
    targetDeck.cards = newCards;
    targetDeck.numberOfCards--;
    setCards(newCards);
    fs.writeFileSync("src/data/decks.json", JSON.stringify(parsedData));
  };

  const onClickDelete = (card: Card) => {
    cardRef.current = { ...card };
    setOpenModal(true);
  };

  const onClickFav = (card: Card) => {
    const data = fs.readFileSync("src/data/decks.json", "utf8");
    const parsedData = JSON.parse(data);
    const targetDeck = parsedData.find((deck: Deck) => deck.id === deckData.id);
    const targetCards = targetDeck.cards;
    const targetCard = targetCards.find(
      (curCard: Card) =>
        curCard.front === card.front && curCard.back === card.back
    );
    console.log(targetCard.front);
    targetCard.fav = !!!targetCard.fav;
    setCards(targetCards);
    fs.writeFileSync("src/data/decks.json", JSON.stringify(parsedData));
  };

  return (
    <div className="flex items-center justify-center mt-8 max-w-1/4 overflow-y-auto">
      <div className="grid grid-cols-2 mb-12 gap-y-4 items-center w-1/3">
        {cards
          .filter(
            (card) =>
              card.front.toLowerCase().includes(valueSearch.toLowerCase()) ||
              card.back.toLowerCase().includes(valueSearch.toLowerCase())
          )
          .map((card) => (
            <>
              <div className="py-1 px-3 rounded-lg">{card.front}</div>
              <div className="grid grid-cols-2 items-center">
                <div className="py-1 px-3 rounded-lg">{card.back}</div>
                <div className="flex items-center space-x-3">
                  <div
                    className="cursor-pointer"
                    onClick={() => onClickFav(card)}
                  >
                    <Star fill={card.fav ? "orange" : "white"} color="orange" />
                  </div>
                  <div
                    className="text-gray-500 cursor-pointer"
                    onClick={() => onClickDelete(card)}
                  >
                    <Trash />
                  </div>
                </div>
              </div>
            </>
          ))}
      </div>
      <GlobalModal
        openModal={openModal}
        title="Remove a card"
        handleClose={handleCloseModal}
      >
        <div>
          <h3>
            Do you really want to remove this card ? (front:{" "}
            {cardRef.current.front} | back: {cardRef.current.back})
          </h3>
          <div className="flex space-x-4 mt-8">
            <button
              className="rounded-lg bg-gray-500 text-white px-4 py-2"
              onClick={onClickYesDelete}
            >
              Yes
            </button>
            <button
              onClick={onClickNoDelete}
              className="rounded-lg bg-gray-500 text-white px-4 py-2"
            >
              No
            </button>
          </div>
        </div>
      </GlobalModal>
    </div>
  );
};

export default CardsList;