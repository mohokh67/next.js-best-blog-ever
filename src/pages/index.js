import React, { Component } from 'react';
import base from '../lib/db';
import BlogList from '../components/BlogList';

export default class Index extends Component {
  isMounted = false;

  constructor(props) {
    super(props);
    this.state = { blogs: [] };
  }

  componentDidMount() {
    this.isMounted = true;
    this.ref = base
      .get('blogs', {
        context: this,
        withIds: true,
        query: (ref) => ref.orderBy('createdAt', 'desc'),
      })
      .then((blogs) => {
        if (this.isMounted) {
          this.setState({ blogs });
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`There was an error on fetching blogs ${error}`);
      });
  }

  componentWillUnmount() {
    this.isMounted = false;
    base.removeBinding(this.ref);
  }

  render() {
    return <BlogList blogs={this.state.blogs} />;
  }
}
