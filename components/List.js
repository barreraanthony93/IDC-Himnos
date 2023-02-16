import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import ListItem from "./ListItem.js";
const List = ( props) => {
  // const [numLoaded, setNumLoaded] = useState(20);
  const {data} = props
 
  const renderItem = (item, index) => (
    <ListItem
      key={index}
      {...props}
      data={item}
    />
  );

  // const loadMore = () => {
  //   setNumLoaded(numLoaded + 20);
  // };

  return (
    <View>
      <ScrollView>
        {data && data.map((item, index) => (
         item.title && renderItem(item, index)
        ))}
      </ScrollView>
      {/* <FlatList
        data={data ? data.slice(0, numLoaded) : null}
        renderItem={renderItem}
        initialNumToRender={20}
        keyExtractor={(item, id) => id}
        onEndReached={loadMore}
        onEndReachedThreshold={0}
      /> */}
    </View>
  );
};

export default List;

// const styles = StyleSheet.create({
//   text: {
//     color: theme.colors.text,
//   },
// });
