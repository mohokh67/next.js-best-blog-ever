import React, { Component, Fragment } from 'react';
import moment from 'moment';
import slugify from 'slugify';
import Router from 'next/router';
import getConfig from 'next/config';
import validator from 'validator';
import { auth } from '../lib/db';
import { fetchDocumentFromCollection, isEmpty } from '../lib/utility';
import InvalidUserMessage from './InvalidUserMessage';

const { publicRuntimeConfig } = getConfig();

const ValidationInputIcon = props => {
  if (props.validated) {
    if (props.error) {
      return (
        <span className="icon is-small is-right">
          <i className="material-icons">report_problem</i>
        </span>
      );
    }
    return (
      <span className="icon is-small is-right">
        <i className="material-icons">done</i>
      </span>
    );
  }
  return null;
};

export default class BlogCreate extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      validUser: false,
      showInvalidUserMessage: false,
      title: '',
      intro: '',
      content: '',
      titleError: false,
      titleErrorMessage: '',
      introError: false,
      introErrorMessage: '',
      contentError: false,
      contentErrorMessage: '',
      validated: false
    };
  }

  cancel = () => {
    Router.push('/');
  };

  handleChange = event => {
    if (this._isMounted) {
      this.setState({
        [event.currentTarget.name]: event.currentTarget.value
      });
    }
  };

  validate = () => {
    let valid = true;

    const errors = {
      titleError: false,
      titleErrorMessage: '',
      introError: false,
      introErrorMessage: '',
      contentError: false,
      contentErrorMessage: ''
    };

    this.setState({
      ...errors,
      validated: true
    });

    const { title, intro, content } = this.state;
    if (!validator.isLength(title, { min: 5, max: 13 })) {
      valid = false;
      errors.titleError = true;
      errors.titleErrorMessage =
        'Title needs to be between 5 to 13 characters long';
    }

    if (!validator.isLength(intro, { min: 10, max: 200 })) {
      valid = false;
      errors.introError = true;
      errors.introErrorMessage =
        'Intro needs to be between 10 to 200 characters long';
    }

    if (content.length < 50) {
      valid = false;
      errors.contentError = true;
      errors.contentErrorMessage =
        'Content needs to be at least 50 characters long';
    }

    this.setState({
      ...errors
    });

    return valid;
  };

  save = () => {
    const isFormValid = this.validate();
    if (isFormValid) {
      if (this.state.validUser) {
        const newBlog = {
          title: this.state.title,
          slug: slugify(this.state.title, { lower: true }),
          intro: this.state.intro,
          content: this.state.content,
          createdAt: moment().unix(),
          userId: localStorage.getItem(publicRuntimeConfig.localStorageUserId)
        };

        this.props.addBlog(newBlog);
      } else {
        this.setState({
          showInvalidUserMessage: true
        });
      }
    }
  };

  componentDidMount() {
    this._isMounted = true;
    const userIdFromLocalStorage = localStorage.getItem(
      publicRuntimeConfig.localStorageUserId
    );

    fetchDocumentFromCollection({
      id: userIdFromLocalStorage,
      collectionName: 'users'
    }).then(foundUser => {
      if (!isEmpty(foundUser)) {
        auth.onAuthStateChanged(authUser => {
          if (authUser) {
            if (authUser.uid === foundUser.uid && this._isMounted) {
              this.setState({ validUser: true });
            }
          }
        });
      }
    });
  }

  handleChange = event => {
    if (this._isMounted) {
      this.setState({
        [event.currentTarget.name]: event.currentTarget.value
      });
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Fragment>
        <InvalidUserMessage show={this.state.showInvalidUserMessage} />

        <div className="content">
          <div className="field">
            <label className="label">Title</label>
            <div className="control has-icons-right">
              <input
                onChange={this.handleChange}
                className={`input${this.state.titleError ? ' is-danger' : ''}`}
                placeholder="Blog title"
                name="title"
                onChange={this.handleChange}
              />
              <ValidationInputIcon
                error={this.state.titleError}
                validated={this.state.validated}
              />
            </div>
            <p className="help is-danger">{this.state.titleErrorMessage}</p>
          </div>

          <div className="field">
            <label className="label">Intro</label>
            <div className="control has-icons-right">
              <textarea
                onChange={this.handleChange}
                className={`textarea${
                  this.state.introError ? ' is-danger' : ''
                }`}
                placeholder="Blog intro"
                name="intro"
                onChange={this.handleChange}
              />
              <ValidationInputIcon
                error={this.state.introError}
                validated={this.state.validated}
              />
            </div>
            <p className="help is-danger">{this.state.introErrorMessage}</p>
          </div>

          <div className="field">
            <label className="label">Content</label>
            <div className="control has-icons-right">
              <textarea
                onChange={this.handleChange}
                className={`textarea${
                  this.state.contentError ? ' is-danger' : ''
                }`}
                placeholder="Blog content"
                rows="7"
                name="content"
                onChange={this.handleChange}
              />
              <ValidationInputIcon
                error={this.state.contentError}
                validated={this.state.validated}
              />
            </div>
            {this.state.content.length < 50 && this.state.contentError ? (
              <p className="help is-info">
                {50 - this.state.content.length} characters left
              </p>
            ) : null}
            <p className="help is-danger">{this.state.contentErrorMessage}</p>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-primary" onClick={this.save}>
                Save
              </button>
            </div>
            <div className="control">
              <button className="button is-text" onClick={this.cancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
