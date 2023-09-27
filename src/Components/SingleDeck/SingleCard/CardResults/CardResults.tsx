import clsx from "clsx";
import { CheckCircle, XCircle } from "react-feather";
import useSettingsStore from "../../../../stores/settings";
interface CardResultsProps {
  onClickAnswer: (succeeded: boolean) => void;
}

const CardResults = (props: CardResultsProps) => {
  const settings = useSettingsStore((state: any) => state.settings);

  return (
    <div className="flex space-x-12 justify-center">
      <XCircle
        onClick={() => props.onClickAnswer(false)}
        width={32}
        height={32}
        className={clsx("cursor-pointer ", {
          "text-gray-500": settings.darkMode === false,
        })}
      />
      <CheckCircle
        onClick={() => props.onClickAnswer(true)}
        width={32}
        height={32}
        className={clsx("cursor-pointer ", {
          "text-gray-500": settings.darkMode === false,
        })}
      />
    </div>
  );
};

export default CardResults;
