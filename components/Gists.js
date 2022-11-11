import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
  
export default function Gists() {
  return (
    <View style={styles.gists}>
      <Text style={{fontWeight: 'bold', fontSize: 18}}>Gists</Text>
    </View>
  );
}
  
const styles = StyleSheet.create({
  gists: {
    backgroundColor: '#E0E0E0',
    height: 30,
    paddingLeft: 12.5,
    paddingTop: 2,
    marginTop: 30,
  }    
});