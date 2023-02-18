import { View, Text,ActivityIndicator,  SafeAreaView, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import List from "../components/List";
import Header from "../components/Header";
import FavModal from "../components/FavModal";
// import { data } from "../database/himnos.js";
// import data from "../database/himnos.json";
import { ref, onValue } from "firebase/database";
import { database } from "../database/firebaseConfig";
import * as Updates from 'expo-updates'; 


const Main = ( props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [fireData, setFireData] = useState(null)
  const [updated, setUpdated] = useState(true)

  useEffect(() => {
    const timer = setInterval(async () => {
      const update = await Updates.checkForUpdateAsync()
      if(update.isAvailable) { 
        setUpdated(false)
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync(); 
        setUpdated(true)

      }
    }, 3000)
    return () => clearInterval(timer)
}, [])

  useEffect(() => {
    onValue(ref(database, 'IDCHimnos/himnos'), (snapshot) => {
      const data = snapshot.val()
      setFireData(data)
    })
    
    return () => {
      
    }
  }, [])
  


  const searchData = () => {
    const searchLowerCase = search.toLowerCase()
    var arrayFilter = []

      if(parseInt(searchLowerCase)) {
        fireData.map((hymn) => {
          if(hymn.number.includes(searchLowerCase)){
            arrayFilter.push(hymn)
          }
        })
      } else if(searchLowerCase.length > 2) {
        if(searchLowerCase.includes(' ')){
          fireData.map((hymn) => {
            if(hymn.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchLowerCase.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) ){
              arrayFilter.push(hymn)
            }
          })
   
        } else { 
          fireData.map((hymn) => {
            var title = hymn.title.toLowerCase()

            var bod = hymn.body.replace(/I|II|II|IV|V|coro|Coro|(Se Repite)|\.|\,|\¡|\!/g,'').replace(/\s+/gm, ' ').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ')
            // console.log( title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchLowerCase) );
            
            if(title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchLowerCase) || bod.includes(searchLowerCase)){
              arrayFilter.push(hymn)
            }
            
          })
        }
  
      }

      return arrayFilter  
  }

  return (
    !updated ?
    <View style={{
      flex:1,
      justifyContent:'center'
    }}>
      <ActivityIndicator color="white" size="large"/>
    </View>
    :
    <SafeAreaView>
      <Header
        search={search}
        setSearch={setSearch}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <Text>TEST</Text>
      <List
        {...props}
        data={searchData().length > 0 ?  searchData() : fireData}
        setModalVisible={setModalVisible}
      />
      <Modal transparent={true} animationType="slide" visible={modalVisible}>
        <FavModal
          {...props}
          data={fireData}
          setModalVisible={setModalVisible}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default Main;
