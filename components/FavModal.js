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
import ModalWrapper from "./ModalWrapper";
const { width } = Dimensions.get("screen");

export default function FavModal(props) {
  const [currentFavs, setCurrentFavs] = useState([]);
  const { data, setModalVisible } = props;
  const { favs, setFavs } = useContext(AppContext);

  useEffect(() => {
    const favMap = new Map(favs.map((fav) => [fav, true]));
    setCurrentFavs(
      data
        .filter((hymn) => favMap.has(hymn.number + hymn.type))
        .sort((a, b) => a.number - b.number)
    );
  }, [favs, data]);

  const renderItem = ({ item }) => (
    <ListItem {...props} data={item} setModalVisible={setModalVisible} />
  );

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView>
      <ModalWrapper setModalVisible={closeModal}>
        {currentFavs.length === 0 && (
          <Text
            style={{
              color: theme.colors.text,
              fontSize: 22,
              marginTop: 100,
              paddingHorizontal: 20,
              textAlign: "center",
            }}
          >
            Añade favoritos pulsando en el icono del corazón.
          </Text>
        )}
        <FlatList
          data={currentFavs}
          renderItem={renderItem}
          keyExtractor={(item, id) => id}
        />
      </ModalWrapper>
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
