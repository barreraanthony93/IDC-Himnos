import { View, ScrollView, FlatList, Platform } from "react-native";
import React, { useCallback, useState } from "react";
import ListItem from "./ListItem.js";
const List = (props) => {
  const [numLoaded, setNumLoaded] = useState(20);
  const { data } = props;

  // const renderItem = useCallback(
  //   (item, index) => {
  //     console.log(item.title);
  //     return <ListItem key={item.title + index} {...props} data={item} />;
  //   },
  //   [props]
  // );

  const loadMore = () => {
    setNumLoaded(numLoaded + 20);
  };

  return Platform.OS === "android" ? (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 150,
      }}
    >
      {data &&
        data.map((item, index) => (
          <ListItem key={item.type + index} {...props} data={item} />
        ))}
    </ScrollView>
  ) : (
    <FlatList
      data={data}
      renderItem={({ item }, index) => (
        <ListItem key={item.type + index} {...props} data={item} />
      )}
      initialNumToRender={100}
      keyExtractor={(item, id) => id}
      contentContainerStyle={{ paddingBottom: 150 }}
      onEndReached={loadMore}
    />
  );
};

export default List;
