type StorageType = "sessionStorage" | "localStorage";

interface ConfigurationStorage {
  [key: string]: string | undefined;
  type?: StorageType;
  key: string;
  value: string;
}

export interface Configuration {
  id: string;
  domain: string;
  storage: ConfigurationStorage[];
}
