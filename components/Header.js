import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      posAnimation: new Animated.Value(15),
      opacityAnimation: new Animated.Value(1)
    }

    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  toggle() {

    let initialPosValue = !this.props.openDrawer ? this.props.layout.width - 50 : 15,
        finalPosValue = !this.props.openDrawer ? 15 : this.props.layout.width - 50,
        initialOpacityValue = this.props.openDrawer ? 1 : 0,
        finalOpacityValue = this.props.openDrawer ? 0 : 1;

    this.state.posAnimation.setValue(initialPosValue);
    this.state.opacityAnimation.setValue(initialOpacityValue);

    Animated.spring(
        this.state.posAnimation,
        {
          toValue: finalPosValue,
          speed: 16,
          bounciness: 3,
        }
    ).start();

    Animated.timing(
        this.state.opacityAnimation,
        {
          toValue: finalOpacityValue,
          duration: 200,
          delay: this.props.openDrawer ? 0 : 175,
        }
    ).start();

  }

  componentDidUpdate(prevProps, prevState) {

    if(prevProps.openDrawer !== this.props.openDrawer)
      this.toggle();
  }

  render() {

    let layout = { height, left, top, width } = this.props.layout;

    return(
      <View style={ styles.header }>

        <TouchableOpacity onPress={ () => this.props.toggleDrawer() }>
          <Animated.Text style={[
            styles.icon,
            { marginLeft: this.state.posAnimation }
          ]}>
            { String.fromCharCode(61641) }
          </Animated.Text>
        </TouchableOpacity>

        <Animated.Text style={[
          styles.title,
          { opacity: this.state.opacityAnimation }
        ]}>
          PIXEL BLOG
        </Animated.Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  header: {
    position: 'relative',
    zIndex: 2,
    justifyContent: 'center',
    width: '110%',
    height: 80,
    marginLeft: '-5%',
    paddingRight: '5%',
    paddingLeft: '5%',
    backgroundColor: '#3F3F3F',
    shadowOffset: { width: 0, height: 10 },
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOpacity: 1,
    elevation: 3,
  },
  icon: {
    position: 'relative',
    marginRight: 15,
    color: '#FFFFFF',
    fontFamily: 'FA-Solid',
    fontSize: 24,
  },
  title: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: 24,
    letterSpacing: 3,
  }
});
