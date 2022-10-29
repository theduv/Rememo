import { useState } from "react";
import Results from "./CardResults/CardResults";

const SingleCard = ({ cardData, setCurrentCard }) => {
  const [clickedShow, setClickedShow] = useState(false);

  const onClickShow = () => {
    setClickedShow(true);
  };

  const onClickResult = () => {
    setCurrentCard((oldCardIndex) => oldCardIndex + 1);
    setClickedShow(false);
  };

  return (
    <div className="flex flex-col space-y-4 items-center w-full h-full">
      <div className="border-2 border-gray-400 rounded-lg p-6 w-1/5 flex flex-col justify-between h-96">
        <h1 className="m-auto text-3xl">{cardData.front}</h1>
        <div className="border w-full border-gray-300" />
        {clickedShow ? (
          <h1 className="m-auto text-3xl">{cardData.back}</h1>
        ) : (
          <button onClick={onClickShow} className="m-auto italic text-3xl">
            Show answer
          </button>
        )}
      </div>
      <Results onClickResult={onClickResult} clickedShow={clickedShow} />
    </div>
  );
};

export default SingleCard;
