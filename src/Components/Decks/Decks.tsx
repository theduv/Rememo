import clsx from "clsx";
import { useEffect } from "react";
import useDecksStore from "../../stores/decks";
import useSettingsStore from "../../stores/settings";
import Header from "../Header/Header";
import CreateBar from "./CreateBar";
import DecksListSettings from "./DecksListSettings";
import NoDeck from "./NoDeck";
const ipcRenderer = window.require("electron").ipcRenderer;

const Decks = () => {
  const decks = useDecksStore((state: any) => state.decks);
  const settings = useSettingsStore((state: any) => state.settings);

  useEffect(() => {
    ipcRenderer.send("changeDeck", {
      title: "Editing decks",
      deck: "undefined",
    });
  }, []);

  return (
    <div
      className={clsx("h-full", {
        "bg-gray-900 text-gray-200": settings.theme === "defaultDark",
        "bg-gwen-purple text-gwen-white": settings.theme === "gwen",
      })}
    >
      <Header title={"Decks list"} />
      <div className="flex flex-col items-center space-y-8">
        <CreateBar />
        {decks.length ? <DecksListSettings /> : <NoDeck />}
      </div>
    </div>
  );
};

export default Decks;
