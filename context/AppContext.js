import React, { useEffect } from "react";
const AppContext = React.createContext({});
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppWrapper = ({ children }) => {
  const [favs, setFavs] = React.useState([]);

  const setFavsInStorage = async () => {
    AsyncStorage.setItem("favs", JSON.stringify(favs));
  };
  const getFavs = async () => {
    try {
      const favs = await AsyncStorage.getItem("favs");
      if (favs) {
        setFavs(JSON.parse(favs));
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getFavs();
  }, []);
  useEffect(() => {
    setFavsInStorage();
  }, [favs]);

  const value = {
    favs,
    setFavs,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppWrapper };
