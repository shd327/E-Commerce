const router = require('express').Router();
const { Category, Product } = require('../../models');
const { findAll } = require('../../models/Product');

// The `/api/categories` endpoint

// find all categories and its associated Products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(categoryData)
  }
  catch (err) {
    res.status(400).json(err)
  }

});

// Get category by id and its associated products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    },

    )
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }

});

// create a new category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body)

    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }

});
// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      }

    )
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }

});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
