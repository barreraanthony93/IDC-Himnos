import { StyleSheet, Text,  TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import theme from "../theme";
 import FavButton from "./FavButton";
import PlayingBars from "./AudioPlayer/PlayingBars";


const ListItem = ({  setModalVisible, hymnPlaying, updateState, favs, data: { title, number }, data,  navigation }) => {

    const navigateHymn = () => {
      updateState({
        hymnSelected: data,
      })
        setModalVisible(false)
        return navigation.navigate("Hymn", data)
    }
 
  return (
    <TouchableOpacity style={styles.item} onPress={navigateHymn}>
        <>
      <View style={styles.texts}>
        <Text style={[styles.number, styles.text]}>{number}</Text>
        <Text  style={[styles.title, styles.text]}>{title}</Text>
      </View>
      {hymnPlaying && hymnPlaying.number === number && <PlayingBars/>}
      <FavButton updateState={updateState} favs={favs} number={number}/>
        </>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  item: {
    backgroundColor: theme.colors.dark,
    padding: 10,
    margin: 5,
    borderRadius: 100,
    flexDirection: "row",

  },
  texts : {
    flexDirection: "row",
    flex: 1,
  },
  number: {
    opacity: 0.5,
    fontWeight: "700",
    paddingRight: 5,
    fontSize: 16

  },
  title : {
    width: '90%'
  },
  text: {
    color: theme.colors.text,
    fontSize: 16,
  },
});
