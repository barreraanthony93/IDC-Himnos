import { StyleSheet, Animated, View } from "react-native";
import React,  {useEffect, useRef} from "react";
import theme from "../../theme";

const PlayingBars = () => {
    const bar1Anim = useRef(new Animated.Value(.2)).current;
    const bar2Anim = useRef(new Animated.Value(.4)).current;
    const bar3Anim = useRef(new Animated.Value(.3)).current;
    const duration = 300
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(bar1Anim, {
                    toValue: .6,
                    useNativeDriver: true,
                    duration: duration
                }),
                Animated.timing(bar1Anim, {
                    toValue: .2,
                    useNativeDriver: true,
                    duration: duration
                })
            ])
        ).start()
        Animated.loop(
            Animated.sequence([
                Animated.timing(bar2Anim, {
                    toValue: .8,
                    useNativeDriver: true,
                    delay: 140,
                    duration: duration
                }),
                Animated.timing(bar2Anim, {
                    toValue: .4,
                    useNativeDriver: true,
                    duration: duration
                })
            ])
        ).start()
        Animated.loop(
            Animated.sequence([
                Animated.timing(bar3Anim, {
                    toValue: .6,
                    useNativeDriver: true,
                    delay: 100,
                    duration: duration
                }),
                Animated.timing(bar3Anim, {
                    toValue: .3,
                    useNativeDriver: true,
                    duration: duration
                })
            ])
        ).start()
    },  [])
  return (
    <View style={styles.blocks}>
      <Animated.View style={[styles.block, {
        transform:[
        {scaleY: bar1Anim,
        
        }
        ]
      }]}></Animated.View>
      <Animated.View  style={[styles.block, {
        transform:[
        {scaleY: bar2Anim
        }
        ]
      }]}></Animated.View>
      <Animated.View style={[styles.block, {
        transform:[
        {scaleY: bar3Anim}
        ]
      }]}></Animated.View>
    </View>
  );
};

export default PlayingBars;

const styles = StyleSheet.create({
  blocks: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center'
  },
  block: {
    height: 14,
    width: 2.5,
    margin: 2,
    backgroundColor :theme.colors.text
  },
});
