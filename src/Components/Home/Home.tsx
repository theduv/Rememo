import { useEffect } from "react";
import useSettingsStore from "../../stores/settings";
import Header from "../Header/Header";
import DecksList from "./DecksList/DecksList";
import clsx from "clsx";
const ipcRenderer = window.require("electron").ipcRenderer;

const Home = () => {
  useEffect(() => {
    ipcRenderer.send("changeDeck", {
      title: "Main menu",
      deck: "undefined",
    });
  }, []);
  const settings = useSettingsStore((state: any) => state.settings);

  return (
    <div
      className={clsx("h-full ", {
        "bg-gray-900": settings.theme === "defaultDark",
        "bg-gwen-purple": settings.theme === "gwen",
      })}
    >
      <Header title={"Decks list"} />
      <div
        className={clsx(
          "p-8 my-auto text-center flex flex-col justify-center items-center "
        )}
      >
        <DecksList />
      </div>
    </div>
  );
};

export default Home;
