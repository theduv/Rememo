import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

interface TagsListProps {
  tags: Array<string>;
  setTags: Dispatch<SetStateAction<Array<string>>>;
}

const TagsListSearch = ({ tags, setTags }: TagsListProps) => {
  const onClickTag = (tagName: string) => {
    const newTags = [...tags];
    if (tags.includes(tagName)) {
      setTags(newTags.filter((tag) => tag !== tagName));
    } else {
      setTags([...newTags, tagName]);
    }
  };

  return (
    <div className="flex space-x-2 items-center">
      <div
        onClick={() => onClickTag("P")}
        className={clsx(
          "rounded-full h-4 w-4 cursor-pointer border border-purple-400",
          {
            "bg-purple-400": tags.includes("P"),
          }
        )}
      />
      <div
        onClick={() => onClickTag("O")}
        className={clsx(
          "rounded-full h-4 w-4 cursor-pointer border border-orange-400",
          {
            "bg-orange-400": tags.includes("O"),
          }
        )}
      />
      <div
        onClick={() => onClickTag("G")}
        className={clsx(
          "rounded-full h-4 w-4 cursor-pointer border border-green-400",
          {
            "bg-green-400": tags.includes("G"),
          }
        )}
      />
      <div
        onClick={() => onClickTag("B")}
        className={clsx(
          "rounded-full h-4 w-4 cursor-pointer border border-blue-400",
          {
            "bg-blue-400": tags.includes("B"),
          }
        )}
      />
      <div
        onClick={() => onClickTag("W")}
        className={clsx(
          "rounded-full h-4 w-4 cursor-pointer border border-gray-200",
          {
            "bg-gray-200": tags.includes("W"),
          }
        )}
      />
      <div
        onClick={() => onClickTag("R")}
        className={clsx(
          "rounded-full h-4 w-4 cursor-pointer border border-red-400",
          {
            "bg-red-400": tags.includes("R"),
          }
        )}
      />
    </div>
  );
};

export default TagsListSearch;
