import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
//this didn't worked properly, need to do a rca later on this
export default useStoregeData = (key) => {
  const [data, setStateData] = useState();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    let result = await SecureStore.getItemAsync(key);
    let parsedResult = await JSON.parse(result);
    setStateData(parsedResult);
    setLoading(false);
  };

  const setData = async (value) => {
    setLoading(true);
    await SecureStore.setItemAsync(key, JSON.stringify(value));
    await getData();
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return [data, setData, loading];
};
