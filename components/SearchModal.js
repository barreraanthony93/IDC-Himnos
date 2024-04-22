import {
  StyleSheet,
  FlatList,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import theme from "../theme";
import ListItem from "./ListItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";
import { sortByNumber } from "../utils";
import ModalWrapper from "./ModalWrapper";

const { width } = Dimensions.get("screen");
export default function SearchModal(props) {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searching, setSearching] = useState(false);

  const { data, setSearchModal } = props;

  useEffect(() => {
    if (search) {
      const filter = searchData();
      setFilteredData(filter);
    } else {
      setFilteredData([]);
    }
  }, [search]);

  const searchData = () => {
    setSearching(true);
    const searchLowerCase = search.toLowerCase();
    const result = sortByNumber(data).filter((hymn) => {
      if (parseInt(searchLowerCase)) {
        if (hymn.number.includes(searchLowerCase)) {
          return hymn;
        }
      } else if (searchLowerCase.length !== 0) {
        return (
          hymn.title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              searchLowerCase.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            ) && hymn
        );
      }
    });
    setSearching(false);
    return result;
  };

  const closeModal = () => {
    setSearchModal(false);
    setSearch("");
    setSearching(false);
    setFilteredData([]);
  };
  return (
    <SafeAreaView>
      <ModalWrapper setModalVisible={closeModal}>
        <View style={[styles.searchButton, theme.button]}>
          <Feather name="search" color="white" size={18} />
          <TextInput
            placeholder="Busca por numero o nombre de canto"
            value={search}
            placeholderTextColor={theme.colors.background}
            style={styles.searchBarInput}
            onChangeText={setSearch}
            onKeyPress={(e) => {
              if (search.length == 0) {
                setSearching(false);
              } else {
                setSearching(true);
              }
            }}
          />
        </View>
        {filteredData.length > 0 ? (
          <ScrollView>
            {!searching ? (
              filteredData.map((data, i) => {
                return (
                  <ListItem
                    key={data.title + i}
                    {...props}
                    data={data}
                    setModalVisible={setSearchModal}
                  />
                );
              })
            ) : (
              <ActivityIndicator
                size="large"
                color={theme.colors.text}
                style={{ marginTop: 30 }}
              />
            )}
          </ScrollView>
        ) : (
          <View
            style={{
              height: "100%",
              flex: 1,
              marginTop: 30,
              paddingHorizontal: 30,
            }}
          >
            {search && filteredData.length === 0 ? (
              search.length > 1 && filteredData.length == 0 ? (
                <Text
                  style={{
                    fontSize: 18,
                    color: theme.colors.text,
                    textAlign: "center",
                  }}
                >
                  No hay resultados
                </Text>
              ) : (
                <ActivityIndicator size="large" color={theme.colors.text} />
              )
            ) : (
              <Text
                style={{
                  fontSize: 18,
                  color: theme.colors.text,
                  textAlign: "center",
                }}
              >
                Inicie una búsqueda en la barra de entrada de arriba
              </Text>
            )}
          </View>
        )}
      </ModalWrapper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modal: {
    height: "100%",
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: theme.colors.dark,
  },
  searchButton: {
    marginBottom: 10,
    marginHorizontal: 10,
    flexDirection: "row",
  },
  searchBarInput: {
    width: "90%",
    paddingHorizontal: 5,
    color: theme.colors.text,
    fontWeight: "600",
  },
});
