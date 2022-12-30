import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Card } from "../../../Interfaces/card.interface";

interface TypingCardProps {
  cardData: Card;
  setLives: Dispatch<SetStateAction<{ max: number; left: number }>>;
  setCurrentCard: Dispatch<SetStateAction<number>>;
}

const TypingCard = ({
  cardData,
  setCurrentCard,
  setLives,
}: TypingCardProps) => {
  const [arrayBack, setArrayBack] = useState(cardData.back.split(""));
  const [value, setValue] = useState("");
  const currentKey = useRef(0);
  const processing = useRef(false);

  useEffect(() => {
    setArrayBack(cardData.back.split(""));
    if (value.toLowerCase() === cardData.back.toLowerCase()) {
      setTimeout(() => {
        setValue("");
        setCurrentCard((oldCard) => oldCard + 1);
        currentKey.current = 0;
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, cardData]);

  const onChangeInput = (e: any) => {
    const goodLetter = arrayBack[currentKey.current];
    const letters = e.target.value.split("");
    const lastLetter = letters[letters.length - 1];

    if (processing.current) return;
    if (lastLetter && lastLetter.toLowerCase() === goodLetter.toLowerCase()) {
      setValue(e.target.value.toUpperCase());
      currentKey.current++;
    } else {
      processing.current = true;
      const oldValue = value;
      setValue(e.target.value.toUpperCase());
      setTimeout(() => {
        setLives((oldLives) => ({ ...oldLives, left: oldLives.left - 1 }));
        setValue(oldValue);
        processing.current = false;
      }, 500);
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
