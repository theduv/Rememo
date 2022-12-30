import { Dispatch, SetStateAction } from "react";

interface DeckDoneProps {
  setCurrentCard: Dispatch<SetStateAction<number>>;
  setCurrentResults: Dispatch<SetStateAction<{ wrong: number; right: number }>>;
  currentResults: { wrong: number; right: number };
  isTyping: boolean;
  startTime: Date;
}

const DeckDone = ({
  startTime,
  setCurrentCard,
  setCurrentResults,
  currentResults,
  isTyping,
}: DeckDoneProps) => {
  const finalTime = new Date().valueOf() - startTime.valueOf();

  const onClickAgain = () => {
    setCurrentCard(0);
    setCurrentResults({ wrong: 0, right: 0 });
  };

  return (
    <div className="flex flex-col items-center space-y-4 text-xl">
      {isTyping ? (
        <div>
          <h1>You completed this deck !</h1>
          <h1>
            Completion time:{" "}
            {new Date(finalTime).getMinutes().toString().padStart(2, "0")}:
            {new Date(finalTime).getSeconds().toString().padStart(2, "0")}
          </h1>
        </div>
      ) : (
        <h1>
          You completed this deck ! You got {currentResults.wrong} wrong and{" "}
          {currentResults.right} right !{" "}
        </h1>
      )}
      <h1
        className="text-blue-400 font-bold cursor-pointer"
        onClick={onClickAgain}
      >
        Do it again
      </h1>
    </div>
  );
};

export default DeckDone;
