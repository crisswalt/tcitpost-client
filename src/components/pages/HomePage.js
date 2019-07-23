import React from 'react';
import {
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    NavRight,
    Link,
    Toolbar,
    Block,
    BlockTitle,
    List,
    ListItem,
    Row,
    Col,
    Button
} from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Posts - Tcit">
      <NavRight>
        {/* Error */  !! error && setTimeout(this.props.clearError, 3000) && <small styles="color:red">{error}</small> }
        <Link icon="icon-bars" panelOpen="right"></Link>
      </NavRight>
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


  </Page>
);
