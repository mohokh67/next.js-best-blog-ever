import React from 'react';
import App from 'next/app';
// import '../assets/sass/styles.scss';
import Page from '../components/Page';

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
        <Page>
          <Component {...pageProps} />
        </Page>
    );
  }
}
