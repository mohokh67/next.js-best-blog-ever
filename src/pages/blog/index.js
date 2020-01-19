import React, { Component } from 'react';
import Router, { withRouter } from 'next/router';
import Error from 'next/error';
import base from '../../lib/db';
import {
  fetchDocumentFromCollectionByFieldName,
  isEmpty,
} from '../../lib/utility';
import BlogShow from '../../components/BlogShow';
import BlogEdit from '../../components/BlogEdit';

class Blog extends Component {
  isMounted = false;

  static async getInitialProps({ query }) {
    let blog = {};
    let found = false;
    await new Promise((resolve) => {
      fetchDocumentFromCollectionByFieldName({
        collectionName: 'blogs',
        fieldName: 'slug',
        value: query.slug,
      }).then((foundBlog) => {
        if (!isEmpty(foundBlog)) {
          found = true;
          blog = foundBlog;
        }
        resolve();
      });
    });

    return { blog, found };
  }

  constructor(props) {
    super(props);
    this.state = {
      blog: null,
      editMode: false,
    };
  }

  toggleEditMode = () => {
    if (this.isMounted) {
      this.setState((prevState) => ({
        editMode: !prevState.editMode,
      }));
    }
  };

  updateBlog = (blog) => {
    if (this.isMounted) {
      this.setState({ blog });
    }
    Router.push(`/blog?slug=${blog.slug}`, `/blog/${blog.slug}`);
  };

  componentDidMount() {
    this.isMounted = true;
    this.ref = base.syncDoc(`/blogs/${this.props.blog.id}`, {
      context: this,
      state: 'blog',
    });
  }

  componentWillUnmount() {
    this.isMounted = false;
    base.removeBinding(this.ref);
  }

  render() {
    if (!this.props.found) {
      return <Error statusCode={404} />;
    }

    if (this.state.editMode) {
      return (
        <BlogEdit
          toggleEditMode={this.toggleEditMode}
          blog={this.props.blog}
          updateBlog={this.updateBlog}
        />
      );
    }

    return (
      <BlogShow blog={this.props.blog} toggleEditMode={this.toggleEditMode} />
    );
  }
}

export default withRouter(Blog);
