import React, { Fragment, Component } from 'react';
import Link from 'next/link';
import base from '../lib/db';

export default class RelatedBlogs extends Component {
  isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
    };
  }

  componentDidMount() {
    this.isMounted = true;
    this.ref = base
      .get('blogs', {
        context: this,
        withIds: true,
        query: (ref) => ref
          .where('userId', '==', this.props.userId)
          .limit(5)
          .orderBy('createdAt', 'desc'),
      })
      .then((blogs) => {
        if (this.isMounted) {
          this.setState({ blogs });
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`There was an error fetching blogs ${error}`);
      });
  }

  componentWillUnmount() {
    this.isMounted = false;
    base.removeBinding(this.ref);
  }

  render() {
    return (
      <Fragment>
        More blogs by this author
        <ul>
          {this.state.blogs.map((blog) => (
            <li key={blog.id}>
              <Link as={`/blog/${blog.slug}`} href={`/blog?slug=${blog.slug}`}>
                <a>{blog.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}
