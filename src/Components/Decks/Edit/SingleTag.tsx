import clsx from "clsx";

interface SingleTagProps {
  tag: string;
  onClickTag: (idCard: string) => void;
  cardID: string;
}

const SingleTag = ({ tag, onClickTag, cardID }: SingleTagProps) => {
  return (
    <div
      data-tooltip-content={"hello"}
      id="test"
      onClick={() => onClickTag(cardID)}
      className={clsx("w-4 h-4 rounded-full border cursor-pointer", {
        "bg-purple-400 border-purple-400": tag === "P",
        "bg-orange-400 border-orange-400": tag === "O",
        "bg-green-400 border-green-400": tag === "G",
        "bg-blue-400 border-blue-400": tag === "B",
        "bg-gray-200 border-gray-200": tag === "W",
        "bg-red-400 border-red-400": tag === "R",
      })}
    />
  );
};

export default SingleTag;
