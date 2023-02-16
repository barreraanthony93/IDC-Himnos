import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from "@expo/vector-icons/AntDesign";
import theme from "../theme";

export default function FavButton({favs, updateState, number}) {
  const changeFavs = async (num) => {
    const isFav = await AsyncStorage.getItem(num);
      try {
      if (isFav) {
        await AsyncStorage.removeItem(num);
      } else {
        await AsyncStorage.setItem(num, num);
      }      
      let newFavs = await AsyncStorage.getAllKeys()
      updateState({favs: newFavs})

    } catch (e) {}
  };

  const checkFavs = (num) => {
    if (favs) {
      return favs.some((hymn) => hymn === num);
    }
    return false;
  };

  return (
    <TouchableOpacity style={styles.fav} onPress={() => changeFavs(number)}>
      <AntDesign
        color={theme.colors.text}
        size={20}
        name={checkFavs(number) ? "heart" : "hearto"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fav: {
    paddingHorizontal: 10
  }
});
