'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  app.use('/api/login', require('./api/login'));
  app.use('/api/user', require('./api/user'));
  app.use('/api/chats', require('./api/chat'));
  app.use('/api/dashboard', require('./api/dashboard'));
  // app.use((req, res, next) => {
  //   res.status(404);
  //
  //   res.format({
  //     html() {
  //       res.render('404', { url: req.url });
  //     },
  //     json() {
  //       res.json({ error: 'Not found' });
  //     },
  //     default() {
  //       res.type('txt').send('Not found');
  //     },
  //   });
  // });
};
//# sourceMappingURL=routes.js.map
