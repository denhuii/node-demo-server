module.exports = app => {
  const express = require('express');

  const router = express.Router();

  const Category = require('../../models/Category');

  router.post('/categories', async (req, res) => {
    console.log('🚀 ~ add categories', req.body);
    const model = await Category.create(req.body);
    res.send(model);
  });

  router.get('/categories', async (req, res) => {
    console.log('🚀 ~ get categories', req);
    const items = await Category.find().limit(10);
    res.send(items);
  });

  router.get('/categories/:id', async (req, res) => {
    console.log('🚀 ~ get categories', req.params.id);
    const model = await Category.findById(req.params.id);
    res.send(model);
  });

  router.delete('/categories/:id', async (req, res) => {
    console.log('🚀 ~ delete categories', req.params.id);
    await Category.findByIdAndRemove(req.params.id);
    res.send({ success: true });
  });

  app.use('/admin/api', router);
};
