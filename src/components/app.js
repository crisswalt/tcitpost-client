import React from 'react';

import service from '../services';

class App extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: [],
      filter: ''
    };
  }

  componentDidMount() {
    service.getPosts()
      .then( (res) => {
        this.setState({
          isLoaded: true,
          posts: res.data
        });
      })
      .catch( (error) => {
        this.setState({
          isLoaded: true,
          error
        });
        console.log('error', error);
      } )
    ;
  }

  render() {
    const { error, isLoaded, posts, filter } = this.state;

    if (error) {
      return <div>Error: { error }</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      let name, description, myFilter;

      return (
        <div className="App">
          <label><input ref={node => myFilter = node } onChange={ e => {
            e.preventDefault();
            this.setState({
              filter: myFilter.value
            });

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
                  <td><button onClick={() => this.delete(post)}>Eliminar</button></td>
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
              this.add({name: name.value, description: description.value});
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

  postsFiltered(posts, filter) {
    return posts.filter( post =>
      filter == '' || post.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  delete(post) {
    const { posts } = this.state;

    service.removePost(post)
      .then( (res) => {
        this.setState({
          posts: posts.filter( (post) => post.id !== res.data.id )
        });
      })
    ;
  }

  add(post) {
    const { posts } = this.state;

    service.addPost(post)
      .then( res => {
        this.setState({
          posts: [
            ...posts,
            res.data
          ]
        }
        );
      })
    ;
  }

}

export default App;
