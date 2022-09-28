const express = require('express');

const app = express();

app.use(require('cors')());
app.use(express.json());

// 数据库
require('./plugins/db')(app);
// 路由
require('./routes/admin/index.js')(app);

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
