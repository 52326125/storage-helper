import { Configuration } from "@src/interface/storeage";

chrome.storage.local.get("configurations", (savedConfiguration) => {
  const { configurations } = savedConfiguration;
  if (!configurations) return;

  const domain = window.location.hostname;

  const currentDomainConfigurations = (configurations as Configuration[]).find((config) => config.domain === domain);
  if (!currentDomainConfigurations) return;

  currentDomainConfigurations.storage.forEach((storage) => {
    if (storage.type === "sessionStorage") {
      sessionStorage.setItem(storage.key, storage.value);
    } else if (storage.type === "localStorage") {
      localStorage.setItem(storage.key, storage.value);
    }
  });
});
