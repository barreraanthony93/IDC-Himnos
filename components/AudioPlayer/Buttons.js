import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import theme from "../../theme";

const Buttons = ({ playbackInstance, playbackInstanceDuration, playbackInstancePosition, isPlaying }) => {
  const sizeButton = 26;
  const playPausePressed = async () => {
    if(playbackInstanceDuration === playbackInstancePosition) {
        await playbackInstance.replayAsync()
    }else {
        playbackInstance !== null
        ? isPlaying
        ? await playbackInstance.pauseAsync()
        : await playbackInstance.playAsync()
        : null;
    }
  };

  return (
    <View style={styles.buttons}>
      <TouchableOpacity onPress={() => playPausePressed()}>
        {isPlaying ? (
          <Feather name="pause" color={theme.colors.text} size={sizeButton} />
        ) : (
          <Feather name="play" color={theme.colors.text} size={sizeButton} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
  },
});
