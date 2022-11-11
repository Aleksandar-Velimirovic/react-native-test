import { StyleSheet, Text, View, Image, FlatList, Animated, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useRef, useEffect} from 'react';
import LoadingSpinner from "./LoadingSpinner";
import Gists from "./Gists";
import SingleImage from "./SingleImage";

export default function ListComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1));
  const [fadeOpacity, setFadeOpacity] = useState(fadeAnim.current);
  const listSize = 75

  const api = `https://api.github.com/gists/public?per_page=30&page=${page}`

  const fetchData = async () => {
    try {
      const response = await fetch(api);
      const result = await response.json();
      setData([...data, ...result]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const getFilename = (item) => {
    if (typeof item === 'undefined' || typeof item.files === 'undefined') {
      return;
    }

    const resultArray = Object.values(item.files);
    if ((!resultArray || !resultArray.length) || !resultArray[0].hasOwnProperty('filename')) {
      return;
    }
    return Object.values(item.files)[0].filename;
  }

  const fadeOut = (index) => {
    setSelectedIndex(index)
    Animated.timing(fadeOpacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true
    }).start();
    setTimeout(() => {
      setFadeOpacity(new Animated.Value(1));
      setSelectedIndex(null);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <View>
      <Gists/>
      <View>
       { loading ? ( <LoadingSpinner/> ) : <Animated.FlatList onScroll={Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { y: scrollY }
        }
      }
    ],
    { useNativeDriver: true }
  )} data={data} onEndReachedThreshold={0.5} onEndReached={() => setPage(page + 1)} keyExtractor={(item, index) => String(index)} renderItem={({item, index}) => {
          const inputRange = [
            -1, 0, listSize * index, listSize * (index + 2), 
          ];
          const opacityInputRange = [
            -1, 0, listSize * index, listSize * (index + 1), 
          ];
          const scale = scrollY.interpolate({inputRange, outputRange:[1,1,1,0]});
          const opacity = scrollY.interpolate({inputRange: opacityInputRange, outputRange:[1,1,1,0]});
          return (
            <TouchableWithoutFeedback onPress={() => fadeOut(index)}>
              <Animated.View style={[styles.flatlist, {
                transform: [{ scale }]
              },{opacity}]}>
                <Image source={{ uri: item?.owner.avatar_url }} style={styles.imageItem}/>
                <Text style={styles.flatlistText}>{getFilename(item)}</Text>
                { selectedIndex === index ? <Animated.View style={{ opacity: fadeOpacity }}><SingleImage item={item}/></Animated.View> : '' }   
              </Animated.View>
            </TouchableWithoutFeedback>
          )
        }} />}    
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flatlist: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor:'lightgray',
    borderBottomWidth: 1,
    width: '100%',
    height: 75,
    backgroundColor: '#F0F0F0',
  },

  flatlistText: {
    marginLeft: 20,
    flex:1, 
    flexWrap: 'wrap',
  },

  imageItem: {
    width: 60,
    height: 60,
    marginLeft: 7,
  }
});
