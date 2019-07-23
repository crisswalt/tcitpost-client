import { combineReducers } from 'redux';
import { actionsType } from '../actions';

const initialPosts = {
  error: null,
  isLoading: false,
  items: []
};

function postsReducer(state = initialPosts, action)
{
  switch (action.type) {
    case actionsType.LIST_ALL_POSTS_REQUEST:         // request list all
    case actionsType.ADD_POST_REQUEST:               // request add post
    case actionsType.REMOVE_POST_REQUEST:            // require remove post
      console.log('llega aquí...');
      return Object.assign({}, state, { isLoading: true });
    case actionsType.LIST_ALL_POSTS_SUCCESS: // success list all
      return Object.assign({}, state, { error: null, isLoading: false, items: action.posts });
    case actionsType.ADD_POST_SUCCESS:       // success add post
      return Object.assign({}, state, { error: null, isLoading: false, items: [ ...state.items, action.post ]});
    case actionsType.REMOVE_POST_SUCCESS:    // success remove post
      return Object.assign({}, state, { error: null, isLoading: false, items: state.items.filter( item => item.id !== action.post.id) });
    case actionsType.LIST_ALL_POSTS_FAILURE: // failure list all
    case actionsType.ADD_POST_FAILURE:       // failure add post
    case actionsType.REMOVE_POST_FAILURE:    // failure remove post
      console.log('reduce error', action.error);
      return Object.assign({}, state, { isLoading: false, error: action.error.message });
    case actionsType.CLEAR_ERROR:
      return Object.assign({}, state, { error: null });
    default:
      return state;
  }
}


function filterReducer(state = '', action)
{
  switch (action.type) {
    case actionsType.FILTER_POSTS:
      return action.filter;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postsReducer,
  filterReducer,
});

export default rootReducer;
