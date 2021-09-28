const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      res.status(404).json({ error: "Category Not Found!" });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      res.status(400).json({ error: "Couldn't Save Category" });
    }
    category.createdAt = undefined;
    category.updatedAt = undefined;
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  res.json(req.category);
};

exports.getAllCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      res.status(400).json({ error: "No Categories Found" });
    }
    res.json({ categories });
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      res.status(400).json({ error: "Couldn't update Category" });
    }
    res.json({ updatedCategory });
  });
};

exports.removeCategory = (req, res) => {
    const category = req.category;
    category.remove((err,category) => {
        if (err) {
            res.status(400).json({ error: "Couldn't delete Category" });
          }
          res.json({ message : `$(category) Category deleted successfully` });
    });
};
