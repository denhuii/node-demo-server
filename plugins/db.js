let url = 'mongodb://dev:123456@192.168.10.2:27017/node-vue-moba';
module.exports = app => {
  const mongose = require('mongoose');

  mongose.connect(
    url,
    {
      useNewUrlParser: true,
    },
    err => {
      if (err) {
        console.log('🚀 ~ err', err);
      }
    },
  );
};
