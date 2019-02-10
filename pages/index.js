import React, { Component } from 'react';
import base from '../lib/db';
import BlogList from '../components/BlogList';

export default class Index extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = { blogs: [] };
  }

  componentDidMount() {
    this._isMounted = true;
    this.ref = base
      .get('blogs', {
        context: this,
        withIds: true,
        query: ref => ref.orderBy('createdAt', 'desc')
      })
      .then(blogs => {
        if (this._isMounted) {
          this.setState({ blogs });
        }
      })
      .catch(error => {
        console.log(`There was an error on fetching blogs ${error}`);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
    base.removeBinding(this.ref);
  }

  render() {
    return <BlogList blogs={this.state.blogs} />;
  }
}
