const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category",
  }, // 关联自己 一对多   一级分类下面有多个二级分类  二级分类下面有多个三级分类  三级分类下面有多个四级分类  以此类推
});

module.exports = mongoose.model("Category", schema);
