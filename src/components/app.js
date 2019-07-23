import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../actions';
import {
  App,
  Panel,
  View,
  Statusbar,
  Popup,
  Page,
  Navbar,
  NavRight,
  Link,
  Block,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  BlockFooter
} from 'framework7-react';


class AppRoot extends React.Component
{
  componentDidMount() {
      this.props.listAllPosts();
  }

  render() {
    const { error, isLoading, posts, filter } = this.props;
    const _params = {
      id: 'cl.tcit.postfrontend',
      name: 'Tcit Post Frontend',
      theme: 'auto'
    };
    let name, description, myFilter;
    return (
      <App params={_params}>
        {/* StatusBar */}
        <StatusBar />
        {/*
        <div className="App">
          <label><input ref={node => myFilter = node } onChange={ e => {
            e.preventDefault();
            this.props.filterPosts(myFilter.value);
          }}></input> Filter</label>
          <h2>Listado de Posts</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.postsFiltered(posts, filter).map( post => (
                <tr key={post.id}>
                  <td>{post.name}</td>
                  <td>{post.description}</td>
                  <td><button onClick={() => this.props.removePost(post)}>Eliminar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Nuevo Post</h2>
          <div>
            <form onSubmit={ e => {
              e.preventDefault();
              if (!name.value.trim()) {
                return;
              }
              this.props.addPost({name: name.value, description: description.value});
              name.value = description.value = '';
            }}>
              <input ref={ node => name = node } placeholder="Nombre"></input>
              <input ref={ node => description = node } placeholder="Descripción"></input>
              <button type="submit">
                Agregar Post
              </button>
            </form>
          </div>
        </div>
        */}
      </App>
    );
  }

  postsFiltered(posts = [], filter) {
    return posts.filter( post =>
      filter === '' || post.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

}

const mapStateToProps = state => ({
  error: state.postsReducer.error,
  isLoading: state.postsReducer.isLoading,
  posts: state.postsReducer.items,
  filter: state.filterReducer,
});

const mapDispatchToProps = {
  listAllPosts: actions.listAllPosts,
  addPost: actions.addPost,
  removePost: actions.removePost,
  filterPosts: actions.filterPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
