// /actions/index.js
import { types } from './types'


export const loadFonts = () => {
  return {
    type: types.LOAD_FONTS,
  }
}

export const fontsLoaded = fontsLoaded => {
  return {
    type: types.FONTS_LOADED,
    payload: {
      fontsLoaded
    }
  }
}

export const toggleDrawer = () => {
  return {
    type: types.TOGGLE_DRAWER
  }
}

export const getArticlesList = () => {
  return {
    type: types.GET_ARTICLES_LIST,
  }
}

export const getArticle = (slug, index)=> {
  return {
    type: types.GET_ARTICLE,
    payload: {
      slug,
      index
    }
  }
}
