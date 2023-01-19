import clsx from "clsx";
import React, { useState } from "react";
import useSettingsStore from "../../stores/settings";
import Header from "../Header/Header";
import CheckableSetting from "./CheckableSetting";
import ThemePicker from "./ThemePicker";

const Settings = () => {
  const settings = useSettingsStore((state: any) => state.settings);
  const setSettings = useSettingsStore((state: any) => state.setSettings);
  const setSomethingChanged = useSettingsStore(
    (state: any) => state.setSomethingChanged
  );
  const [valueExport, setValueExport] = useState(settings.pathExport);

  const onChangeValueExport = (event: any) => {
    setValueExport(event.target.value);
    setSettings({ ...settings, pathExport: event.target.value });
    setSomethingChanged(true);
  };

  const onChangeFavOnAdd = (event: React.ChangeEvent) => {
    setSettings({ ...settings, favOnAdd: !settings.favOnAdd });
    setSomethingChanged(true);
  };

  return (
    <div
      className={clsx("h-full", {
        "bg-gwen-black text-gray-200": settings.theme === "gwen",
        "bg-gray-900 text-gray-200": settings.theme === "defaultDark",
      })}
    >
      <Header title={"Settings"} />
      <div className="p-12 flex flex-col space-y-4">
        <CheckableSetting
          content="Fav card on create"
          isChecked={settings.favOnAdd}
          onChange={onChangeFavOnAdd}
        />
        <div>
          <ThemePicker />
        </div>
        <div className="flex items-center space-x-4">
          <h1 className="text-xl">Export path</h1>
          <input
            value={valueExport}
            onChange={onChangeValueExport}
            type="text"
            className="rounded-lg p-1 border bg-gray-500 text-gray"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
