import {
  View,
  Text,
  Animated,
  ActivityIndicator,
  Platform,
  StatusBar,
  SafeAreaView,
  Modal,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import List from "../components/List";
import Header from "../components/Header";
import FavModal from "../components/FavModal";
import SearchModal from "../components/SearchModal";
// import { data } from "../database/himnos.js";
// import data from "../database/himnos.json";
import { ref, onValue } from "firebase/database";
import { database } from "../database/firebaseConfig";
import * as Updates from "expo-updates";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tabs from "../components/Tabs";

const { width } = Dimensions.get("screen");

const Main = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [himnos, setHimnos] = useState(null);
  const [cantos, setCantos] = useState(null);
  const [updated, setUpdated] = useState(true);
  const [active, setActive] = useState(0);
  const [activeData, setActiveData] = useState(null);
  const [loading, setLoading] = useState(false);
  const slideOver = useRef(new Animated.Value(0)).current;

  const AndroidSafeArea = {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  };

  useEffect(() => {
    if (!__DEV__) {
      const timer = setInterval(async () => {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          setUpdated(false);
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
          setUpdated(true);
        }
      }, 3000);
      return () => clearInterval(timer);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setActiveData(active == 0 ? cantos : himnos);
      setLoading(false);
    }, 200);
  }, [active]);

  useEffect(() => {
    onValue(ref(database, "himnos"), (snapshot) => {
      const data = snapshot.val();
      setHimnos(data);
      setActiveData(data);
    });
    onValue(ref(database, "canticos"), (snapshot) => {
      const data = snapshot.val();
      setCantos(data);
    });

    return () => {};
  }, []);

  useEffect(() => {
    if (active == 1) {
      Animated.timing(slideOver, {
        toValue: -width,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideOver, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [active]);

  return !updated || !cantos ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <ActivityIndicator color="white" size="large" />
    </View>
  ) : (
    <SafeAreaView style={AndroidSafeArea}>
      <Header
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setSearchModal={setSearchModal}
        active={active}
      />

      {cantos && himnos ? (
        <Animated.View
          style={{
            flex: 1,
            flexDirection: "row",
            transform: [{ translateX: slideOver }],
          }}
        >
          <View
            style={{
              width,
            }}
          >
            <List data={cantos} setModalVisible={setModalVisible} />
          </View>
          <View
            style={{
              width,
            }}
          >
            <List data={himnos} setModalVisible={setModalVisible} />
          </View>
        </Animated.View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color="white" size="large" />
        </View>
      )}
      {cantos && himnos && (
        <>
          <Modal transparent={true} animationType="slide" visible={searchModal}>
            <SearchModal
              data={[...cantos, ...himnos]}
              setSearchModal={setSearchModal}
            />
          </Modal>
          <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
          >
            <FavModal
              data={[...cantos, ...himnos]}
              setModalVisible={setModalVisible}
            />
          </Modal>
        </>
      )}
      <View
        style={{
          position: "absolute",
          bottom: 25,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Tabs
          active={active}
          setActive={setActive}
          tabs={["Canticos", "Himnos"]}
        />
      </View>
    </SafeAreaView>
  );
};

export default Main;
