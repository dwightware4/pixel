import React from 'react'
import { TouchableOpacity, Text } from 'react-native';

// this component requires an array of arguments and a function to be passed
// for handling press events
export const Button = (props) => {
  return(
    <TouchableOpacity
     style={ props.style }
     onPress={ props.onPress !== null ? () => props.onPress(...props.pressArgs) : null }>
      { props.children }
    </TouchableOpacity>
  );
}
