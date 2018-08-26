import React, { Component } from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';


export default class ImageWithLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: false,
    }
  }

  render() {
    return(
      <View style={[
        styles.container,
        this.state.loading
        ? { height: this.props.style.height }
        : null
      ]}>
        <Image { ...this.props }
         style={[
           this.props.style,
           this.state.loading
           ? { height: 1 }
           : { height: this.props.style.height }
         ]}
         source={ this.props.source }
         onLoad={ () => this.setState({ loading: false }) }
         onError={ () => this.setState({ loading: false, error: true }) }/>
        <ActivityIndicator
         color='#3197DF'
         size='large'
         animating={ this.state.loading }/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  }
})
