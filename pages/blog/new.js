import React, { Component } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import getConfig from 'next/config';
import { firestore, auth } from '../../lib/db';
import BlogCreate from '../../components/BlogCreate';

const { publicRuntimeConfig } = getConfig();

export default class newBlog extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  componentDidMount() {
    this._isMounted = true;
    auth.onAuthStateChanged(user => {
      if (user) {
        if (this._isMounted) {
          this.setState({ loggedIn: true });
        }
      } else {
        Router.push('/');
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  addBlog = blog => {
    firestore
      .collection('blogs')
      .add(blog)
      .then(() => {
        Router.push(`/blog?slug=${blog.slug}`, `/blog/${blog.slug}`);
      });
  };

  render() {
    if (!this.state.loggedIn) {
      return null;
    }
    return (
      <div>
        <Head>
          <title>New blog | {publicRuntimeConfig.pageTitle}</title>
        </Head>
        <BlogCreate addBlog={this.addBlog} />
      </div>
    );
  }
}
