import clsx from "clsx";
import { Dispatch, Fragment, SetStateAction, useRef, useState } from "react";
import { Star, Trash } from "react-feather";
import ReactTooltip from "react-tooltip";
import { Card } from "../../../Interfaces/card.interface";
import { Deck } from "../../../Interfaces/deck.interface";
import useDecksStore from "../../../stores/decks";
import useSettingsStore from "../../../stores/settings";
import GlobalModal from "../../Shareable/GlobalModal";
import SingleTag from "./SingleTag";

interface CardsListProps {
  cards: Array<Card>;
  setCards: Dispatch<SetStateAction<Array<Card>>>;
  deckData: Deck;
  valueSearch: string;
  tagsSearch: Array<string>;
}

const CardsList = ({
  tagsSearch,
  cards,
  setCards,
  deckData,
  valueSearch,
}: CardsListProps) => {
  const [openModal, setOpenModal] = useState(false);
  const deleteCard = useRef(false);
  const decks = useDecksStore((state: any) => state.decks);
  const setDecks = useDecksStore((state: any) => state.setDecks);
  const settings = useSettingsStore((state: any) => state.settings);
  const setSomethingChanged = useDecksStore(
    (state: any) => state.setSomethingChanged
  );
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
    const newDecks = [...decks];
    const targetDeck = newDecks.find((deck: Deck) => deck.id === deckData.id);
    const targetCards = targetDeck.cards;
    const newCards = targetCards.filter(
      (curCard: { front: string; back: string; fav: boolean }) =>
        curCard.front !== cardRef.current.front &&
        curCard.back !== cardRef.current.back
    );
    targetDeck.cards = newCards;
    setDecks(newDecks);
    setCards(newCards);
  };

  const onClickDelete = (card: Card) => {
    cardRef.current = { ...card };
    setOpenModal(true);
  };

  const onClickFav = (card: Card) => {
    const newDecks = [...decks];
    const targetDeck = newDecks.find((deck: Deck) => deck.id === deckData.id);
    const targetCards = targetDeck.cards;
    const targetCard = targetCards.find(
      (curCard: Card) =>
        curCard.front === card.front && curCard.back === card.back
    );
    targetCard.fav = !!!targetCard.fav;
    setCards(targetCards);
    setDecks(newDecks);
    setSomethingChanged(true);
  };

  const onChangeFront = (card: Card, e: any) => {
    const newDecks = [...decks];
    const targetDeck = newDecks.find((deck: Deck) => deck.id === deckData.id);
    const targetCards = targetDeck.cards;
    const targetCard = targetCards.find(
      (curCard: Card) => curCard.id === card.id
    );
    targetCard.front = e.target.value;
    setCards(targetCards);
    setDecks(newDecks);
    setSomethingChanged(true);
  };

  const onChangeBack = (card: Card, e: any) => {
    const newDecks = [...decks];
    const targetDeck = newDecks.find((deck: Deck) => deck.id === deckData.id);
    const targetCards = targetDeck.cards;
    const targetCard = targetCards.find(
      (curCard: Card) => curCard.id === card.id
    );
    targetCard.back = e.target.value;
    setCards(targetCards);
    setDecks(newDecks);
    setSomethingChanged(true);
  };

  const getFavColor = (isFav: boolean) => {
    if (isFav) {
      return "orange";
    }
    if (settings.darkMode) {
      return "black";
    }
    return "white";
  };

  const getNextTag = (tag: string | undefined) => {
    const order = ["P", "O", "G", "B", "W", "R", undefined];
    if (tag === undefined) {
      return order[0];
    }
    const indexTag = order.findIndex((currentTag) => tag === currentTag);

    if (indexTag < order.length - 1) return order[indexTag + 1];
    else return order[0];
  };

  const onClickTag = (cardID: string) => {
    const newDecks = [...decks];
    const targetDeck = newDecks.find((deck: Deck) => deck.id === deckData.id);
    const targetCards = targetDeck.cards;
    const targetCard = targetCards.find(
      (curCard: Card) => curCard.id === cardID
    );
    targetCard.tag = getNextTag(targetCard.tag);
    setCards(targetCards);
    setDecks(newDecks);
    setSomethingChanged(true);
  };

  return (
    <div
      style={{ minHeight: "69vmin", minWidth: "89vmin", maxWidth: "80%" }}
      className="p-6 border border-gray-600 rounded-lg justify-center mt-8 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-500"
    >
      <div className="grid grid-cols-2 gap-x-4 gap-y-4 items-center">
        {cards
          .filter((card) => {
            return (
              (card.front.toLowerCase().includes(valueSearch.toLowerCase()) ||
                card.back.toLowerCase().includes(valueSearch.toLowerCase()) ||
                valueSearch === "") &&
              (!card.tag || tagsSearch.includes(card.tag))
            );
          })
          .map((card) => (
            <Fragment key={card.id}>
              <div className="flex space-x-2 items-center">
                <SingleTag
                  cardID={card.id}
                  onClickTag={onClickTag}
                  tag={card.tag}
                />
                <input
                  type="text"
                  onChange={(e) => onChangeFront(card, e)}
                  className={clsx("py-1  px-3 rounded-lg w-full", {
                    "bg-gray-900 text-gray-200": settings.darkMode,
                  })}
                  value={card.front}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  onChange={(e) => onChangeBack(card, e)}
                  className={clsx("py-1 px-3 rounded-lg w-full", {
                    "bg-gray-900 text-gray-200": settings.darkMode,
                  })}
                  value={card.back}
                ></input>
                <div className="flex items-center ml-24 space-x-3">
                  <div
                    className="cursor-pointer"
                    onClick={() => onClickFav(card)}
                  >
                    <Star fill={getFavColor(card.fav)} color="orange" />
                  </div>
                  <div
                    className="text-gray-500 cursor-pointer"
                    onClick={() => onClickDelete(card)}
                  >
                    <Trash
                      className={clsx({ "text-white": settings.darkMode })}
                    />
                  </div>
                </div>
              </div>
            </Fragment>
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
      <ReactTooltip />
    </div>
  );
};

export default CardsList;
