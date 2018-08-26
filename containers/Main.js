import { connect } from 'react-redux';
import Main from '../components/Main'
import { loadFonts, fontsLoaded, toggleDrawer, getArticlesList, getArticle } from '../actions';
import { ToJS } from '../components/ToJS'


const mapStateToProps = state => ({
  fontsDidLoad: state.fontsLoaded.get('fontsDidLoad'),
  openDrawer: state.navigation.get('openDrawer'),
  fetchingArticlesList: state.getArticles.get('fetchingArticlesList'),
  fetchingArticle: state.getArticles.get('fetchingArticle'),
  fetchFailed: state.getArticles.get('fetchFailed'),
  articlesList: state.getArticles.get('articlesList'),
  articlesListLoading: state.getArticles.get('articlesListLoading'),
  selectedArticle: state.getArticles.get('selectedArticle'),
  selectedArticleIndex: state.getArticles.get('selectedArticleIndex'),
  selectedArticleLoading: state.getArticles.get('selectedArticleLoading'),
});

const mapDispatchToProps = dispatch => ({
  loadFonts: () => dispatch(loadFonts()),
  fontsLoaded: status => dispatch(fontsLoaded(status)),
  toggleDrawer: () => dispatch(toggleDrawer()),
  getArticlesList: () => dispatch(getArticlesList(init=false)),
  getArticle: (slug, index) => dispatch(getArticle(slug, index)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToJS(Main)); //ToJS HOC to get JS objects from immutable.js state tree
