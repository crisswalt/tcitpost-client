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

import routes from '../routes';

class AppRoot extends Component
{

  render() {
    const { error, isLoading, posts, filter } = this.props;
    const _params = {
      id: 'cl.tcit.postfrontend',
      name: 'Tcit Post Frontend',
      theme: 'auto',
      routes
    };
    return (
      <App params={_params}>

        <Statusbar />

        <View id="main-view" main url="/" />

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
