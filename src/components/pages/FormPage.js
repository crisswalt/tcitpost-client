import React from 'react';
import {
  Page,
  Navbar,
  List,
  ListInput,
  BlockTitle,
  Button,
  Progressbar
} from 'framework7-react';

export default (props) => (
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
);
