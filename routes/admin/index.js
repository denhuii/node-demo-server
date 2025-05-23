module.exports = app => {
  const express = require('express');

  const router = express.Router({
    mergeParams: true,
  });

  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });

  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  router.get('/', async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent';
    }
    const items = await req.Model.find().setOptions(queryOptions);
    res.send(items);
  });

  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });

  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndRemove(req.params.id);
    res.send({ success: true });
  });

  app.use(
    '/admin/api/rest/:resource',
    (req, res, next) => {
      const modelName = require('inflection').classify(req.params.resource);
      req.Model = require(`../../models/${modelName}`);
      next();
    },
    router,
  );

  const multer = require('multer');
  const upload = multer({ dest: __dirname + '/../../uploads' });

  app.use('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    file.url = `http://localhost:3000/uploads/${file.filename}`;
    res.send(file);
  });
};
