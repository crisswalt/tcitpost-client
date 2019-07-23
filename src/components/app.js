import React, {Component} from 'react';
import { connect } from 'react-redux';
import { actions } from '../actions';
import {
  App,
  Statusbar,
  View,
  Page,
  Navbar,
  NavRight,
  Link,
  BlockTitle,
  List,
  Button,
  Progressbar,
  ListInput,
  Card,
  CardHeader,
  CardContent,
  CardFooter

 } from 'framework7-react';

import routes from '../routes';

class AppRoot extends Component
{

  render() {
    const _params = {
      id: 'cl.tcit.postfrontend',
      name: 'Tcit Post Frontend',
      theme: 'auto'
    };
    return (
      <App params={_params}>

        <Statusbar />

        <View id="main-view" main >
        { this.props.activeView == 'list' ? (
          <Page>
            <Navbar title="Posts - Tcit">
              <NavRight>
                {/* Error */  !! this.props.error && setTimeout(this.props.clearError, 3000) && <small styles="color:red">{this.props.error}</small> }
                <Link icon="icon-plus" onClick={ e => this.props.changeView() }></Link>
              </NavRight>
            </Navbar>

            {/*isLoading*/ this.props.isLoading && <Progressbar infinite></Progressbar>}

            {/* Filtro */}
            <List inlineLabels noHairlinesMd>
              <ListInput
                label="Filtro"
                type="text"
                placeholder="buscar..."
                onChange={ e => this.props.filterPosts(e.target.value) }
                onInputClear={ e => this.props.filterPosts('') }
                clearButton
              >
              </ListInput>
            </List>

            {/* Lista de Posts */}
            <BlockTitle>Listado de Posts</BlockTitle>
            {this.postsFiltered(this.props.posts, this.props.filter).map( post => (
              <Card key={this.props.post.id}>
                <CardHeader>
                  {this.props.post.name}
                </CardHeader>
                <CardContent>
                  <p>{this.props.post.description}</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => this.props.removePost(post)}>Eliminar</Button>
                </CardFooter>
            </Card> ))}
            </Page>
        ) : (
          <Page>
            <Navbar title="Nuevo Post" backLink="Back" />
            {/*isLoading*/ this.props.isLoading && <Progressbar infinite></Progressbar>}

            <BlockTitle>Post</BlockTitle>
            <List form padding onSubmit={ e => {
              e.preventDefault();
              let name = e.target.querySelector('input');
              let description = e.target.querySelector('textarea');

              this.props.addPost({name: name.value, description: description.value});
              name.value = description.value = '';
              return false;
            }}>
              <ListInput
                outline
                label="Nombre"
                type="text"
                placeholder="nombre único"
                clearButton
              />
              <ListInput
                outline
                label="Descripción"
                type="textarea"
                placeholder="Detalle Post"
                clearButton
              />
              <Button raised fill type="submit">Enviar</Button>
            </List>
          </Page>
        ) }

        </View>

      </App>
    );
  }

  postsFiltered(posts = [], filter) {
    return posts.filter( post =>
      filter === '' || post.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  componentDidMount() {
      this.props.listAllPosts();
  }

}

const mapStateToProps = state => ({
  error: state.postsReducer.error,
  isLoading: state.postsReducer.isLoading,
  posts: state.postsReducer.items,
  filter: state.filterReducer,
  activeView: state.changeViewReducer,
});

const mapDispatchToProps = {
  listAllPosts: actions.listAllPosts,
  addPost: actions.addPost,
  removePost: actions.removePost,
  filterPosts: actions.filterPosts,
  clearError: actions.clearError,
  changeView: actions.changeView,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
