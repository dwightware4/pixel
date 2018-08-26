import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


export const ErrorMessage = props => {
  return(
    <View style={ styles.container }>

      <Text style={ styles.icon }>
        { String.fromCharCode(61546) }
      </Text>

      <Text style={ styles.text }>
        Error Loading Content
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 24,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: '#3197DF',
  },
  icon: {
    position: 'relative',
    alignSelf: 'center',
    margin: 15,
    color: '#3197DF',
    fontFamily: 'FA-Solid',
    fontSize: 50,
  },
});
