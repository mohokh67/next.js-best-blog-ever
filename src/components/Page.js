import React, { Component } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import getConfig from 'next/config';
import TheHead from './TheHead';
import TheNav from './TheNav';
import TheFooter from './TheFooter';

const { publicRuntimeConfig } = getConfig();

NProgress.configure({ showSpinner: publicRuntimeConfig.NProgressShowSpinner });

Router.onRouteChangeStart = () => {
  // console.log('onRouteChnageStart triggered');
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  // console.log('onRouteChnageComplete triggered');
  NProgress.done();
};

Router.onRouteChangeError = () => {
  // console.log('onRouteChnageError triggered');
  NProgress.done();
};

class Page extends Component {
  render() {
    return (
      <div className="site">
        <TheHead />
        <TheNav />
        <main className="container">{this.props.children}</main>
        <TheFooter />
        <style jsx>{`
          .site {
            display: flex;
            min-height: 100vh;
            flex-direction: column;
          }
          main {
            flex: 1;
          }
        `}</style>
      </div>
    );
  }
}

export default Page;
