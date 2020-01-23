const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/blog/new', (req, res) => {
      const actualPage = '/blog/new';
      const query = {};
      app.render(req, res, actualPage, query);
    });

    server.get('/blog/:slug', (req, res) => {
      const actualPage = '/blog';
      const query = { slug: req.params.slug };
      app.render(req, res, actualPage, query);
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(3000, (err) => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    // eslint-disable-next-line no-console
    console.error(ex.stack);
    process.exit(1);
  });
