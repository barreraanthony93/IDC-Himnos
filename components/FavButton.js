import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useCallback, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import theme from "../theme";
import { AppContext } from "../context/AppContext";

export default function FavButton(props) {
  const { number, type, title } = props;
  const { favs, setFavs } = useContext(AppContext);
  const isFav = favs.includes(number + type);

  const updateFavs = useCallback(async () => {
    if (isFav) {
      const newFavs = [...favs].filter((f) => f !== number + type);
      setFavs(newFavs);
    } else {
      setFavs((favs) => [...favs, number + type]);
    }
  }, [favs, isFav, number, setFavs, type]);

  const checkFavs = useMemo(() => {
    return isFav ? "heart" : "hearto";
  }, [isFav]);

  return (
    <TouchableOpacity style={styles.fav} onPress={updateFavs}>
      <AntDesign color={theme.colors.text} size={20} name={checkFavs} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fav: {
    padding: 8,
    // backgroundColor: theme.colors.background,
    borderRadius: 100,
  },
});
