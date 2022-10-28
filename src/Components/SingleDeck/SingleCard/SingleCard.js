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
    <div className="flex flex-col space-y-4 items-center w-full">
      <div className="border-2 rounded-lg p-6 w-1/6 flex flex-col items-center space-y-8">
        <h1>{cardData.front}</h1>
        <div className="border w-full border-gray-700" />
        {!clickedShow && (
          <button onClick={onClickShow} className="italic">
            Show answer
          </button>
        )}
        {clickedShow && <h1>{cardData.back}</h1>}
      </div>
      <Results onClickResult={onClickResult} clickedShow={clickedShow} />
    </div>
  );
};

export default SingleCard;
