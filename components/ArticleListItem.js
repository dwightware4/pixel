import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import ImageWithLoader from './ImageWithLoader';


export const ArticleListItem = props => {

  let imageSource = 'https://pixelandtexel-blog.ghost.io' + props.featureImage;

  return(
    <View style={ styles.container }>
      <TouchableOpacity
       onPress={ () => {
         setTimeout(() => {
           props.getArticle(props.slug, props.index);
         }, 300)
         props.toggleDrawer(); //close drawer when article selected
       }}>

        <Image
         source={{ uri: imageSource }}
         style={[ styles.image,
           props.selectedArticleIndex === props.index //highlight border of current article
           ? { borderColor: '#3197DF' }
           : { borderColor: '#777' }
         ]}/>

        <Text style={ styles.text }>
          { props.title }
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 15,
    paddingRight: 0,
    marginRight: 15,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    flex: 0,
    height: 100,
    margin: 10,
    borderWidth: 3,
    borderRadius: 5,
  }
})
