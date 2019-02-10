import Head from 'next/head';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default () => (
  <Head>
    <title>{publicRuntimeConfig.pageTitle}</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta charSet="utf-8" />
    <meta name="description" content={publicRuntimeConfig.pageDescription} />
    <link rel="stylesheet" type="text/css" href="/static/css/nprogress.css" />
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <link rel="stylesheet" type="text/css" href="/static/css/styles.css" />
  </Head>
);
