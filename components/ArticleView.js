import React, { Fragment } from 'react';
import { StyleSheet, View, ScrollView, Text, ActivityIndicator } from 'react-native';
import HTML from 'react-native-render-html';
import { baseURL, prettyDate, getNextIndex, getSlugFromIndex } from '../constants';
import { Button } from './Button';
import ImageWithLoader from './ImageWithLoader';
import { ErrorMessage } from './ErrorMessage';


export const ArticleView = props => {
  return(
    //show loading indicator or error/content when not loading
    props.selectedArticleLoading
    ? <View style={ styles.loading }>
        <ActivityIndicator
           color='#3197DF'
           size='large'
           animating={ true }/>
     </View>
    //show either content or error screen if not actively loading
    : props.fetchFailed
      ? <ErrorMessage/>
      : <ScrollView
         style={ styles.container }
         scrollEnabled={ props.openDrawer ? false : true}>
          <View style={ styles.imageWrapper }>
          <ImageWithLoader
           style={{
             height: 200,
             margin: 15,
             marginTop: 25,
             marginBottom: 0,
             shadowOffset: { width: -3, height: 3 },
             shadowColor: 'rgba(0,0,0,0.5)',
             shadowOpacity: 1,
           }}
           resizeMode='contain'
           resizeMethod='scale'
           source={{ uri: baseURL + props.selectedArticle.feature_image }}/>
          </View>

          <Text style={ styles.titleText }>
            { props.selectedArticle.title }
          </Text>

          <Text style={ styles.dateText }>
            { prettyDate(props.selectedArticle.published_at) }
          </Text>

          <HTML
           tagStyles={{ iframe: { display: 'none' } }}
           containerStyle={{ margin: 15, marginTop: 0 }}
           html={ props.selectedArticle.html }/>

          <Button
           style={ styles.button }
           pressArgs={[
             getSlugFromIndex(
               props.articlesList,
               getNextIndex(props.articlesList ,props.selectedArticleIndex)
             ),
             getNextIndex(props.articlesList, props.selectedArticleIndex)
           ]}
           onPress={ props.getArticle }>
            <Text style={ styles.buttonText }>
              NEXT ARTICLE
            </Text>
          </Button>
        </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#D1D1D1',
  },
  titleText: {
    margin: 15,
    marginBottom: 0,
    fontFamily: 'Roboto',
    fontSize: 24,
    textAlign: 'center',
  },
  dateText: {
    marginTop: 25,
    marginLeft: 18,
    fontSize: 12,
    letterSpacing: 0.1,
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '60%',
    maxWidth: 250,
    margin:  30,
    padding: 40,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 40,
    backgroundColor: '#3197DF',
    shadowOffset: { width: -5, height: 5 },
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOpacity: 1,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
  }
});
