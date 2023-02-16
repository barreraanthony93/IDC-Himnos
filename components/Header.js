import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import theme from "../theme";

const Header = ({search, setSearch, setModalVisible}) => {

  return (
    <View style={styles.header}>
      <View style={[styles.searchButton, theme.button]}>
        {/* <Text style={{color:'white'}}>Testing eas update!</Text> */}
        <Feather name="search" color="white" size={18} />
        <TextInput placeholder="Busca" value={search} style={styles.searchBarInput} onChangeText={setSearch}/>
      </View>
      <TouchableOpacity style={theme.button}  onPress={() => setModalVisible(true)}>
        <Feather name="heart" color="white" size={18} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: 50,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  searchButton: {
    flex: 1,
    flexDirection: "row",
  },
  searchBarInput: {
    flex:1,
    paddingHorizontal: 5,
    color: theme.colors.text,
    fontWeight: "700"
  }
});
