// sagas/index.js
import React from 'react';
import { put, takeLatest, all, call, } from 'redux-saga/effects';
import fetch from 'cross-fetch';
import { Font } from 'expo';
import { types } from '../actions/types';


const fetchData = (url, method, options) => {

  const baseURL = 'https://pixelandtexel-blog.ghost.io/ghost/api/v0.1/posts'

  return fetch(
    baseURL + url,
    method,
    options,
  ).then( response => {

    if(response.status !== 200)
      throw response.status

    return response.json();

  }).then( json => json )
  .catch( error => error );
}

const loadFonts = () => {

  // load custom fonts
  return Font.loadAsync({
   'Anton': require('../assets/fonts/Anton-Regular.ttf'),
   'Roboto': require('../assets/fonts/Roboto-Regular.ttf'),
   'RobotoBold': require('../assets/fonts/Roboto-Bold.ttf'),
   'FA-Brands': require('../assets/fonts/fa-brands-400.ttf'),
   'FA-Regular': require('../assets/fonts/fa-regular-400.ttf'),
   'FA-Solid': require('../assets/fonts/fa-solid-900.ttf'),
 }).then( () => true )
  .catch( () => false );
}

function* initLoadFonts() {

  try {
    const fontsLoaded = yield call(loadFonts);

    yield put({
      type: types.FONTS_LOADED,
      payload: {
        fontsLoaded
      }
    });
  } catch (error) {

    yield put({
      type: types.FONTS_LOADED,
      payload: {
        fontsLoaded: false
      }
    });
  }
}

function* getArticlesList() {
  // called once when Main.js mounts
  try {
    const articlesList = yield call(
      fetchData,
      '/?client_id=ghost-frontend&client_secret=c611c641c2e3'
    );
    // get first post from refreshed list
    yield call(
      getArticle,
      {
        type: types.GET_ARTICLE,
        payload: {
          slug: articlesList.posts[0].slug,
          index: 0,
        }
      }
    );

    yield put({
      type: types.RECEIVE_ARTICLES_LIST,
      payload: {
        articlesList,
        articlesListLoading: false,
      }
    });
  } catch (error) {

    yield put({
      type: types.FETCH_FAILED,
      payload: {
        error
      }
    });
  }
}

function* getArticle(action) {

  const article = yield call(
    fetchData,
    `/slug/${action.payload.slug}/?client_id=ghost-frontend%20&client_secret=c611c641c2e3`
  );

  yield put({
    type: types.RECEIVE_ARTICLE,
    payload: {
      article,
      articleLoading: false,
      index: action.payload.index,
    }
  });
}

function* loadFontsWatcher() {
  yield takeLatest(types.LOAD_FONTS, initLoadFonts);
}

function* articlesListWatcher() {
  yield takeLatest(types.GET_ARTICLES_LIST, getArticlesList);
}

function* articleWatcher() {
  yield takeLatest(types.GET_ARTICLE, getArticle);
}

export default function* rootSaga() {
  yield all([
    loadFontsWatcher(),
    articlesListWatcher(),
    articleWatcher(),
  ]);
}
