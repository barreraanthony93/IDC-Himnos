import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import theme from "../theme";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import PlayingBars from "../components/AudioPlayer/PlayingBars";
import FavButton from "../components/FavButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("screen");
const Hymn = ({
  favs,
  navigation,
  route: {
    params: { title, number, blocks, id },
  },
}) => {
  const [fontSizeAdjust, setfontSizeAdjust] = useState(20);
  useEffect(() => {
    async function asyncFunction() {
      const fontSize = await AsyncStorage.getItem("fontSize");
      if (fontSize !== null) {
        setfontSizeAdjust(parseInt(fontSize));
      }
    }
    asyncFunction();

    return () => {};
  }, []);

  const fontSizeChange = async (adjust) => {
    if (adjust) {
      if (fontSizeAdjust < 42) {
        setfontSizeAdjust(fontSizeAdjust + 2);
        await AsyncStorage.setItem("fontSize", (fontSizeAdjust + 2).toString());
      }
    } else {
      if (fontSizeAdjust > 12) {
        setfontSizeAdjust(fontSizeAdjust - 2);
        await AsyncStorage.setItem("fontSize", (fontSizeAdjust - 2).toString());
      }
    }
  };

  // const playAudio = () => {
  //   loadNewPlaybackInstance(params);

  //   if (hymnPlaying == null) {
  //     updateState({
  //       playerVisible: !playerVisible,
  //     });
  //   }
  // };

  // const renderPlayButton = () => {
  //   if (loadingPlayer) {
  //     return <ActivityIndicator size="small" color={theme.colors.text} />;
  //   } else if (playerVisible && hymnPlaying) {
  //     if (hymnPlaying.number === number) {
  //       return <PlayingBars />;
  //     } else {
  //       return <Feather name="play" color={theme.colors.text} size={18} />;
  //     }
  //   } else {
  //     return <Feather name="play" color={theme.colors.text} size={18} />;
  //   }
  // };

  const buttonSize = 20;
  const AndroidSafeArea = {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  };
  return (
    <SafeAreaView style={AndroidSafeArea}>
      <View style={styles.header}>
        <View style={styles.leftSide}>
          <TouchableOpacity
            style={theme.button}
            onPress={() => navigation.goBack()}
          >
            <>
              <Feather
                name="arrow-left"
                color={theme.colors.text}
                size={buttonSize}
              />
            </>
          </TouchableOpacity>
        </View>
        <View style={styles.headerDetails}>
          <Text style={[styles.text, styles.number]}>{number} </Text>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={[styles.text, styles.title]}
          >
            {title}
          </Text>
        </View>
        <View style={styles.buttons}>
          <FavButton favs={favs} number={number} />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 70,
          paddingHorizontal: 10,
        }}
      >
        {blocks.map((block, i) => {
          return i > 0 ? (
            block.data.cols ? (
              <View
                key={block.id}
                style={{
                  width: width,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                {/* {block.data.cols.map((col, j) => {
                  return (
                    <View
                      key={j}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      {col.blocks.map((v) => {
                        const hasItalic = v.data.text.includes("<i>");
                        const hasBold = v.data.text.includes("<b>");
                        const textConvert =
                          hasItalic || hasBold
                            ? v.data.text.replace(/<[^>]*>/g, "")
                            : v.data.text;
                        return (
                          <Text
                            key={v.id}
                            style={[
                              styles.body,
                              {
                                fontStyle: hasItalic ? "italic" : "normal",
                                fontWeight: hasBold ? "700" : "400",
                                fontSize: fontSizeAdjust,
                                // marginVertical: 10,
                                width: width / 2.5,
                                textAlign: "center",
                              },
                            ]}
                          >
                            {textConvert}
                          </Text>
                        );
                      })}
                    </View>
                  );
                })} */}
              </View>
            ) : (
              <Text
                key={block.id}
                style={[
                  styles.body,
                  {
                    fontWeight: block.type == "header" ? "700" : "400",
                    fontSize: fontSizeAdjust,
                    marginVertical: 10,
                  },
                ]}
              >
                {block.data.text}
              </Text>
            )
          ) : (
            <></>
          );
        })}
      </ScrollView>
      <View style={styles.fontButtons}>
        <TouchableOpacity
          style={theme.button}
          onPress={() => fontSizeChange(true)}
        >
          <AntDesign name="plus" color={theme.colors.text} size={buttonSize} />
        </TouchableOpacity>
        <TouchableOpacity
          style={theme.button}
          onPress={() => fontSizeChange(false)}
        >
          <AntDesign name="minus" color={theme.colors.text} size={buttonSize} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Hymn;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  headerDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    width: "70%",
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  number: {
    fontSize: 18,
  },
  title: {
    // paddingTop: 0,
    fontSize: 18,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    flexDirection: "row",
  },
  fontButtons: {
    position: "absolute",
    flexDirection: "row",
    bottom: "2%",
    right: "2%",
  },

  text: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 18,
    padding: 2,
    textAlign: "center",
  },
  body: {
    color: theme.colors.text,
    fontSize: 20,
    textAlign: "center",
  },
});
