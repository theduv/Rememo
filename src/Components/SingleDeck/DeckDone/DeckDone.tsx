import { Dispatch, SetStateAction } from "react";

interface DeckDoneProps {
  setCurrentCard: Dispatch<SetStateAction<number>>;
  setCurrentResults: Dispatch<SetStateAction<{ wrong: number; right: number }>>;
  currentResults: { wrong: number; right: number };
  isTyping: boolean;
}

const DeckDone = ({
  setCurrentCard,
  setCurrentResults,
  currentResults,
  isTyping,
}: DeckDoneProps) => {
  const onClickAgain = () => {
    setCurrentCard(0);
    setCurrentResults({ wrong: 0, right: 0 });
  };

  return (
    <div className="flex flex-col items-center space-y-4 text-xl">
      {isTyping ? (
        <h1>You completed this deck !</h1>
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
