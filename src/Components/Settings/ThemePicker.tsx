import { useState } from "react";
import useSettingsStore from "../../stores/settings";

const ThemePicker = () => {
  const settings = useSettingsStore((state: any) => state.settings);
  const setSettings = useSettingsStore((state: any) => state.setSettings);
  const [currentTheme, setCurrentTheme] = useState(
    settings.theme ?? "defaultBright"
  );
  const themes = ["defaultBright", "defaultDark", "gwen"];
  const setSomethingChanged = useSettingsStore(
    (state: any) => state.setSomethingChanged
  );

  const onChangeTheme = (e: any) => {
    setCurrentTheme(e.target.value);
    setSettings({ ...settings, theme: e.target.value });
    setSomethingChanged(true);
  };

  return (
    <div className="flex space-x-2 items-center text-xl">
      <h1>Theme</h1>
      <select
        value={currentTheme}
        onChange={onChangeTheme}
        className="bg-gray-500 text-white rounded-lg p-2"
      >
        {themes.map((theme) => (
          <option value={theme}>{theme}</option>
        ))}
      </select>
    </div>
  );
};

export default ThemePicker;
