import { StyleSheet, FlatList, View, Text, SafeAreaView, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import theme from '../theme'
import ListItem from './ListItem'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function FavModal(props) {
  const [currentFavs,  setCurrentFavs] = useState(null)
  const {data, favs, setModalVisible} = props

  useEffect(() => {
      const favorites = []
      if(favs) {
        data.forEach(hymn => {
          favs.forEach(num => {
            if(hymn.number === num){
              return favorites.push(hymn)
            }
          })
        });
        setCurrentFavs(favorites)
      }
  }, [favs, data])
  
  const renderItem = ({ item }) => (
    <ListItem
      {...props}
      data={item}
     />
  );

  // console.log(currentFavs)

  return (
    <SafeAreaView>
        <View style={styles.modal}>
            <Button title='Close' onPress={ () => setModalVisible(false)}/>
            <FlatList
            data={currentFavs}
            renderItem={renderItem}
            keyExtractor={(item, id) => id}
          /> 
          {currentFavs === null || currentFavs.length < 0 && <Text>No Favorites</Text>}
        </View> 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    modal: {
        height:'100%',
        marginTop:  20,
        borderRadius: 20,
        backgroundColor: theme.colors.dark
    }
})