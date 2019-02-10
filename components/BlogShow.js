import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import getConfig from 'next/config';
import DateFormatter from './DateFormatter';
import RelatedBlogs from './RelatedBlogs';
import UserInfo from './UserInfo';

const { publicRuntimeConfig } = getConfig();

export default class BlogShow extends Component {
  render() {
    const { title, userId, intro, content, createdAt } = this.props.blog;
    return (
      <Fragment>
        <Head>
          <title>
            {title} | {publicRuntimeConfig.pageTitle}
          </title>
          <meta name="description" content={intro} />
        </Head>

        <div className="content is-medium">
          <div>
            <h1 className="title has-text-centered">
              {title}{' '}
              <span className="pointer" onClick={this.props.toggleEditMode}>
                <i className="material-icons">edit</i>
              </span>
            </h1>
            <div className="subtitle is-6">
              <UserInfo userId={userId} />
            </div>
          </div>
          <p className="has-text-centered is-size-4">{intro}</p>
          <div className="columns">
            <div className="column is-9">
              <div className="is-size-6">{content}</div>
              <div className="is-size-7 publish-date">
                This blog was written{' '}
                <em>
                  <DateFormatter timestamp={createdAt} />
                </em>
              </div>
            </div>
            <div className="column is-3">
              <RelatedBlogs userId={userId} />
            </div>
          </div>
        </div>
        <style jsx>{`
          .publish-date {
            margin-top: 1rem;
          }
        `}</style>
      </Fragment>
    );
  }
}
