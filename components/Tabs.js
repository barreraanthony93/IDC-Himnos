import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef } from "react";
import theme from "../theme";

const { width } = Dimensions.get("screen");

const Tabs = ({ tabs, setActive, active }) => {
  const slider = useRef(new Animated.Value(5)).current;

  const tabConRef = useRef(null);

  useEffect(() => {
    if (tabConRef.current) {
      if (active == 1) {
        Animated.timing(slider, {
          toValue: (width / 2) * 0.89,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    }
    if (active == 0) {
      Animated.timing(slider, {
        toValue: 5,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [active]);
  return (
    <View
      ref={tabConRef}
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        marginHorizontal: 20,
        marginBottom: 5,
        zIndex: 99,
        borderRadius: 100,
        borderColor: theme.button.backgroundColor,
        backgroundColor: theme.colors.background,
        borderWidth: 1,
        paddingHorizontal: 4,
      }}
    >
      <Animated.View
        style={{
          width: "50%",
          position: "absolute",
          height: 35,
          borderRadius: 100,
          paddingVertical: 10,
          marginVertical: 3,
          top: 1,
          transform: [{ translateX: slider }],
          backgroundColor: theme.button.backgroundColor,
        }}
      ></Animated.View>
      {tabs.map((tab, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => setActive(i)}
          style={{
            width: "50%",
            borderRadius: 100,
            paddingVertical: 10,
            marginVertical: 3,
            // backgroundColor:
            //   active == i ? theme.button.backgroundColor : "transparent",
          }}
        >
          <Text style={{ color: theme.colors.text, textAlign: "center" }}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
