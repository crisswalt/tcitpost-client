import service from '../services';

// LIST_ALL_POSTS ADD_POST REMOVE_POST FILTER_POSTS
export const actionsType = {
  LIST_ALL_POSTS_REQUEST: 'LIST_ALL_POSTS_REQUEST',
  LIST_ALL_POSTS_SUCCESS: 'LIST_ALL_POSTS_SUCCESS',
  LIST_ALL_POSTS_FAILURE: 'LIST_ALL_POSTS_FAILURE',

  ADD_POST_REQUEST:       'ADD_POST_REQUEST',
  ADD_POST_SUCCESS:       'ADD_POST_SUCCESS',
  ADD_POST_FAILURE:       'ADD_POST_FAILURE',

  REMOVE_POST_REQUEST:    'REMOVE_POST_REQUEST',
  REMOVE_POST_SUCCESS:    'REMOVE_POST_SUCCESS',
  REMOVE_POST_FAILURE:    'REMOVE_POST_FAILURE',

  FILTER_POSTS:           'FILTER_POSTS'
};

export const actions = {
  listAllPosts: () => (dispatch) => {
    // send state request
    dispatch({ type: actionsType.LIST_ALL_POSTS_REQUEST });
    // get load posts from api
    service.getPosts()
      .then( res => dispatch({ type: actionsType.LIST_ALL_POSTS_SUCCESS, posts: res.data }))
      .catch( error => {
        let msg = 'Ocurrió un error!';
        dispatch({ type: actionsType.LIST_ALL_POSTS_FAILURE, error: msg });
      })
    ;
  },
  addPost: (post) => (dispatch) => {
    // send state request
    dispatch({ type: actionsType.ADD_POST_REQUEST });
    // send post to api and receive reply
    service.addPost(post)
      .then( res => dispatch({ type: actionsType.ADD_POST_SUCCESS, post: res.data }) )
      .catch( error => {
        let msg;
        switch (error.response.status) {
          case 422:
            msg = 'No se puede crear el post. Puede que ya exista uno con el mismo nombre.';
            break;
          default:
            msg = `Ocurrió un error (${error.response.status})`;
        }
        dispatch({ type: actionsType.ADD_POST_FAILURE, error: msg });
      })
    ;
  },
  removePost: (post) => (dispatch) => {
    // send state request
    dispatch({ type: actionsType.REMOVE_POST_REQUEST });
    // delete post in server api and receive confirm
    service.removePost(post)
      .then( res => dispatch({ type: actionsType.REMOVE_POST_SUCCESS, post: res.data }) )
      .catch( error => {
        dispatch({ type: actionsType.REMOVE_POST_FAILURE, error: error });
        console.log('error', error);
      })
    ;
  },
  filterPosts: (filter) => ({ type: actionsType.FILTER_POSTS, filter: filter })
};
