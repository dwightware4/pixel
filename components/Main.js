import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Font } from 'expo';
import Header from './Header';
import ArticleList from './ArticleList';
import { ArticleView } from './ArticleView';


class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layout: {
        height: 0,
        width: 0,
        left: 0,
        top: 0,
      }
    }

    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  //detect orientation changes
  _onLayout( event ) {

    const { x, y, height, width } = event.nativeEvent.layout;

    if(height === 0 || width === 0) return;

    this.setState({
      layout: {
        height,
        width,
        left: x,
        top: y,
      }
    })
  }

  shouldComponentUpdate(nextProps, nextState) {

    if(nextProps.articlesList.length === 0 && nextProps.fetchFailed === false) return false;

    return true;
  }

  componentDidMount() {

   this.props.loadFonts(); //load custom fonts
   this.props.getArticlesList(); //only called here and on refresh of list in drawer
  }


  render() {

    let layout = { height, left, top, width } = this.state.layout;

    return (
      <View onLayout={ e => this._onLayout(e, this.props.setLayout) }>
       //dont render if fonts not loaded
      { this.props.fontsDidLoad
        ? <View style={[ styles.container, { paddingTop: height > width ? 25 : 0 } ]}>
            <Header
             layout={ this.state.layout }
             openDrawer={ this.props.openDrawer }
             toggleDrawer={ this.props.toggleDrawer }/>

            <ArticleList { ...this.props }
             layout={ this.state.layout }/>

            <ArticleView
             layout={ this.state.layout }
             openDrawer={ this.props.openDrawer }
             selectedArticle={ this.props.selectedArticle }
             selectedArticleIndex={ this.props.selectedArticleIndex }
             selectedArticleLoading={ this.props.selectedArticleLoading }
             articlesList={ this.props.articlesList }
             getArticle={ this.props.getArticle }
             fetchFailed={ this.props.fetchFailed }/>
          </View>
        : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: '#D1D1D1',
  }
});

export default Main;
