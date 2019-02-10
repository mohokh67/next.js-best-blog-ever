import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import getConfig from 'next/config';
import { auth } from '../lib/db';

const { publicRuntimeConfig } = getConfig();

export default class TheNav extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      signedIn: false
    };
  }

  signOut = async () => {
    await auth.signOut();
    localStorage.removeItem(publicRuntimeConfig.localStorageUserId);
    if (this._isMounted) {
      this.setState({
        signedIn: false
      });
    }
    Router.push('/');
  };

  componentDidMount() {
    this._isMounted = true;
    auth.onAuthStateChanged(user => {
      if (user) {
        // signed in
        if (this._isMounted) {
          this.setState({
            signedIn: true
          });
        }
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link href="/">
              <a className="navbar-item">Home</a>
            </Link>
            <Link href="/about">
              <a className="navbar-item">About</a>
            </Link>
            {this.state.signedIn ? (
              <Link href="/blog/new">
                <a className="navbar-item">New blog</a>
              </Link>
            ) : null}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {this.state.signedIn ? (
                  <a className="button is-danger" onClick={this.signOut}>
                    <strong>Sign out</strong>
                  </a>
                ) : (
                  <Link href="/signin">
                    <a className="button is-primary">
                      <strong>Sign in</strong>
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
