import React from 'react';
import { connect } from 'redux';

import { actions } from '../actions';

class App extends React.Component
{
  componentDidMount() {
      listAllPosts();
  }

  render() {
    const { error, isLoading, posts, filter } = this.props;

    if (error) {
      return <div>Error: { error }</div>;
    } else if (isLoading) {
      return <div>Loading...</div>;
    } else {
      let name, description, myFilter;

      return (
        <div className="App">
          <label><input ref={node => myFilter = node } onChange={ e => {
            e.preventDefault();
            filterPosts(myFilter.value);
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
                  <td><button onClick={() => actions.removePost(post)}>Eliminar</button></td>
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
              addPost({name: name.value, description: description.value});
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
      );
    }
  }

  postsFiltered(posts = [], filter) {
    return posts.filter( post =>
      filter === '' || post.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

}

const mapStateToProps = state => ({
  error: state.posts.error,
  isLoading: state.posts.isLoading,
  posts: state.posts.items,
  filter: state.filter,
});


export default connect(mapStateToProps, actions)(App);
