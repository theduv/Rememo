import clsx from "clsx";
import { useState } from "react";
import { useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { CheckCircle, XCircle } from "react-feather";
import { Card } from "../../../../Interfaces/card.interface";
import { Deck } from "../../../../Interfaces/deck.interface";
import useDecksStore from "../../../../stores/decks";
import useSettingsStore from "../../../../stores/settings";
interface CardResultsProps {
  onClickResult: () => void;
  clickedShow: boolean;
  deckData: Deck;
  cardData: Card;
  setCurrentResults: Dispatch<SetStateAction<{ wrong: number; right: number }>>;
}

const CardResults = ({
  onClickResult,
  clickedShow,
  deckData,
  cardData,
  setCurrentResults,
}: CardResultsProps) => {
  const [keyPressed, setKeyPressed] = useState("undefined");
  const decks = useDecksStore((state: any) => state.decks);
  const settings = useSettingsStore((state: any) => state.settings);
  const setDecks = useDecksStore((state: any) => state.setDecks);
  const setSomethingChanged = useDecksStore(
    (state: any) => state.setSomethingChanged
  );

  useEffect(() => {
    if (keyPressed === "d") onClickAnswer("right");
    if (keyPressed === "a") onClickAnswer("wrong");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyPressed]);

  useEffect(() => {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      setKeyPressed(event.key);
    });
  });

  const onClickAnswer = (answer: string) => {
    if (!clickedShow) return;

    if (answer === "right") {
      setCurrentResults((oldResults) => ({
        ...oldResults,
        right: oldResults.right + 1,
      }));
    } else {
      setCurrentResults((oldResults) => ({
        ...oldResults,
        wrong: oldResults.wrong + 1,
      }));
    }

    const newDecks = [...decks];

    const targetDeck = newDecks.find((deck: Deck) => deck.id === deckData.id);
    const targetCard = targetDeck.cards.find(
      (card: Deck) => card.id === cardData.id
    );
    targetCard.lastResult = answer;
    setDecks(newDecks);
    setSomethingChanged(true);
    onClickResult();
  };

  return (
    <div className="flex space-x-12 justify-center">
      <XCircle
        onClick={() => onClickAnswer("wrong")}
        width={32}
        height={32}
        className={clsx("cursor-pointer ", {
          "text-gray-500": settings.darkMode === false,
        })}
      />
      <CheckCircle
        onClick={() => onClickAnswer("right")}
        width={32}
        height={32}
        className={clsx("cursor-pointer ", {
          "text-gray-500": settings.darkMode === false,
        })}
      />
    </div>
  );
};

export default CardResults;
