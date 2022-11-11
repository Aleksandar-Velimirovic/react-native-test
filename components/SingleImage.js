import React from 'react';
import { StyleSheet, Image, Animated } from 'react-native';

export default function SingleImage(props) {

  return (
    <Animated.View>
      <Image source={{uri: props.item?.owner.avatar_url}} style={styles.oneImage}/>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  oneImage: {
    width: 70,
    height: 70,
  }
});

