import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import theme from "../theme";
import FavButton from "./FavButton";
import PlayingBars from "./AudioPlayer/PlayingBars";
import { toProperCase } from "../utils";
import { useNavigation } from "@react-navigation/native";

const ListItem = (props) => {
  const {
    setModalVisible,
    favs,
    data: { title, number, type },
    data,
  } = props;

  const navigation = useNavigation();
  const navigateHymn = () => {
    setModalVisible(false);
    return navigation.navigate("Hymn", data);
  };

  return (
    <TouchableOpacity onPress={navigateHymn}>
      <View style={styles.item}>
        <View style={styles.texts}>
          <Text style={[styles.number, styles.text]}>{number}</Text>
          <View style={{ width: "90%", justifyContent: "center" }}>
            <Text style={[styles.type]}>{type}</Text>
            <Text style={[styles.title, styles.text]}>
              {toProperCase(title)}
            </Text>
          </View>
        </View>
        {/* {hymnPlaying && hymnPlaying.number === number && <PlayingBars />} */}
        <FavButton favs={favs} {...data} />
      </View>
    </TouchableOpacity>
  );
};

export default memo(ListItem);

const styles = StyleSheet.create({
  item: {
    backgroundColor: theme.colors.dark,
    padding: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  texts: {
    flexDirection: "row",
    flex: 1,
    alignContent: "center",
  },
  number: {
    opacity: 0.7,
    fontWeight: "700",
    paddingRight: 10,
    paddingTop: 3,
    fontSize: 16,
  },
  type: {
    marginTop: -3,
    fontSize: 10,
    opacity: 0.5,
    color: theme.colors.text,
  },
  title: {
    width: "100%",
    fontWeight: 600,
  },
  text: {
    color: theme.colors.text,
    fontSize: 16,
  },
});
