import React, { Fragment, Component } from 'react';
import { StyleSheet, View, Text, FlatList, Animated, ActivityIndicator } from 'react-native';
import { ArticleListItem } from './ArticleListItem';
import { ErrorMessage } from './ErrorMessage';


export default class ArticleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      animation: new Animated.Value(-365)
    }

    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  toggle() {

    let initialValue = !this.props.openDrawer ? 0 : -this.props.layout.width,
        finalValue = !this.props.openDrawer ? -this.props.layout.width : 0;

    this.state.animation.setValue(initialValue);

    Animated.spring(
        this.state.animation,
        {
          toValue: finalValue,
          speed: 16,
          bounciness: 3,
        }
    ).start();
  }

  shouldComponentUpdate(nextProps, nextState) {

    if(
      nextProps.articlesList !== this.props.articlesList ||
      nextProps.selectedArticle !== this.props.selectedArticle ||
      nextProps.layout !== this.props.layout
    ) return true;

    return false;
  }

  componentDidUpdate(prevProps, prevState) {

    if(prevProps.openDrawer !== this.props.openDrawer)
      this.toggle();
  }

  render() {

    let layout = { height, left, top, width } = this.props.layout;

    return(
      <Animated.View style={[ styles.container, {
        height: height - (height > width ? 100 : 75),
        transform: [
          { translateX:  this.state.animation },
        ]
       }
      ]}>

        <View style={ styles.textWrapper }>
          <Text style={ styles.text }>
            SECTIONS
          </Text>
        </View>

        <FlatList
         data={ this.props.articlesList }
         keyExtractor={ (item, index) => item.id }
         refreshing={
           // show refresh indicator if data loading and fetch hasnt failed
           this.props.articlesList.length === 0 && !this.props.fetchFailed
         }
         tintColor='#3197DF'
         onRefresh={ () => {
           this.props.getArticlesList();
         }}
         ListEmptyComponent={
           // show refresh indocator if loading content, otherwise show error message
           (this.props.articlesListLoading || this.props.articlesList.length === 0
           && !this.props.fetchFailed)
           ? null
           : <ErrorMessage/>
         }
         renderItem={ ({ item, index }) => {
           return(
             <ArticleListItem
              title={ item.title }
              slug={ item.slug }
              index={ index }
              featureImage={ item.feature_image }
              getArticle={ this.props.getArticle }
              toggleDrawer={ this.props.toggleDrawer }
              selectedArticleIndex={ this.props.selectedArticleIndex }/>
           )
         }}/>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 2,
    width: '80%',
    bottom: -5,
    paddingBottom: 10,
    backgroundColor: '#D1D1D1',
    shadowOffset: { width: 6, height: 0 },
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOpacity: 1,
    elevation: 3,
  },
  textWrapper: {
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    paddingRight: 0,
    marginRight: 15,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  text: {
    width: 250,
    fontFamily: 'Roboto',
    fontSize: 24,
    color: '#777',
  },
});
