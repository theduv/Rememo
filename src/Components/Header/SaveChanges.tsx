import { useState } from "react";
import useDecksStore from "../../stores/decks";
import useSettingsStore from "../../stores/settings";
import LoadingSpin from "react-loading-spin";
let appData = window.require("app-data-folder");
const fs = window.require("fs");

const SaveChanges = () => {
  const decks = useDecksStore((state: any) => state.decks);
  const settings = useSettingsStore((state: any) => state.settings);
  const [loading, setLoading] = useState(false);
  const somethingChangedSettings = useSettingsStore(
    (state: any) => state.somethingChanged
  );
  const somethingChangedDecks = useDecksStore(
    (state: any) => state.somethingChanged
  );
  const setSomethingChangedDecks = useDecksStore(
    (state: any) => state.setSomethingChanged
  );
  const setSomethingChangedSettings = useSettingsStore(
    (state: any) => state.setSomethingChanged
  );
  const somethingChanged = somethingChangedDecks || somethingChangedSettings;

  const getOtherClass = () => {
    return somethingChanged
      ? " bg-gray-800 cursor-pointer"
      : " bg-gray-400 cursor-default ";
  };

  const onClickSave = () => {
    setLoading(true);
    fs.writeFileSync(
      appData("Rememo") + "\\settings.json",
      JSON.stringify(settings)
    );
    fs.writeFileSync(appData("Rememo") + "\\decks.json", JSON.stringify(decks));
    setSomethingChangedDecks(false);
    setSomethingChangedSettings(false);
    setLoading(false);
  };

  return (
    <div
      onClick={onClickSave}
      className={"rounded-lg py-2 text-white px-4 w-32 " + getOtherClass()}
    >
      {loading ? <LoadingSpin /> : <h1>Save changes</h1>}
    </div>
  );
};

export default SaveChanges;
