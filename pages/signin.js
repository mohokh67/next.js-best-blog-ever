import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import getConfig from 'next/config';
import Router from 'next/router';
import { auth, firebase, firestore } from '../lib/db';
import {
  fetchDocumentFromCollectionByFieldName,
  isEmpty
} from '../lib/utility';

const { publicRuntimeConfig } = getConfig();

export default class signin extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = { hideContent: true };
  }

  componentDidMount() {
    this._isMounted = true;
    auth.onAuthStateChanged(user => {
      if (user) {
        Router.push('/');
      } else if (this._isMounted) {
        this.setState({ hideContent: false });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    auth.signInWithPopup(authProvider).then(result => {
      const authUser = {
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,

        photo: result.user.photoURL
      };
      this.authHandler(authUser);
    });
  };

  authHandler = authUser => {
    // check if user exists in users collection
    fetchDocumentFromCollectionByFieldName({
      collectionName: 'users',
      fieldName: 'uid',
      value: authUser.uid
    }).then(foundUser => {
      if (isEmpty(foundUser)) {
        // it is an empty object
        // add the user to users collection and go to home page
        firestore
          .collection('users')
          .add(authUser)
          .then(createdUser => {
            localStorage.setItem(
              publicRuntimeConfig.localStorageUserId,
              createdUser.id
            );
            Router.push('/');
          });
      } else {
        // if yes, go to home page
        localStorage.setItem(
          publicRuntimeConfig.localStorageUserId,
          foundUser.id
        );
        Router.push('/');
      }
    });
  };

  render() {
    if (this.state.hideContent) {
      return null;
    }

    return (
      <Fragment>
        <Head>
          <title>Sign in | {publicRuntimeConfig.pageTitle}</title>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
          />
        </Head>
        <div className="columns">
          <div className="column is-one-third is-offset-one-third has-text-centered button-container">
            <button
              className="button google is-fullwidth"
              onClick={() => this.authenticate('Google')}
            >
              <span className="icon">
                <i className="fab fa-google" />
              </span>
              <span>Login with Google</span>
            </button>

            <button
              className="button facebook is-fullwidth"
              onClick={() => this.authenticate('Facebook')}
            >
              <span className="icon">
                <i className="fab fa-facebook" />
              </span>
              <span>Login with Facebook</span>
            </button>

            <button
              className="button twitter is-fullwidth"
              onClick={() => this.authenticate('Twitter')}
            >
              <span className="icon">
                <i className="fab fa-twitter" />
              </span>
              <span>Login with Twitter</span>
            </button>

            <button
              className="button github is-fullwidth"
              onClick={() => this.authenticate('Github')}
            >
              <span className="icon">
                <i className="fab fa-github" />
              </span>
              <span>Login with GitHub</span>
            </button>
          </div>
        </div>
        <style jsx>{`
          .button-container {
            margin-top: 2rem;
            margin-bottom: 2rem;
          }
          .button {
            color: #fff;
            opacity: 0.85;
            margin-top: 1rem;
          }
          .button:hover {
            opacity: 1;
          }
          .github {
            background-color: #444;
          }
          .facebook {
            background-color: #3b5998;
          }
          .twitter {
            background-color: #1583d7;
          }
          .google {
            background-color: #a32b1c;
          }
        `}</style>
      </Fragment>
    );
  }
}
