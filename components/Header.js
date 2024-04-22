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

const Header = ({ active, setSearchModal, setModalVisible }) => {
  return (
    <View style={styles.header}>
      <Text
        style={{
          color: theme.colors.text,
          fontWeight: "700",
          fontSize: 18,
        }}
      >
        {active == 0 ? "Canticos Espirituales" : "Himnos"}
      </Text>
      {/* <View style={[styles.searchButton, theme.button]}>
         <Feather name="search" color="white" size={18} />
        <TextInput placeholder="Busca" value={search} style={styles.searchBarInput} onChangeText={setSearch}/>
      </View> */}
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={theme.button}
          onPress={() => setSearchModal(true)}
        >
          <Feather name="search" color="white" size={18} />
        </TouchableOpacity>
        <TouchableOpacity
          style={theme.button}
          onPress={() => setModalVisible(true)}
        >
          <Feather name="heart" color="white" size={18} />
        </TouchableOpacity>
      </View>
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
    justifyContent: "space-between",
  },
});
