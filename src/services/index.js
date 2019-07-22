import axios from 'axios';

const baseUrl = 'http://tcitpost.dassi.cl/api';

const _console = (res) => {console.log(res); return res; };


export default {
  getPosts()
  {
    return axios
      .get(baseUrl + '/posts')
      .then(_console)
    ;
  },

  addPost(post)
  {
    return axios
      .post(baseUrl + '/posts', post)
      .then(_console)
    ;
  },

  removePost(post)
  {
    return axios
      .delete(baseUrl + '/posts/' + post.id )
      .then(_console)
    ;
  }

};
