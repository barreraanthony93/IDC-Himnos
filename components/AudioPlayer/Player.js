import {
  StyleSheet,
  Animated,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import theme from "../../theme";
import Buttons from "./Buttons";
import SliderTime from "./SliderTime";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width } = Dimensions.get("window");
const playerHeight = 70;

const Player = (props) => {
  const { playbackInstance, loadingPlayer, updateState, hymnSelected, playerVisible } = props;

  const slideInOutAnim = useRef(new Animated.Value(-60)).current;
  let inOrOut = playerVisible && hymnSelected ? 0 : playerHeight;

  useEffect(() => {
    Animated.timing(slideInOutAnim, {
      toValue: inOrOut,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [playerVisible, playbackInstance]);

  const closePlayer = () => {
    updateState({
      playerVisible: false,
      hymnPlaying: null
    });
    playbackInstance && playbackInstance.stopAsync();
  };

  return (
    <Animated.View
      style={[
        styles.player,
        {
          transform: [
            {
              translateY: slideInOutAnim,
            },
          ],
        },
      ]}
    >
      {loadingPlayer ? <ActivityIndicator color={theme.colors.text}/> :
      hymnSelected && (
        <>
          <Buttons {...props} />
          <SliderTime {...props}/>
          <TouchableOpacity onPress={() => closePlayer()}>
            <Ionicons name="close" size={34} color={theme.colors.text} />
          </TouchableOpacity>
        </>
      )}
    </Animated.View>
  );
};

export default Player;

const styles = StyleSheet.create({
  player: {
    height: playerHeight,
    width: width,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 9,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: theme.colors.secondary,
  },
});
