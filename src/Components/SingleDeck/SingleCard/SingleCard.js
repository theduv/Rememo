import { useState } from "react";
import Results from "./CardResults/CardResults";

const SingleCard = ({
  cardData,
  setCurrentCard,
  deckData,
  setCurrentResults,
}) => {
  const [clickedShow, setClickedShow] = useState(false);

  const onClickShow = () => {
    setClickedShow(true);
  };

  const onClickResult = () => {
    setCurrentCard((oldCardIndex) => oldCardIndex + 1);
    setClickedShow(false);
  };

  return (
    <div className="flex flex-col space-y-12 items-center w-full h-full">
      <div className="border-2 border-gray-400 rounded-lg p-6 w-1/5 flex flex-col justify-between h-96">
        <h1 className="m-auto text-3xl text-center">{cardData.front}</h1>
        <div className="border w-full border-gray-300" />
        {clickedShow ? (
          <h1 className="m-auto text-3xl text-center ">{cardData.back}</h1>
        ) : (
          <button onClick={onClickShow} className="m-auto italic text-3xl">
            Show answer
          </button>
        )}
      </div>
      <Results
        setCurrentResults={setCurrentResults}
        onClickResult={onClickResult}
        clickedShow={clickedShow}
        deckData={deckData}
        cardData={cardData}
      />
    </div>
  );
};

export default SingleCard;
