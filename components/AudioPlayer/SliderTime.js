import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Slider from '@react-native-community/slider';
import theme from '../../theme';

const SliderTime = ({ playbackInstancePosition, playbackInstanceDuration, playbackInstance,  hymnSelected:{ title}}) => {
    const [isSeeking, setIsSeeking] = useState(false)

  const getMMSSFromMillis = (millis) =>  {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  }

  const _onSeekSliderValueChange = value => {

    if (playbackInstance != null && !isSeeking) {
        setIsSeeking(true)
        playbackInstance.playFromPositionAsync();
    }
};

 const _onSeekSliderSlidingComplete = async value => {
    if (playbackInstance != null) {
        setIsSeeking(false)
        const seekPosition = value * playbackInstanceDuration;
        playbackInstance.playFromPositionAsync(seekPosition);

        // MusicControl.updatePlayback({
        //     elapsedTime: parseInt((seekPosition / 1000).toFixed(0)) 
        //   })
    }
};

const _setSliderValue = () => {
  if(playbackInstance) {
    return playbackInstancePosition / playbackInstanceDuration
  }
  return 0
}

  return (
    <View style={styles.sliderCont}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.slider}>
        <Text style={styles.text}>{getMMSSFromMillis(playbackInstancePosition)}</Text>
          <Slider
            value={_setSliderValue()}
            style={{width: 170, height: 40, marginHorizontal: 10}}
            minimumValue={0}
            maximumValue={1}
            onValueChange={_onSeekSliderValueChange}
            onSlidingComplete={_onSeekSliderSlidingComplete}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            />
            <Text style={styles.text}>{getMMSSFromMillis(playbackInstanceDuration)}</Text>
            </View>
    </View>
  )
}

export default SliderTime

const styles = StyleSheet.create({
  sliderCont:{
    justifyContent:'center',
    alignItems:'center'
  },
  text:  {
    color:  theme.colors.text
  },
  slider: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  }
})