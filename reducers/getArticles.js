// reducers/getArticles.js
import { types } from '../actions/types';
import { List, Map } from 'immutable';


const getArticles = ( state = Map({
  articlesList: List([]),
  articlesListLoading: true, //default to showing loader
  selectedArticle: undefined,
  selectedArticleIndex: 0,
  selectedArticleLoading: true, //default to showing loader
  fetchFailed: false, //default to showin loader
}), action ) => {


  switch(action.type) {

    case types.GET_ARTICLES_LIST:

      return state.set('articlesListLoading', true);


    case types.RECEIVE_ARTICLES_LIST:

      return state.merge({
        'articlesList': List(action.payload.articlesList.posts),
        'fetchFailed': false, //stop showing error message if shown
        'articlesListLoading': false, //stop showing loader
      });


    case types.GET_ARTICLE:

      return state.set('selectedArticleLoading', true);


    case types.GET_ARTICLE_BY_INDEX:

      return state.set('selectedArticleLoading', true);


    case types.RECEIVE_ARTICLE:

      return state.merge({
        'selectedArticle': Map(action.payload.article.posts[0]),
        'selectedArticleIndex': action.payload.index, // only set index when article is succesfully received
        'fetchFailed': false, //stop showng error message if shown
        'selectedArticleLoading': false //stop showing loader
      });


    case types.FETCH_FAILED:

      return state.merge({
        'fetchFailed': true, //show error message
        'articlesListLoading': false, //stop showing loader
        'selectedArticleLoading': false, //stop showing loader
      });

    default:
      return state;
  }
}

export default getArticles;
