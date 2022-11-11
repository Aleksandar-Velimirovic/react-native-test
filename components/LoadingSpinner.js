import { StyleSheet, ActivityIndicator, View} from 'react-native';
import React from 'react'
  
export default function Loader() {
  return (
    <View style={styles.container}>
        <ActivityIndicator style={styles.spinner} size="large"/>
    </View>
  );
}
  
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%'
  },

  spinner: {
    display: 'flex',
    height: '75%'
  }
});