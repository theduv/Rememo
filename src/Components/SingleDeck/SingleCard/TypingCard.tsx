import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Card } from "../../../Interfaces/card.interface";
import { Deck } from "../../../Interfaces/deck.interface";

interface TypingCardProps {
  cardData: Card;
  setCurrentCard: Dispatch<SetStateAction<number>>;
  deckData: Deck;
  setCurrentResults: Dispatch<SetStateAction<{ right: number; wrong: number }>>;
}

const TypingCard = ({
  cardData,
  setCurrentCard,
  deckData,
  setCurrentResults,
}: TypingCardProps) => {
  const [arrayBack, setArrayBack] = useState(cardData.back.split(""));
  const [value, setValue] = useState("");
  const currentKey = useRef(0);

  useEffect(() => {
    setArrayBack(cardData.back.split(""));
    if (value.toLowerCase() === cardData.back.toLowerCase()) {
      setValue("");
      setCurrentCard((oldCard) => oldCard + 1);
      currentKey.current = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, cardData]);

  const onChangeInput = (e: any) => {
    const goodLetter = arrayBack[currentKey.current];
    const letters = e.target.value.split("");
    const lastLetter = letters[letters.length - 1];

    if (lastLetter && lastLetter.toLowerCase() === goodLetter.toLowerCase()) {
      setValue(e.target.value.toUpperCase());
      currentKey.current++;
    }
  };

  return (
    <div className="flex space-y-8 flex-col items-center justify-center h-full mt-32">
      <h1 className="text-6xl">{cardData.front}</h1>
      <div>
        <input
          type="text"
          className="bg-gray-900 text-6xl text-green-200 text-center focus:outline-none"
          onChange={onChangeInput}
          value={value}
        />
      </div>
    </div>
  );
};

export default TypingCard;
