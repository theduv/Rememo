import clsx from "clsx";
import { CheckCircle, XCircle } from "react-feather";

const CardResults = ({ onClickResult, clickedShow }) => {
  const onClickCorrect = () => {
    if (clickedShow) onClickResult((oldCard) => oldCard + 1);
  };

  const onClickIncorrect = () => {
    if (clickedShow) onClickResult((oldCard) => oldCard + 1);
  };

  return (
    <div className="flex space-x-12 justify-center">
      <XCircle
        onClick={onClickIncorrect}
        width={32}
        height={32}
        className="text-gray-500 cursor-pointer"
      />
      <CheckCircle
        onClick={onClickCorrect}
        width={32}
        height={32}
        className="text-gray-500 cursor-pointer"
      />
    </div>
  );
};

export default CardResults;
