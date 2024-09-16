import { useEffect, useState, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { StorageKeys } from "../constants/Storage";

const { createContext } = require("react");

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [cardList, setCardList] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    let result = await SecureStore.getItemAsync(StorageKeys.CARD_DETAILS);
    let parsedResult = await JSON.parse(result);
    setCardList(parsedResult);
    setIsLoading(false);
  };

  const setData = async (value) => {
    setIsLoading(true);
    await SecureStore.setItemAsync(
      StorageKeys.CARD_DETAILS,
      JSON.stringify(value)
    );
    await fetchData();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        cardList,
        setData,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
