import clsx from "clsx";

interface SelectButtonProps {
  children: JSX.Element;
  data: string;
  selected: boolean;
  onClick: () => void;
}

const SelectButton = ({
  children,
  data,
  selected,
  onClick,
}: SelectButtonProps) => {
  return (
    <div className="flex flex-col space-y-2 items-center justify-center">
      <div className="text-sm">{data}</div>
      <div
        onClick={onClick}
        className={clsx(
          "flex-col rounded-lg w-16 h-16 text-center flex items-center justify-center border border-gray-900 cursor-pointer ",
          { "bg-gray-900": selected, "bg-gray-800": !selected }
        )}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default SelectButton;
