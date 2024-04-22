import {
  StyleSheet,
  FlatList,
  View,
  Text,
  SafeAreaView,
  Button,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import theme from "../theme";
import ListItem from "./ListItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../context/AppContext";
const { width } = Dimensions.get("screen");

export default function ModalWrapper(props) {
  const { setModalVisible, children } = props;

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView>
      <View style={styles.modal}>
        {children}
        <View
          style={{
            position: "absolute",
            bottom: 70,
            left: width / 2.6,
            backgroundColor: theme.colors.primary,
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
        >
          <Button title="Cerrar" color={"white"} onPress={() => closeModal()} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modal: {
    height: "100%",
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: theme.colors.dark,
  },
});
