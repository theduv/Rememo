import clsx from "clsx";
import React, { useState } from "react";
import useSettingsStore from "../../stores/settings";
import Header from "../Header/Header";
import CheckableSetting from "./CheckableSetting";

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
        "bg-gray-900 text-gray-200": settings.darkMode,
      })}
    >
      <Header title={"Settings"} />
      <div className="p-12">
        <CheckableSetting
          content="Fav card on create"
          isChecked={settings.favOnAdd}
          onChange={onChangeFavOnAdd}
        />
      </div>
      <div className="px-12 flex items-center space-x-4">
        <h1 className="text-xl">Export path</h1>
        <input
          value={valueExport}
          onChange={onChangeValueExport}
          type="text"
          className="rounded-lg p-1 border bg-gray-500 text-gray"
        />
      </div>
    </div>
  );
};

export default Settings;
