import { useCallback, useEffect, useState } from "react";
import Button from "./component/Button";
import ConfigurationItem from "./component/ConfigurationItem";
import { v4 } from "uuid";
import { Configuration } from "@src/interface/storeage";

export default function Popup() {
  const EMPTY_CONFIGURATION: Configuration = {
    id: "",
    domain: "",
    storage: [
      {
        type: undefined,
        key: "",
        value: ""
      }
    ]
  };
  const [configurations, setConfigurations] = useState<Configuration[]>([]);

  const handleAddClick = () => {
    const configuration = {
      ...EMPTY_CONFIGURATION,
      id: v4()
    };
    setConfigurations([...configurations, configuration]);
  };

  const handleSaveClick = () => {
    chrome.storage.local.set({ configurations });
  };

  useEffect(() => {
    const getConfiguration = async () => {
      const savedConfiguration = await chrome.storage.local.get("configurations");

      if (!savedConfiguration.configurations) return;
      setConfigurations(savedConfiguration.configurations as Configuration[]);
    };

    getConfiguration();
  }, []);

  return (
    <div className="h-full p-3 bg-gray-800 overflow-auto max-h-full">
      <header className="flex flex-col items-center justify-center text-white mb-3">
        <h1 className="text-2xl">Storage Helper</h1>
      </header>
      <div className="flex flex-col items-start justify-center gap-3">
        {configurations.map((configuration, index) => (
          <ConfigurationItem key={index} configuration={configuration} setConfiguration={setConfigurations} />
        ))}
        <div className="flex gap-2">
          <Button onClick={handleAddClick}>
            <div className="flex items-center gap-1.5">
              <img src="/add.png" alt="Delete" className="w-[20px]" />
              Add Configuration
            </div>
          </Button>
          <Button onClick={handleSaveClick}>
            <div className="flex items-center gap-1.5">
              <img src="/save.png" alt="Delete" className="w-[20px]" />
              save
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
