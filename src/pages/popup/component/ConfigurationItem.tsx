import { Configuration } from "@src/interface/storeage";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

interface ConfigurationItemProps {
  configuration: Configuration;
  setConfiguration: React.Dispatch<React.SetStateAction<Configuration[]>>;
}

export default function ConfigurationItem({ configuration, setConfiguration }: ConfigurationItemProps) {
  const handleAddStorageClick = () => {
    const storage = {
      type: undefined,
      key: "",
      value: ""
    };
    setConfiguration((configurations) => {
      const newConfigurations = [...configurations];
      const index = newConfigurations.findIndex((config) => config.id === configuration.id);
      newConfigurations[index].storage.push(storage);
      return newConfigurations;
    });
  };

  const handleSetStorageConfiguration = (key: string, value: string, storageIndex: number) => {
    setConfiguration((configurations) => {
      const newConfigurations = [...configurations];
      const index = newConfigurations.findIndex((config) => config.id === configuration.id);
      newConfigurations[index].storage[storageIndex][key] = value;
      return newConfigurations;
    });
  };

  const handleStorageKeyChange = (event: React.ChangeEvent<HTMLInputElement>, storageIndex: number) => {
    const { value } = event.target;

    handleSetStorageConfiguration("key", value, storageIndex);
  };

  const handleStorageValueChange = (event: React.ChangeEvent<HTMLInputElement>, storageIndex: number) => {
    const { value } = event.target;

    handleSetStorageConfiguration("value", value, storageIndex);
  };

  const handleStorageTypeChange = (event: React.ChangeEvent<HTMLSelectElement>, storageIndex: number) => {
    const { value } = event.target;

    handleSetStorageConfiguration("type", value, storageIndex);
  };

  const handleDomainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setConfiguration((configurations) => {
      const newConfigurations = [...configurations];
      const index = newConfigurations.findIndex((config) => config.id === configuration.id);
      newConfigurations[index].domain = value;
      return newConfigurations;
    });
  };

  const handleRemoveStorageClick = (storageIndex: number) => {
    setConfiguration((configurations) => {
      const newConfigurations = [...configurations];
      const index = newConfigurations.findIndex((config) => config.id === configuration.id);
      newConfigurations[index].storage.splice(storageIndex, 1);
      return newConfigurations;
    });
  };

  const handleRemoveConfigurationClick = () => {
    setConfiguration((configurations) => {
      const newConfigurations = configurations.filter((config) => config.id !== configuration.id);
      return newConfigurations;
    });
  };

  return (
    <div className="p-2 rounded-lg shadow-sm border border-gray-100 text-white bg-gray-700 w-full">
      <div className="flex justify-between items-center mb-4 gap-4">
        <Input className="w-full" value={configuration.domain} onChange={handleDomainChange} />
        <div className="flex gap-2">
          <Button variant="text" onClick={handleAddStorageClick}>
            <img src="/add.png" alt="Delete" className="w-[20px]" />
          </Button>
          <Button variant="text" onClick={handleRemoveConfigurationClick}>
            <img src="/delete.png" alt="Delete" className="w-[20px]" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {configuration.storage.map((storage, index) => (
          <div
            className="grid grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)_minmax(0,_1fr)_20px] items-center gap-2"
            key={index}
          >
            <Select
              options={["sessionStorage", "localStorage"]}
              value={storage.type}
              onChange={(event) => handleStorageTypeChange(event, index)}
            />
            <Input
              placeholder="input storage key"
              value={storage.key}
              onChange={(event) => handleStorageKeyChange(event, index)}
            />
            <Input
              placeholder="input storage value"
              value={storage.value}
              onChange={(event) => handleStorageValueChange(event, index)}
            />
            <Button variant="text" onClick={() => handleRemoveStorageClick(index)}>
              <img src="/delete.png" alt="Delete" className="w-full" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
