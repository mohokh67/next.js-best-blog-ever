import Head from 'next/head';

export default () => (
  <div>
    <Head>
      <title>best blog - About page</title>
    </Head>
    <img src="/static/images/desktop.jpg" />
    <div className="textInDiv">I am about page.</div>
    <style jsx>{`
      img {
        height: 500px;
      }
      .textInDiv {
        color: red;
        font-size: 15px;
      }
    `}</style>
    <div>some more text about our product</div>
  </div>
);
