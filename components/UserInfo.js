import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import { fetchDocumentFromCollection, isEmpty } from '../lib/utility';

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    fetchDocumentFromCollection({
      id: this.props.userId,
      collectionName: 'users',
    }).then((user) => {
      if (!isEmpty(user)) {
        this.setState({ user });
      }
    });
  }

  render() {
    if (this.state.user === null) {
      return <span>User not found</span>;
    }

    return (
      <Fragment>
        <div className="user-profile">
          <div>
            <figure className="image is-48x48">
              <img
                src={this.state.user.photo}
                alt="User profile photo"
                className="is-rounded"
              />
            </figure>
          </div>
          <div>
            <Link href="#">
              <a>@{this.state.user.name}</a>
            </Link>
          </div>
        </div>
        <style jsx>{`
          .user-profile {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
          }
          figure {
            margin-right: 0.3rem;
            margin-left: 0;
          }
        `}</style>
      </Fragment>
    );
  }
}
