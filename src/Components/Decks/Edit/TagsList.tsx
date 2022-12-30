import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

interface TagsListProps {
  tag: string;
  setTag: Dispatch<SetStateAction<string>>;
}

const TagsList = ({ tag, setTag }: TagsListProps) => {
  const onClickTag = (tagName: string) => {
    if (tag === tagName) {
      setTag("");
    } else {
      setTag(tagName);
    }
  };

  return (
    <div className="flex space-x-2 items-center">
      <div
        onClick={() => onClickTag("P")}
        className={clsx(
          "rounded-full h-4 w-4 cursor-pointer border border-purple-400",
          {
            "bg-purple-400": tag === "P",
          }
        )}
      />
      <div
        onClick={() => onClickTag("O")}
        className={clsx(
          "rounded-full h-4 w-4 cursor-pointer border border-orange-400",
          {
            "bg-orange-400": tag === "O",
          }
        )}
      />
      <div
        onClick={() => onClickTag("G")}
        className={clsx(
          "rounded-full h-4 w-4 cursor-pointer border border-green-400",
          {
            "bg-green-400": tag === "G",
          }
        )}
      />
      <div
        onClick={() => onClickTag("B")}
        className={clsx(
          "rounded-full h-4 w-4 cursor-pointer border border-blue-400",
          {
            "bg-blue-400": tag === "B",
          }
        )}
      />
      <div
        onClick={() => onClickTag("W")}
        className={clsx(
          "rounded-full h-4 w-4 cursor-pointer border border-gray-200",
          {
            "bg-gray-200": tag === "W",
          }
        )}
      />
      <div
        onClick={() => onClickTag("R")}
        className={clsx(
          "rounded-full h-4 w-4 cursor-pointer border border-red-400",
          {
            "bg-red-400": tag === "R",
          }
        )}
      />
    </div>
  );
};

export default TagsList;
