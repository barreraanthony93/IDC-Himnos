import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./screens/Main";
import HymnScreen from "./screens/Hymn";
import theme from "./theme";
import Player from "./components/AudioPlayer/Player";
import React, { Component } from "react";
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ref, onValue } from "firebase/database";
import { database } from "./database/firebaseConfig";

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
  },
};

export default class App extends Component {
  state = {
    playerVisible: false,
    hymnSelected: null,
    hymnPlaying: null,
    isPlaying: false,
    audioStatus: null,
    isBuffering: false,
    playbackInstancePosition: null,
    playbackInstanceDuration: null,
    favs: null,
    playbackInstance: null,
    loadingPlayer: false,
  };
  loading = false;
  isSeeking = false;

  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      playThroughEarpieceAndroid: false,
    });

    onValue(ref(database, 'IDCHimnos/audio'), (snapshot) => {
      const value = snapshot.val()
      this.setState({audioStatus: value})
    })

    AsyncStorage.getAllKeys().then((favs) => {
      if (favs) {
        this.setState({ favs });
      }
    });
  }

  componentWillUnmount() {
    if (this.state.playbackInstance != null)
      this.state.playbackInstance.unloadAsync();
  }

  async loadNewPlaybackInstance(hymn) {
    this.setState({
      loadingPlayer: true
    })

    if (this.state.playbackInstance != null) {
      await this.state.playbackInstance.unloadAsync();
      this.state.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.state.playbackInstance = null;
    }

    const source = {
      uri: "https://firebasestorage.googleapis.com/v0/b/idcauth.appspot.com/o/himnos%2Fhimno_0.wav?alt=media&token=7a6a52e0-cce7-43eb-a6e8-bd84a29e995a",
    };

    const initialStatus = {
      shouldPlay: true,
      rate: 1.0,
      volume: 0.5,
    };

    const { sound, status } = await Audio.Sound.createAsync(
      source,
      initialStatus,
      this.onPlaybackStatusUpdate
    );
    this.setState({ playing: true, playbackInstance: sound, loadingPlayer: false, hymnPlaying: hymn });
  }

  onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      this.setState({
        isBuffering: status.isBuffering,
        isPlaying: status.isPlaying,
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
      });
      if (status.didJustFinish) {
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  updateState = (state) => {
    this.setState((prev) => ({
      ...prev,
      ...state
    }));
  };

  render() {
    const slider =
      (this.state.playbackInstancePosition /
        this.state.playbackInstanceDuration) *
      100;

    return (
      <>
        <NavigationContainer theme={MyTheme} style={styles.container}>
          <StatusBar style="light" />
          <Stack.Navigator>
            <Stack.Screen
              name="Main"
              options={{
                headerShown: false,
              }}
            >
              {(props) => (
                <MainScreen
                  {...props}
                  {...this.props}
                  {...this.state}
                  updateState={this.updateState}
                />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="Hymn"
              options={{
                headerShown: false,
              }}
            >
              {(props) => (
                <HymnScreen
                  {...this.props}
                  {...this.state}
                  loadNewPlaybackInstance={(hymn) => this.loadNewPlaybackInstance(hymn)}
                  updateState={this.updateState}
                  {...props}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
        {/* <Player
          {...this.props}
          {...this.state}
          updateState={this.updateState}
        /> */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    position: "relative",
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
