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
    Button,
    Progressbar,
    ListInput,
    Card,
    CardHeader,
    CardContent,
    CardFooter
} from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Posts - Tcit">
      <NavRight>
        {/* Error */  !! this.props.error && setTimeout(this.props.clearError, 3000) && <small styles="color:red">{this.props.error}</small> }
        <Link icon="icon-bars" panelOpen="right"></Link>
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
      </Card>
    ))}


  </Page>
);
