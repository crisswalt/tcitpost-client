import React, {Component} from 'react';
import { connect } from 'react-redux';
import { actions } from '../actions';
import {
  App,
  Statusbar,
  View,
  Page,
  Panel,
  Navbar,
  Button,
  List,
  ListInput,
  BlockTitle,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Fab,
  NavRight,
  Link,
  Progressbar
 } from 'framework7-react';


class AppRoot extends Component
{

  render() {
    const { error, isLoading, posts, filter } = this.props;
    const _params = {
      id: 'cl.tcit.postfrontend',
      name: 'Tcit Post Frontend',
      theme: 'auto'
    };
    return (
      <App params={_params}>

        <Statusbar />

        <View main>
          <Page>
            <Navbar title="Posts - Tcit">
              {/* Error */  !! error && setTimeout(this.props.clearError, 3000) && <NavRight><small styles="color:red">{error}</small></NavRight> }
            </Navbar>

            {/*isLoading*/ isLoading && <Progressbar infinite></Progressbar>}

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
            {this.postsFiltered(posts, filter).map( post => (
              <Card key={post.id}>
                <CardHeader>
                  {post.name}
                </CardHeader>
                <CardContent>
                  <p>{post.description}</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => this.props.removePost(post)}>Eliminar</Button>
                </CardFooter>
              </Card>
            ))}

            {/* Boton para desplegar Formulario new Post */}
            <Fab position="right-bottom" slot="fixed" panelOpen="left">
              <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left" ></Link>
            </Fab>

            <Panel left cover themeDark>
              <Page padding>
                <Navbar title="Nuevo Post" />

                <BlockTitle>Post</BlockTitle>
                <List form padding onSubmit={ e => {
                  e.preventDefault();
                  let name = e.target.querySelector('input');
                  let description = e.target.querySelector('textarea');

                  this.props.addPost({name: name.value, description: description.value});
                  name.value = description.value = '';
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
            </Panel>

          </Page>
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
});

const mapDispatchToProps = {
  listAllPosts: actions.listAllPosts,
  addPost: actions.addPost,
  removePost: actions.removePost,
  filterPosts: actions.filterPosts,
  clearError: actions.clearError,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
